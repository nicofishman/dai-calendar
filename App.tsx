import { LogBox } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/Home';
import CreateAppointment from './src/CreateAppointment';

export default function App () {
    const Stack = createNativeStackNavigator();

    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.']);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen component={Home} name="Home" options={{ headerShown: false }} />
                <Stack.Screen component={CreateAppointment} name="CreateAppointment" options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
