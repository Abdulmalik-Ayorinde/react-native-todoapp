import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

function ButtonComponent({ title, navigation, page, submit }) {
	return (
		<View>
			<TouchableOpacity
				onPress={() => {
					submit();
					console.log('clicked');
				}}
				activeOpacity={0.4}
				style={styles.buttonContainer}>
				<Text style={styles.buttonText}>{title}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		paddingBottom: 14,
	},
	buttonContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 48,
		backgroundColor: '#3DA9FC',
		borderRadius: 4,
		padding: 12,
		elevation: 3,
	},
	buttonText: {
		paddingBottom: 4,
		fontWeight: '700',
		color: '#fff',
	},
});

export default ButtonComponent;
