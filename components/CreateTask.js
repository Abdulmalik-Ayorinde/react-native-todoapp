import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import ButtonComponent from './Button';
import Input from './Input';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
function CreateTask({ refRBSheet, onRefresh }) {
	const [taskTitle, setTaskTitle] = useState();
	const [creating, setCreating] = useState(false);

	async function createSIngleTask() {
		setCreating(true);
		try {
			let token = await SecureStore.getItemAsync('user_token');

			await axios.post(
				`https://quicktodo-server.herokuapp.com/task`,
				{
					title: taskTitle,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setCreating(false);

			refRBSheet.current.close();
			onRefresh();
		} catch (err) {
			console.log(err);
			setCreating(false);
			Alert.alert('An Error Occured');
		}
	}

	return (
		<View style={styles.taskContainer}>
			<Text style={styles.cardTitle}>Add Task</Text>
			<View style={styles.inputContainer}>
				<Input
					title={'Task Name'}
					text={taskTitle}
					placeholder={'Add Task'}
					setText={setTaskTitle}
				/>
			</View>
			<View style={styles.inputContainer}>
				<ButtonComponent
					submit={createSIngleTask}
					title={creating ? 'Creating Task ...' : 'Add'}
				/>
			</View>
		</View>
	);
}

export default CreateTask;

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
