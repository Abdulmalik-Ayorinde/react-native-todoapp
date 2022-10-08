import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

function TaskList({ taskText }) {
	return (
		<View style={styles.container}>
			<BouncyCheckbox
				size={25}
				fillColor='#3DA9FC'
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
				onPress={(isChecked) => {
					// console.log(isChecked);
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

export function EditTaskList({ taskText }) {
	return (
		<View style={styles.container}>
			<BouncyCheckbox
				size={25}
				fillColor='#3DA9FC'
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
				onPress={(isChecked) => {
					// console.log(isChecked);
				}}
				// iconComponent={<ImgComponent />}
				checkIconImageSource={
					<Image source={require('../assets/select-ico.png')} />
				}
				// ImageComponent={<ImgComponent />}
			/>
			<View style={styles.deleteIco}>
				<Image source={require('../assets/edit-ico.png')} />
			</View>
		</View>
	);
}

export function DeleteTaskList({ taskText }) {
	return (
		<View style={styles.container}>
			<BouncyCheckbox
				size={25}
				fillColor='#3DA9FC'
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
				onPress={(isChecked) => {
					// console.log(isChecked);
				}}
				// iconComponent={<ImgComponent />}
				checkIconImageSource={
					<Image source={require('../assets/select-ico.png')} />
				}
				// ImageComponent={<ImgComponent />}
			/>
			<View style={styles.deleteIco}>
				<Image source={require('../assets/trash-ico.png')} />
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
	},
	deleteIco: {
		// backgroundColor: 'red',
		padding: 10,
	},
});
