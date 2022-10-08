import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './../pages/Home';
import Edit from './../pages/Edit';
import Delete from './../pages/Delete';
import LogOut from './../pages/LogOut';

const Drawer = createDrawerNavigator();

function DrawerNavigate() {
	return (
		<Drawer.Navigator screenOptions={{ drawerPosition: 'right' }}>
			<Drawer.Screen
				name='Home'
				options={{ headerShown: false }}
				component={Home}
			/>

			<Drawer.Screen
				name='Edit'
				options={{ headerShown: false }}
				component={Edit}
			/>
			<Drawer.Screen
				name='Delete'
				options={{ headerShown: false }}
				component={Delete}
			/>
			<Drawer.Screen
				name='Logout'
				options={{ headerShown: false }}
				component={LogOut}
			/>
		</Drawer.Navigator>
	);
}

export default DrawerNavigate;
