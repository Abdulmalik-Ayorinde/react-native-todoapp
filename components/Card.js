import React from 'react';

import {
	StyleSheet,
	Text,
	SafeAreaView,
	View,
	StatusBar,
	// TouchableOpacity,
	// TouchableWithoutFeedback,
	// KeyboardAvoidingView,
	// Keyboard,
} from 'react-native';

function Card({ cardTitle, cardNumber }) {
	return (
		<View style={styles.mainContainer}>
			<Text style={styles.cardTitle}>{cardTitle}</Text>
			<Text style={styles.cardNumber}>{cardNumber}</Text>
		</View>
	);
}

export default Card;

const styles = StyleSheet.create({
	mainContainer: {
		width: 148,
		height: 96,
		backgroundColor: '#3da9fc75',

		// opacity: 0.4,
		borderRadius: 8,
		padding: 16,
	},
	cardTitle: {
		fontWeight: '400',
		fontSize: 14,
	},
	cardNumber: {
		fontWeight: '500',
		fontSize: 24,
		marginTop: 16,
	},
});
