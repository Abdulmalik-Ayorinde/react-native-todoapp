import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import ButtonComponent from './Button';
import Input from './Input';

function DeleteTask() {
	return (
		<View style={styles.taskContainer}>
			<Text style={styles.cardTitle}>Edit Task</Text>
			<View style={styles.inputContainer}>
				<Input title={'Task Name'} placeholder={'Add Task'} />
			</View>
			<View style={styles.btnContainer}>
				<ButtonComponent title='Cancel' />
				<ButtonComponent title='Delete' />
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
	btnContainer: {
		width: '100%',
		flexDirection: 'row',
		marginBottom: 20,
	},
});
