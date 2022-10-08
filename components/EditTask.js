import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import ButtonComponent from './Button';
import Input from './Input';

function CreateTask() {
	return (
		<View style={styles.taskContainer}>
			<Text style={styles.cardTitle}>Edit Task</Text>
			<View style={styles.inputContainer}>
				<Input title={'Task Name'} placeholder={'Add Task'} />
			</View>
			<View style={styles.inputContainer}>
				<ButtonComponent title='Edit' />
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
