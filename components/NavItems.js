import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';

export default function NavItems() {
	return (
		<>
			<View
				opacity={0.4}
				style={[{ backgroundColor: 'rgba(0,0,0,0.5)' }, styles.overlay]}>
				{/* <View> */}
				<View style={styles.sideBarContainer}>{/* <Text>hello</Text> */}</View>
				{/* </View> */}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	sideBarContainer: {
		backgroundColor: 'rgba(0,0,0)',
		width: '70%',
		height: '100%',
		alignSelf: 'flex-end',
		position: 'absolute',
		zIndex: 1,
		// right: 40,
		// left: 140,
	},
	overlay: {
		backgroundColor: '#000',
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 0,
	},
});
