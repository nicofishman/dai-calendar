import { Button, Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
// import { Calendar } from 'react-native-calendario';
import { Calendar } from 'react-native-calendars';
import * as Notifications from 'expo-notifications';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// https://github.com/wmcmahan/react-native-calendar-events#event-fields

const triggerNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: ' Te Llama Jorge! 📬',
            body: 'Hola, soy Jorge de Recepcion.. Te llamaba por el tema de las toallas?'
        },
        trigger: { seconds: 1 }
    });
    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Te Llama Jorge! 📬',
            text2: 'Hola, soy Jorge de Recepcion.. Te llamaba por el tema de las toallas?'
        });
    };

    showToast();
};

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldPlaySound: false,
            shouldSetBadge: true,
            shouldShowAlert: true,
            priority: Notifications.AndroidNotificationPriority.MAX
        };
    }
});

export type RootStackParamList = {
    CreateAppointment: { date: Date };
};

const Home = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const clickDay = (date: Date) => {
        navigation.navigate('CreateAppointment', { date });
    };

    return (
        <View style={styles.container}>
            <Calendar
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={true}
                firstDay={1}
                hideDayNames={false}
                initialDate={new Date().toISOString()}
                maxDate={'2033-05-30'}
                minDate={'2002-05-10'}
                monthFormat={'MMMM yyyy'}
                style={styles.calendar}
                onDayLongPress={day => {
                    console.log('selected day', day);
                }}
                onDayPress={day => {
                    clickDay(new Date(day.dateString));
                }}
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
            />
            <Toast />
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
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.blue[100],
        alignItems: 'center',
        justifyContent: 'center'
    },
    calendar: {
        width: Dimensions.get('window').width - 30
    }
});
