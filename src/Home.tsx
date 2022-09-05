import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Calendar } from 'react-native-calendario';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const triggerNotifications = async () => {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: ' Te Llama Jorge! 📬',
			body: 'Hola, soy Jorge de Recepcion.. Te llamaba por el tema de las toallas?',
			data: { data: null },
		},
		trigger: { seconds: 2 },
	});
};

Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
            shouldPlaySound: false,
            shouldSetBadge: false,
			shouldShowAlert: true,
		};
	},
});

const Home = () => {
	return (
		<View style={styles.container}>
			<View style={styles.calendar}>
				<Calendar
					onPress={(date) => console.log(date)}
					firstDayMonday={true}
					monthHeight={300}
					numberOfMonths={1}
				/>
			</View>
			<View>
				<Button onPress={triggerNotifications} title='307' color='#841584' />
			</View>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#af0f',
		alignItems: 'center',
		justifyContent: 'center',
	},
	calendar: {
		width: 300,
	},
});
