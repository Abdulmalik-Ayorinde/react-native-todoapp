import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import ButtonComponent from './Button';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

function DeleteTask({ currentSheet, onRefresh, refRBSheet }) {
	const [deleting, setDeleting] = useState(false);

	async function deleteTask() {
		setDeleting(true);
		try {
			let token = await SecureStore.getItemAsync('user_token');

			await axios.delete(
				`https://quicktodo-server.herokuapp.com/task/${currentSheet}`,

				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			setDeleting(false);

			refRBSheet.current.close();
			onRefresh();
			Alert.alert('Task Deleted Successfully');
		} catch (err) {
			console.log(err);
			setDeleting(false);
			Alert.alert('An error Occured');
		}
	}
	return (
		<View style={styles.taskContainer}>
			<Text style={styles.cardTitle}>Delete Task</Text>
			<View style={styles.captionContainer}>
				<Text style={styles.caption}>
					Are you sure you want to delete this task from your list?
				</Text>
			</View>
			<View style={styles.btnGroup}>
				<View style={styles.btnContainer}>
					<ButtonComponent title='Cancel' />
				</View>
				<View style={styles.btnContainer}>
					<ButtonComponent
						submit={deleteTask}
						title={deleting ? 'Deleting...' : 'Delete'}
					/>
				</View>
			</View>
		</View>
	);
}

export default DeleteTask;

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
	caption: {
		fontWeight: '400',
		fontSize: 16,
	},
	captionContainer: {
		marginBottom: 24,
		alignSelf: 'flex-start',
	},
	btnContainer: {
		width: '45%',
		// flexDirection: 'row',
		marginBottom: 20,
	},
	btnGroup: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});
