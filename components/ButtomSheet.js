import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ButtonComponent from './Button';

function ButtomSheet({ refRBSheet, component }) {
	const ref = refRBSheet;
	return (
		// <View
		// 	style={{
		// 		flex: 1,
		// 		justifyContent: 'center',
		// 		alignItems: 'center',
		// 		backgroundColor: '#000',
		// 	}}>
		<>
			{/* <Button title='OPEN BOTTOM SHEET' /> */}
			<RBSheet
				ref={ref}
				closeOnDragDown={true}
				closeOnPressMask={true}
				customStyles={{
					wrapper: {
						backgroundColor: '#0A070835',
					},
					container: {
						borderTopRightRadius: 20,
						borderTopLeftRadius: 20,
						height: 300,
					},
					draggableIcon: {
						backgroundColor: '#000',
					},
				}}>
				{component}
			</RBSheet>
		</>
		// </View>
	);
}

export default ButtomSheet;
