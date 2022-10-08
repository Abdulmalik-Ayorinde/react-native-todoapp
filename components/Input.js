// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Input({ title, keyboard, placeholder, setText, text }) {
	return (
		<View style={styles.inputContainer}>
			<Text style={styles.inputLabel}>{title}</Text>
			<TextInput
				keyboardType={keyboard}
				placeholder={placeholder}
				style={styles.inputText}
				value={text}
				onChangeText={setText}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		paddingBottom: 14,
	},
	inputText: {
		width: '100%',
		height: 48,
		background: '#FDFEFE',
		borderWidth: 1,
		borderColor: '#BACDD9',
		borderRadius: 4,
		padding: 8,
	},
	inputLabel: {
		paddingBottom: 4,
		fontWeight: '600',
		fontSize: 16,
	},
});
