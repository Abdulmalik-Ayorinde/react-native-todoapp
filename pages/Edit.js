// import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	StatusBar,
	TouchableOpacity,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Keyboard,
	Image,
	ScrollView,
} from 'react-native';
import ButtomSheet from '../components/ButtomSheet';
import ButtonComponent from '../components/Button';
import Card from '../components/Card';
import EditTask from '../components/EditTask';
import Input from '../components/Input';
import TaskList, { EditTaskList } from '../components/TaskList';

export default function Edit({ navigation }) {
	const refRBSheet = useRef();
	return (
		<SafeAreaView
			style={[
				styles.coverContainer,
				{
					// Try setting `flexDirection` to `"row"`.
					flexDirection: 'column',
				},
			]}>
			<StatusBar
				animated={true}
				backgroundColor='#3DA9FC'
				// barStyle={statusBarStyle}
				// showHideTransition={statusBarTransition}
				// hidden={hidden}
			/>
			<View style={styles.navBar}>
				<Text style={styles.titleHeading}>Quick ToDo</Text>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => navigation.openDrawer()}>
					<Image source={require('../assets/menuico.png')} />
				</TouchableOpacity>
			</View>
			<View style={styles.globalContainer}>
				<View style={styles.inputContainer}>
					<Input style={styles.searchInput} placeholder={'Search Task'} />
				</View>
				{/* <KeyboardAvoidingView behavior={'position'} style={styles.mainContainer}> */}
				<View behavior={'position'} style={styles.mainContainer}>
					{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
					<View style={styles.cardContainer}>
						<Card cardTitle={'Completed'} cardNumber={0} />
						<Card cardTitle={'Pending'} cardNumber={3} />
					</View>
					<View style={styles.taskHeading}>
						<Text style={styles.titleHeading}>My Task</Text>
						<View style={styles.iconContainer}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => refRBSheet.current.open()}>
								<Image source={require('../assets/plusico.png')} />
							</TouchableOpacity>
						</View>
					</View>
					<ScrollView style={styles.scrollView}>
						<View style={styles.inputContainer}>
							<EditTaskList taskText='Go Shopping' />
							<EditTaskList taskText='Take My Bath' />
							<EditTaskList taskText='Example Task' />
							<EditTaskList taskText='Example Task' />
						</View>
					</ScrollView>

					<ButtomSheet component={<EditTask />} refRBSheet={refRBSheet} />
					{/* </TouchableWithoutFeedback> */}
				</View>
			</View>

			{/* </KeyboardAvoidingView> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	coverContainer: {
		flex: 1,
	},
	mainContainer: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
	},
	globalContainer: {
		// alignItems: 'center',
		width: '100%',
		paddingHorizontal: 25,
		backgroundColor: '#FFF',
	},

	navBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 64,
		alignItems: 'center',
		backgroundColor: '#fff',
		paddingHorizontal: 34,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
		width: '100%',
	},
	titleHeading: {
		color: '#3DA9FC',
		fontWeight: '700',
		fontSize: 24,
	},
	cardContainer: {
		// backgroundColor: 'green',
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 16,
		// width: 312,
		width: '100%',
	},
	taskHeading: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// backgroundColor: 'red',
		width: '100%',
		// width: 312,
		marginTop: 42,
	},
	inputContainer: {
		width: '100%',
	},
	iconContainer: {
		backgroundColor: '#D8EEFE',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		borderRadius: 8,
	},
	scrollView: {
		// backgroundColor: 'green',
		width: '100%',
	},
});
