import { Button, Dimensions, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { Calendar } from 'react-native-calendario';
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
    CreateAppointment: { dateNum: number };
};

const Home = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const clickDay = (date: Date) => {
        navigation.navigate('CreateAppointment', { dateNum: date.getTime() });
    };

    return (
        <View style={styles.container}>
            <View style={styles.calendar}>
                <Calendar
                    endDate={new Date(2018, 4, 5)}
                    firstDayMonday={false}
                    minDate={new Date(2018, 3, 20)}
                    monthHeight={500}
                    numberOfMonths={1}
                    startDate={new Date(2018, 3, 30)}
                    theme={{
                        monthTitleTextStyle: {
                            fontWeight: '300',
                            fontSize: 20
                        },
                        emptyMonthContainerStyle: {},
                        emptyMonthTextStyle: {
                            fontWeight: '200'
                        },
                        weekColumnsContainerStyle: {},
                        weekColumnStyle: {
                            paddingVertical: 10
                        },
                        weekColumnTextStyle: {
                            color: '#b6c1cd',
                            fontSize: 13
                        },
                        nonTouchableDayContainerStyle: {},
                        nonTouchableDayTextStyle: {},
                        startDateContainerStyle: {},
                        endDateContainerStyle: {},
                        dayContainerStyle: {},
                        dayTextStyle: {
                            color: colors.blue[900],
                            fontWeight: '500',
                            fontSize: 15
                        },
                        dayOutOfRangeContainerStyle: {},
                        dayOutOfRangeTextStyle: {},
                        todayContainerStyle: {
                            backgroundColor: colors.blue[500]
                        },
                        todayTextStyle: {
                            color: 'white'
                        },
                        activeDayContainerStyle: {
                            backgroundColor: '#6d95da'
                        },
                        activeDayTextStyle: {
                            color: 'white'
                        },
                        nonTouchableLastMonthDayTextStyle: {}
                    }}
                    onPress={clickDay}
                />
            </View>
            <View>
                <Button color='#841584' title='307' onPress={triggerNotifications} />
            </View>
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
        backgroundColor: colors.blue[100],
        alignItems: 'center',
        justifyContent: 'center'
    },
    calendar: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 20
    }
});
