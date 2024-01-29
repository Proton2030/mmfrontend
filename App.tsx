import { View, Text, StatusBar, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { socket } from './src/config/config';
import AuthContext from './src/contexts/authContext/authContext';
import { useAppState } from '@react-native-community/hooks';
import AppNavigators from './src/components/navigators/AppNavigators';
import { PermissionsAndroid } from 'react-native';



const App = () => {
  const { user } = useContext(AuthContext);
  const appState = useAppState();

  useEffect(() => {
    if (appState === "active") {
      if (user) {
        socket.emit("online", { userId: user?._id });
      }
    }
    if (appState === 'background' || appState === 'inactive') {
      socket.emit("offline", { userId: user?._id })
    }
  }, [appState, user]);

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fde8f1"
      />
      {/* <NavigationContainer> */}
      <AppNavigators />
      {/* </NavigationContainer> */}
      {/* <ConfirmationPage /> */}
    </>
  )
}

export default App