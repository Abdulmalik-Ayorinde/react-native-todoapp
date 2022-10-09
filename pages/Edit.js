// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	StatusBar,
	TouchableOpacity,
	Image,
	ScrollView,
} from 'react-native';
import ButtomSheet from '../components/ButtomSheet';
import ButtonComponent from '../components/Button';
import Card from '../components/Card';
import EditTask from '../components/EditTask';
import Input from '../components/Input';
import TaskList, { EditTaskList } from '../components/TaskList';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function Edit({ navigation }) {
	const refRBSheet = useRef();
	const [tasks, setTasks] = useState([]);
	const [loopTasks, setLoopTasks] = useState('');
	const [currentSheet, setCurrentSheet] = useState('');
	// const [completed, setComplted] = useState()

	function reducer(state, action) {
		switch (action.type) {
			case 'reverseCheck':
				let stateCopy = [...state];
				stateCopy[Number(action.payload)] = {
					...stateCopy[Number(action.payload)],
					checked: !stateCopy[Number(action.payload)].checked,
				};

				return stateCopy;

			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(reducer, tasks);

	useEffect(() => {
		async function getTask() {
			try {
				let token = await SecureStore.getItemAsync('user_token');

				const { data } = await axios.get(
					'https://quicktodo-server.herokuapp.com/task',
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setTasks(data.task);

				const fillteredTask = data.task.filter(
					(item) => item.completed === true
				);

				setLoopTasks(fillteredTask.length);
			} catch (err) {
				console.log(err);
			}
		}
		getTask();
	}, []);

	// function updateTask() {

	// }
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
						<Card cardTitle={'Completed'} cardNumber={loopTasks} />
						<Card cardTitle={'Pending'} cardNumber={tasks.length} />
					</View>
					<View style={styles.taskHeading}>
						<Text style={styles.titleHeading}>Edit Task</Text>
						{/* <View style={styles.iconContainer}>
							<Image source={require('../assets/plusico.png')} />
						</View> */}
					</View>
					<ScrollView style={styles.scrollView}>
						<View style={styles.inputContainer}>
							{tasks ? (
								tasks.map((task) => (
									<EditTaskList
										key={task.id}
										id={task.id}
										taskText={task.title}
										completed={task.completed}
										refRBSheet={refRBSheet}
										setCurrentSheet={setCurrentSheet}
										dispatch={dispatch}
									/>
								))
							) : (
								<Text>Loading ...</Text>
							)}
						</View>
						<View>{state.id}</View>
					</ScrollView>

					<ButtomSheet
						component={<EditTask currentSheet={currentSheet} />}
						refRBSheet={refRBSheet}
					/>
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
		// backgroundColor: '#FFF',
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
