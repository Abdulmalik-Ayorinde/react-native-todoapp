// import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import UserProvider from './context/AuthContext';

import MainSwitch from './navigators/MainSwitch';

export default function App() {
	return (
		<>
			<UserProvider>
				<NavigationContainer>
					<MainSwitch />
				</NavigationContainer>
			</UserProvider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
