import 'react-native-gesture-handler';

import { useContext } from 'react';
import DrawerNavigate from './AppStack';
import { UserContext } from './../context/AuthContext';
import StackNavigate from './AuthStack';

function MainSwitch() {
	const { state, dispatch } = useContext(UserContext);
	// console.log('State from switch', state);
	return <>{state.isLoggedIn ? <DrawerNavigate /> : <StackNavigate />}</>;
}

export default MainSwitch;
