import React, { useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { UserContext } from '../context/AuthContext';
import { Alert } from 'react-native';

function LogOut() {
	const { state, dispatch } = useContext(UserContext);

	useEffect(() => {
		async function handleLogout() {
			dispatch({ type: 'CLEAR_TOKEN', payload: '' });
			await SecureStore.deleteItemAsync('user_token');
			console.log('done');
			Alert.alert('Logged Out successfully');
		}
		handleLogout();
	});
	return;
}

export default LogOut;
