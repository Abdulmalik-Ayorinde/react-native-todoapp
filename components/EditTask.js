import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ButtonComponent from './Button';
import Input from './Input';
import axios from 'axios';

function EditTask({ currentSheet, onRefresh, refRBSheet }) {
	const [taskTitle, setTaskTitle] = useState();
	const [updating, setUpdating] = useState(false);

	useEffect(() => {
		async function getTask() {
			try {
				let token = await SecureStore.getItemAsync('user_token');

				const { data } = await axios.get(
					`https://quicktodo-server.herokuapp.com/task/${currentSheet}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				setTaskTitle(data?.task?.title);
			} catch (err) {
				console.log(err);
			}
		}
		getTask();
	}, [currentSheet]);

	async function updateTask() {
		setUpdating(true);
		try {
			let token = await SecureStore.getItemAsync('user_token');

			await axios.put(
				`https://quicktodo-server.herokuapp.com/task/${currentSheet}`,
				{
					title: taskTitle,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			// console.log('done', data);
			setUpdating(false);

			refRBSheet.current.close();
			onRefresh();
		} catch (err) {
			console.log(err);
			setUpdating(false);
			Alert.alert('An error Occured');
		}
	}

	return (
		<View style={styles.taskContainer}>
			<Text style={styles.cardTitle}>Edit Task</Text>
			<View style={styles.inputContainer}>
				<Input
					title={'Task Name'}
					text={taskTitle ? taskTitle : 'Loading..'}
					placeholder={'Add Task'}
					setText={setTaskTitle}
				/>
			</View>
			<View style={styles.inputContainer}>
				<ButtonComponent
					submit={updateTask}
					title={updating ? 'Updating...' : 'Update'}
				/>
			</View>
		</View>
	);
}

export default EditTask;

const styles = StyleSheet.create({
	taskContainer: {
		// justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		padding: 24,
	},
	cardTitle: {
		fontWeight: '600',
		fontSize: 20,
		marginBottom: 24,
		alignSelf: 'flex-start',
	},
	inputContainer: {
		width: '100%',
		marginBottom: 20,
	},
});
