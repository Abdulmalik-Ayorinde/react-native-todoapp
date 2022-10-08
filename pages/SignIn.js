// import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
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
} from 'react-native';
import ButtonComponent from '../components/Button';
import Input from '../components/Input';
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

export default function SignIn({ navigation }) {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { state, dispatch } = useContext(UserContext);

	async function getUser() {
		try {
			const { data } = await axios.post(
				'https://quicktodo-server.herokuapp.com/auth',
				{
					email: userName,
					password: password,
				}
			);
			dispatch({ type: 'SET_TOKEN', payload: data.token });
			await SecureStore.setItemAsync('user_token', data.token);
			console.log(data);
			// console.log('from login', state);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<SafeAreaView
			style={[
				styles.mainContainer,
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
			<KeyboardAvoidingView behavior={'position'} style={styles.coverContainer}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.globalContainer}>
						<View style={styles.container}>
							<Text style={styles.textColor}>Quick ToDO</Text>
						</View>
						<View style={styles.pageTitleContainer}>
							<View style={styles.pageTitle}>
								<Text style={styles.titleHeading}>Sign In</Text>
								<Text style={styles.titledesc}>
									Welcome back to your account
								</Text>
							</View>
						</View>

						<View style={styles.inputContainer}>
							<Input
								title={'Email'}
								keyboard={'email-address'}
								placeholder={'Email'}
								text={userName}
								setText={setUserName}
							/>
							<Input
								title={'Password'}
								keyboard={'default'}
								placeholder={'Password'}
								text={password}
								setText={setPassword}
							/>
							<ButtonComponent
								page={'SignUp'}
								navigation={navigation}
								title={'Sign In'}
								submit={getUser}
							/>
						</View>
						<View style={styles.footAction}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => navigation.navigate('SignUp')}
								style={styles.footActionText}>
								<Text>New Here? </Text>
								<Text style={styles.linkColor}>Sign Up</Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	coverContainer: {
		flex: 1,
	},
	mainContainer: {
		display: 'flex',
		backgroundColor: '#F4F4F4',
		padding: 24,
		height: '100%',
		display: 'flex',
		// justifyContent: 'center',
		alignItems: 'center',
	},
	globalContainer: {
		// backgroundColor: '#e4e4e4',
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		borderWidth: 1,
		borderColor: '#BACDD9',
		borderRadius: 26,
		marginBottom: 94,
		width: 148,
		height: 52,
		alignSelf: 'center',
	},
	pageTitleContainer: {
		display: 'flex',
		alignItems: 'flex-start',
		// backgroundColor: '#000',
		width: '100%',
		paddingBottom: 48,
	},
	pageTitle: {
		alignSelf: 'flex-start',
	},
	titleHeading: {
		color: '#3DA9FC',
		fontWeight: '700',
		fontSize: 24,
	},
	titledesc: {
		fontWeight: '500',
		fontSize: 16,
	},
	inputContainer: {
		width: 312,
	},
	textColor: {
		fontWeight: '600',
		fontSize: 24,
		color: '#3DA9FC',
	},
	footAction: {
		marginTop: 64,
		alignItems: 'center',
	},
	footActionText: {
		fontWeight: '500',
		flexDirection: 'row',
	},
	linkColor: {
		fontWeight: '600',
		color: '#3DA9FC',
	},
});
