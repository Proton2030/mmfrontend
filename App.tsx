import { View, Text, StatusBar } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { socket } from './src/config/config';
import AuthContext from './src/contexts/authContext/authContext';
import { useAppState } from '@react-native-community/hooks';
import AppNavigators from './src/components/navigators/AppNavigators';


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

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fde8f1"
      />
      <AppNavigators />
    </>
  )
}

export default App