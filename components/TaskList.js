import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

function TaskList({ taskText, completed }) {
	const [checkboxState, setCheckboxState] = React.useState(completed);
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
				onPress={() => setCheckboxState(!checkboxState)}
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
}) {
	const [checkboxState, setCheckboxState] = React.useState(completed);

	return (
		<View style={styles.container}>
			<BouncyCheckbox
				size={25}
				isChecked={checkboxState}
				fillColor='#3DA9FC'
				unfillColor='#FFFFFF'
				text={taskText}
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
					<Image source={require('../assets/edit-ico.png')} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

export function DeleteTaskList({ taskText, refRBSheet, completed }) {
	const [checkboxState, setCheckboxState] = React.useState(completed);

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
					onPress={() => refRBSheet.current.open()}>
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
	},
	deleteIco: {
		// backgroundColor: 'red',
		padding: 10,
	},
});
