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

export default triggerNotifications;
