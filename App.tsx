import { View, Text, StatusBar, Alert } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { socket } from './src/config/config';
import AuthContext from './src/contexts/authContext/authContext';
import { useAppState } from '@react-native-community/hooks';
import AppNavigators from './src/components/navigators/AppNavigators';
import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

const App = ({ isRoute }: any) => {
  const { user } = useContext(AuthContext);
  const { colors } = useTheme();
  const appState = useAppState();
  const navigation = useNavigation<any>();
  useEffect(() => {
    if (appState === 'active') {
      if (user) {
        socket.emit('online', { userId: user?._id });
      }
    }
    if (appState === 'background' || appState === 'inactive') {
      socket.emit('offline', { userId: user?._id });
    }
  }, [appState, user]);

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }, []);

  useEffect(() => {
    if (isRoute) {
      console.log('======>notification');
      navigation.navigate('Notification');
    }
  }, [isRoute]);

  return (
    <>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      {/* <NavigationContainer> */}
      <AppNavigators />
      {/* </NavigationContainer> */}
      {/* <ConfirmationPage /> */}
    </>
  );
};

export default App;
