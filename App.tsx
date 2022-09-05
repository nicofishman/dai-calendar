import { StyleSheet, View } from 'react-native';
import React from 'react';

import Home from './src/Home';

export default function App () {
    return (
        <View style={styles.container}>
            <Home />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#af0f',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
