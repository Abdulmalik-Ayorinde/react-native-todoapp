// import { StatusBar } from 'expo-status-bar';
import React, {
	useCallback,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	StatusBar,
	TouchableOpacity,
	Image,
	ScrollView,
	RefreshControl,
	FlatList,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

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
	const isFocused = useIsFocused();

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
		if (isFocused) {
			onRefresh();
		}
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
			<EditTaskList
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
						<Card cardTitle={'Pending'} cardNumber={tasks.length - loopTasks} />
					</View>
					<View style={styles.taskHeading}>
						<Text style={styles.titleHeading}>Edit Task</Text>
						{/* <View style={styles.iconContainer}>
							<Image source={require('../assets/plusico.png')} />
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
					{/* <Text>Loading ...</Text> */}

					<ButtomSheet
						component={
							<EditTask
								onRefresh={onRefresh}
								currentSheet={currentSheet}
								refRBSheet={refRBSheet}
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
	},
	mainContainer: {
		// height: '100%',
		width: '100%',
		alignItems: 'center',
	},
	globalContainer: {
		// alignItems: 'center',
		width: '100%',
		paddingHorizontal: 25,
		height: '100%',
		// backgroundColor: '#000',
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
