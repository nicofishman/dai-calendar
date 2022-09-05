import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
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
		trigger: { seconds: 1},
	});
};

Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
            shouldPlaySound: false,
            shouldSetBadge: true,
			shouldShowAlert: true,
			priority: Notifications.AndroidNotificationPriority.MAX,
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
                    theme={{
                        activeDayColor: '#222',
                        monthTitleTextStyle: {
                            color: '#222',
                            fontSize: 20,
                            fontWeight: 'bold',
                        },

                        dayContentStyle: {
                            backgroundColor: colors.blue[900],
                            
                        },
                    }}
				/>
			</View>
			<View>
				<Button onPress={triggerNotifications} title='307' color='#841584' />
			</View>
		</View>
	);
};

export default Home;


const colors = {
    blue: {
        900: '#133C55',
        700: '#26567D',
        500: '#386FA4',
        300: '#59A5D8',
        200: '#84D2F6',
        100: '#91E5F6'
    }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.blue[300],
		alignItems: 'center',
		justifyContent: 'center',
	},
	calendar: {
		width: Dimensions.get('window').width,
        paddingHorizontal: 20,
	},
});
