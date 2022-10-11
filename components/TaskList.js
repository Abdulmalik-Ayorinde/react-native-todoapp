import React, { useEffect } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

function TaskList({ taskText, completed, onRefresh, id }) {
	const currentState = completed;
	const [checkboxState, setCheckboxState] = React.useState(currentState);

	async function updateChecked(checkState) {
		try {
			let token = await SecureStore.getItemAsync('user_token');
			// console.log(checkState);
			const { data } = await axios.put(
				`https://quicktodo-server.herokuapp.com/task/${id}`,
				{
					completed: checkState,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			onRefresh();
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<View style={styles.container}>
			<BouncyCheckbox
				size={25}
				fillColor='#3DA9FC'
				unfillColor='#FFFFFF'
				text={taskText}
				isChecked={checkboxState}
				iconStyle={{ borderColor: '#3DA9FC', borderRadius: 5 }}
				innerIconStyle={{
					borderWidth: 2,
					borderRadius: 5,
					// padding: 20,
				}}
				textStyle={{
					borderBottomColor: '#0000007F',
					borderBottomWidth: 1,
					width: 250,
					paddingBottom: 5,
					fontWeight: '400',
					fontSize: 18,
					color: '#000',
					// backgroundColor: 'red',
				}}
				onPress={() => {
					setCheckboxState(!checkboxState);
					updateChecked(!checkboxState);
				}}
				// iconComponent={<ImgComponent />}
				checkIconImageSource={
					<Image source={require('../assets/select-ico.png')} />
				}
				// ImageComponent={<ImgComponent />}
			/>
		</View>
	);
}

export default TaskList;

export function EditTaskList({
	taskText,
	refRBSheet,
	completed,
	setCurrentSheet,
	id,
	onRefresh,
}) {
	const currentState = completed;

	const [checkboxState, setCheckboxState] = React.useState(currentState);

	async function updateChecked(checkState) {
		try {
			let token = await SecureStore.getItemAsync('user_token');
			// console.log(checkState);
			const { data } = await axios.put(
				`https://quicktodo-server.herokuapp.com/task/${id}`,
				{
					completed: checkState,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			onRefresh();
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<View style={styles.container}>
			<BouncyCheckbox
				size={25}
				isChecked={checkboxState}
				fillColor='#3DA9FC'
				unfillColor='#FFFFFF'
				text={taskText}
				disableBuiltInState
				iconStyle={{ borderColor: '#000', borderRadius: 5 }}
				innerIconStyle={{
					borderWidth: 2,
					borderRadius: 5,
					// padding: 20,
				}}
				textStyle={{
					borderBottomColor: '#0000007F',
					borderBottomWidth: 1,
					width: 250,
					paddingBottom: 5,
					fontWeight: '400',
					fontSize: 18,
					color: '#000',
					// backgroundColor: 'red',
				}}
				onPress={() => {
					setCheckboxState(!checkboxState);
					updateChecked(!checkboxState);
				}}
				// iconComponent={<ImgComponent />}
				checkIconImageSource={
					<Image source={require('../assets/select-ico.png')} />
				}
				// ImageComponent={<ImgComponent />}
			/>
			<View style={styles.deleteIco}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {
						setCurrentSheet(id);
						refRBSheet.current.open();
					}}>
					<Image source={require('../assets/edit-ico.png')} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

export function DeleteTaskList({
	taskText,
	refRBSheet,
	completed,
	setCurrentSheet,
	id,
	onRefresh,
}) {
	const currentState = completed;

	const [checkboxState, setCheckboxState] = React.useState(currentState);

	return (
		<View style={styles.container}>
			<BouncyCheckbox
				size={25}
				fillColor='#3DA9FC'
				isChecked={checkboxState}
				unfillColor='#FFFFFF'
				text={taskText}
				iconStyle={{ borderColor: '#3DA9FC', borderRadius: 5 }}
				innerIconStyle={{
					borderWidth: 2,
					borderRadius: 5,
					// padding: 20,
				}}
				textStyle={{
					borderBottomColor: '#0000007F',
					borderBottomWidth: 1,
					width: 250,
					paddingBottom: 5,
					fontWeight: '400',
					fontSize: 18,
					color: '#000',
					// backgroundColor: 'red',
				}}
				onPress={() => setCheckboxState(!checkboxState)}
				// iconComponent={<ImgComponent />}
				checkIconImageSource={
					<Image source={require('../assets/select-ico.png')} />
				}
				// ImageComponent={<ImgComponent />}
			/>
			<View style={styles.deleteIco}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => {
						setCurrentSheet(id);
						refRBSheet.current.open();
					}}>
					<Image source={require('../assets/trash-ico.png')} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

function ImgComponent() {
	return <Image source={require('../assets/select-ico.png')} />;
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: ,
		width: '100%',
		marginVertical: 15,
		flexDirection: 'row',
		// padding: 5,
	},
	deleteIco: {
		// backgroundColor: 'red',
		padding: 10,
	},
});
