import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Stack = createNativeStackNavigator();

function StackNavigate() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{ headerShown: false }}
				name='SignIn'
				component={SignIn}
			/>
			<Stack.Screen
				options={{ headerShown: false }}
				name='SignUp'
				component={SignUp}
			/>

			{/* <Stack.Screen
				name='Dashboard'
				component={DrawerNavigate}
				options={{ headerShown: false }}
			/> */}
		</Stack.Navigator>
	);
}

export default StackNavigate;
