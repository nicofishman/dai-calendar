import { StyleSheet, Text, TouchableOpacity, View, StatusBar, Button, TextInput } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useCalendar from '@atiladev/usecalendar';
import * as Notifications from 'expo-notifications';
import Toast from 'react-native-toast-message';
import { addHours, addDays } from 'date-fns';

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
            text1: 'GUARDADO 📬'
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

const {
    addEventsToCalendar,
    createCalendar,
    getPermission,
    openSettings
} = useCalendar('POLSHAPP', '#C21797', 'POLSHAPP');

const usableDate = (date: Date) => {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`;
};

const usableHour = (date: Date) => {
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

const CreateAppointment = () => {
    const route = useRoute();
    const { date } = route.params as { date: Date };
    const dateMasUno = addDays(date, 1);
    const [start, setStart] = useState<Date>(dateMasUno);
    const [end, setEnd] = useState<Date>(addHours(dateMasUno, 1));
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [currentPicker, setCurrentPicker] = useState<'start' | 'end' | null>(null);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const popClock = (value: Date, setValue: Dispatch<SetStateAction<Date>>, type: 'start' | 'end') => {
        setCurrentPicker(type);
        setValue(value);
        showDatePicker();
    };

    const handleConfirm = (date: Date) => {
        if (currentPicker === 'start') {
            setStart(date);
        } else if (currentPicker === 'end') {
            setEnd(date);
        }
        setCurrentPicker(null);
        hideDatePicker();
    };

    const createCalAndEvent = async (title: string, start: Date, end: Date) => {
        const granted = await getPermission();

        if (granted) {
            await createCalendar();
            try {
                console.log(start, end);

                addEventsToCalendar(title, start, end);
                await triggerNotifications();
            } catch (e) {
                console.log(e);
                // Something went wrong
            }
        } else {
            openSettings();
        }
    };

    // const SaveEvent = async (title: string, start: Date, end: Date, details: string) => {
    //     const fEnd = end.toISOString().toString().replace(/[^a-zA-Z0-9]/g, '');
    //     const fStart = start.toISOString().toString().replace(/[^a-zA-Z0-9]/g, '');

    //     title = title.split(' ').join('+');
    //     details = details.split(' ').join('+');

    //     const link = `https://calendar.google.com/calendar/r/eventedit?text=${title}&dates=${fStart}/${fEnd}&details=${details}&location=Garage+Boston+-+20+Linden+Street+-+Allston,+MA+02134`;

    //     Linking.openURL(link);
    //     await createCalAndEvent();
    // };

    // useEffect(() => {
    //     (async () => {
    //         await createCalAndEvent();
    //     })();
    // }, []);

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Crear evento para el día {usableDate(dateMasUno)}</Text>
            </View>
            <View>
                <Text>Titulo del evento: </Text>
                <TextInput
                    keyboardType="default"
                    placeholder="Titulo"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />
            </View>
            <View style={styles.box}>
                <TouchableOpacity onPress={() => popClock(start, setStart, 'start')}>
                    <View>
                        <Text>Hora de Inicio</Text>
                        <Text>{usableHour(start)}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => popClock(end, setEnd, 'end')}>
                    <View>
                        <Text>Hora de Finalización</Text>
                        <Text>{usableHour(end)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                date={date}
                is24Hour={true}
                isVisible={isDatePickerVisible}
                mode="time"
                onCancel={hideDatePicker}
                onConfirm={handleConfirm}
            />
            <Button color="#841584" title="SAVE" onPress={() => createCalAndEvent(title, start, end)} />
        </View>
    );
};

export default CreateAppointment;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: StatusBar.currentHeight
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    box: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
