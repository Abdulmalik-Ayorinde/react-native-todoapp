// import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
	FlatList,
	RefreshControl,
} from 'react-native';
import ButtonComponent from '../components/Button';
import Card from '../components/Card';
import CreateTask from '../components/CreateTask';
import Input from '../components/Input';
import TaskList, { DeleteTaskList } from '../components/TaskList';
import ButtomSheet from './../components/ButtomSheet';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import DeleteTask from './../components/DeleteTask';

export default function Delete({ navigation }) {
	const refRBSheet = useRef();
	const [tasks, setTasks] = useState([]);
	const [loopTasks, setLoopTasks] = useState('');
	const [currentSheet, setCurrentSheet] = useState('');

	// const [completed, setComplted] = useState()
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

			const fillteredTask = data.task.filter((item) => item.completed === true);

			setLoopTasks(fillteredTask.length);
		} catch (err) {
			console.log(err);
		}
	}
	useEffect(() => {
		getTask();
		onRefresh();
	}, []);

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		try {
			getTask();
			setRefreshing(false);
		} catch (err) {
			console.log(err);
		}
	}, []);

	const renderItem = ({ item }) => {
		return (
			<DeleteTaskList
				key={item.id}
				id={item.id}
				taskText={item.title}
				completed={item.completed}
				refRBSheet={refRBSheet}
				onRefresh={onRefresh}
				setCurrentSheet={setCurrentSheet}
			/>
		);
	};
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

				{/* <Text style={styles.titledesc}>Setup your own account</Text> */}
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
						<Card cardTitle={'Pending'} cardNumber={5} />
					</View>
					<View style={styles.taskHeading}>
						<Text style={styles.titleHeading}>Delete Task</Text>
						{/* <View style={styles.iconContainer}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => refRBSheet.current.open()}>
								<Image source={require('../assets/plusico.png')} />
							</TouchableOpacity>
						</View> */}
					</View>

					<View style={styles.taskContainer}>
						<FlatList
							data={tasks}
							renderItem={renderItem}
							keyExtractor={(item) => item.id}
							style={styles.scrollView}
							refreshControl={
								<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
							}
						/>
					</View>
					{/* <View style={styles.taskContainer}></View> */}
					{/* <ScrollView style={styles.scrollView}>
						<View style={styles.inputContainer}>
							{tasks ? (
								tasks.map((task) => (
									<DeleteTaskList
										key={task.id}
										id={task.id}
										taskText={task.title}
										completed={task.completed}
										refRBSheet={refRBSheet}
									/>
								))
							) : (
								<Text>Loading ...</Text>
							)}
						</View>
					</ScrollView> */}
					<ButtomSheet
						component={
							<DeleteTask
								refRBSheet={refRBSheet}
								onRefresh={onRefresh}
								currentSheet={currentSheet}
							/>
						}
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
		// backgroundColor: '#F400F4',
	},
	mainContainer: {
		// display: 'flex',
		// paddingHorizontal: 24,
		height: '100%',
		width: '100%',
		// backgroundColor: 'red',
		alignItems: 'center',
	},
	globalContainer: {
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: 25,
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
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 16,
		width: '100%',
	},
	taskHeading: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		marginTop: 42,
	},
	iconContainer: {
		backgroundColor: '#D8EEFE',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		borderRadius: 8,
	},
	inputContainer: {
		width: '100%',
	},
	taskContainer: {
		height: '100%',
		// flex: 1,
		height: 470,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		// backgroundColor: 'green',
	},
	scrollView: {
		flex: 1,
		// backgroundColor: 'green',
		width: '100%',
		// paddingTop: 0,
		// marginBottom: 20,
		// height: 500,
	},
});
