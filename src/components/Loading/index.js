import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='green' />
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    text: {
        fontSize: 18,
        fontFamily:'Poppins-Regular',
        marginTop: 12,
    }
})

export default Loading;
