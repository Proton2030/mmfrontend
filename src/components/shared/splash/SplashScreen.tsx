// SplashScreen.js

import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthContext from '../../../contexts/authContext/authContext';

const SplashScreen = () => {
    const navigation = useNavigation<any>();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        // Simulate a loading process for demonstration purposes
        setTimeout(() => {
            if (user) {
                navigation.replace('UserDashboard') // Navigate to UserDashboard after splash screen
            }
            else {
                navigation.replace('Auth'); // Navigate to Auth after splash screen
            }
        }, 3000); // 3 seconds
    }, []);

    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
            {/* Add any other splash screen content here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SplashScreen;
