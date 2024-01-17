// SplashScreen.js
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AuthContext from '../../../contexts/authContext/authContext';
import { logo, logoBgRemove } from '../../../assets';

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
        setTimeout(() => {
            if (user) {
                navigation.dispatch(routeUserDashboard); // Navigate to your main component
            }
            else {
                navigation.dispatch(routeAuth);
            }
        }, 2500); // Set the duration in milliseconds
    }, [user]);

    return (
        <View style={styles.container}>
            {/* Your splash screen content, e.g., logo or image */}
            <Image source={logoBgRemove} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#E71B73",
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
});

export default SplashScreen;
