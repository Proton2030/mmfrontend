// SplashScreen.tsx

import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const AnimatedSplashScreen: React.FC = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000, // Adjust the duration as needed
                easing: Easing.ease,
                useNativeDriver: true,
            }
        ).start(() => {
            // Hide splash screen once the animation is complete
            SplashScreen.hide();
        });
    }, [fadeAnim]);

    return (
        <Animated.View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: fadeAnim,
            }}
        >
            <Text>Your App Name</Text>
            {/* Add other components or your logo */}
        </Animated.View>
    );
};

export default AnimatedSplashScreen;
