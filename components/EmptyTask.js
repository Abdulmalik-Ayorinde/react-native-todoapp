import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function EmptyTask() {
	return (
		<>
			<Text>You have no task for today</Text>
			<View>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={() => refRBSheet.current.open()}>
					<Text style={styles.linkColor}>Create Task</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}

export default EmptyTask;

const styles = StyleSheet.create({
	linkColor: {
		fontWeight: '700',
		fontSize: 20,
		color: '#3DA9FC',
	},
});
