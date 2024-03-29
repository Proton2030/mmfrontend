// SplashScreen.js

import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthContext from '../../../contexts/authContext/authContext';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { Image } from 'react-native';
import { logo } from '../../../assets';

const SplashScreen = () => {
    const navigation = useNavigation<any>();
    const { user } = useContext(AuthContext);
    const routeUserDashboard = CommonActions.reset({
        index: 0,
        routes: [{ name: 'UserDashboard' }], // Replace with your desired screen name
    });
    const routeAuth = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' }], // Replace with your desired screen name
    });
    useEffect(() => {
        // Simulate a loading process for demonstration purposes
        const timeoutId = setTimeout(() => {
            console.log("-----called-----")
            if (user) {
                navigation.dispatch(routeUserDashboard);
            } else {
                navigation.dispatch(routeAuth);
            }
        }, 2000);

        return () => {
            // Clear the timeout when the component unmounts or when navigating away
            clearTimeout(timeoutId);
        };
    }, [user]);

    return (
        <View style={[globalStyles.parentView]}>
            <Image source={logo} style={globalStyles.circleImage} />
        </View>
    );
};

export default SplashScreen;
