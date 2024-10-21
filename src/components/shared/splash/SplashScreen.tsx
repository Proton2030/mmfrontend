// SplashScreen.js

import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import AuthContext from '../../../contexts/authContext/authContext';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { Image } from 'react-native';
import { logo } from '../../../assets';
import { useTheme } from 'react-native-paper';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);
  const { colors } = useTheme();
  const routeUserDashboard = CommonActions.reset({
    index: 0,
    routes: [{ name: 'UserDashboard' }], // Replace with your desired screen name
  });
  const routeAuth = CommonActions.reset({
    index: 0,
    routes: [{ name: 'onboard' }], // Replace with your desired screen name
  });
  useEffect(() => {
    // Simulate a loading process for demonstration purposes
    const timeoutId = setTimeout(() => {
      // console.log('-----called-----');
      if (user && user.acount_status === 'ACTIVE') {
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
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 30,
        backgroundColor: colors.background,
      }}
    >
      <Image source={logo} style={globalStyles.circleImage} />
    </View>
  );
};

export default SplashScreen;
