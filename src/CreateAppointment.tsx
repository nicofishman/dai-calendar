import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
    const { dateNum } = route.params as {dateNum: number};
    const date = new Date(dateNum);
    const [start, setStart] = useState<Date>(new Date(date));
    const [end, setEnd] = useState<Date>(new Date(date.getDate() + 3600000));
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

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

    return (
        <View style={styles.container}>
            <Text>Crear Evento para el día {usableDate(date)}</Text>
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
            <DateTimePickerModal
                is24Hour={true}
                isVisible={isDatePickerVisible}
                mode="time"
                onCancel={hideDatePicker}
                onConfirm={handleConfirm}
            />
        </View>
    );
};

export default CreateAppointment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
