import { AppRegistry, useColorScheme } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from './src/contexts/authContext/Provider';
import UiContextProvider from './src/contexts/uiContext/Provider';
import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { ChoiceContextProvider } from './src/contexts/choiceContext/choiceContext';
import MessageSeenCountContextProvider from './src/contexts/messageSeenContext/MessageSeenCountContextProvider';

import 'react-native-get-random-values';
// import 'react-native-randombytes/lib/randombytes';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

export default function Main() {
  const [isRoute, setIsRoute] = useState(false);

  const handleRouteNotification = () => {
    setIsRoute(true);
  };

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    handleRouteNotification();
    console.log('remoteMessage', remoteMessage);
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const {
        notification: { body },
      } = remoteMessage;
      Alert.alert(body);
    });

    return unsubscribe;
  }, []);

  return (
    <UiContextProvider>
      <AuthContextProvider>
        <ChoiceContextProvider>
          <MessageSeenCountContextProvider>
            <App route={isRoute} />
          </MessageSeenCountContextProvider>
        </ChoiceContextProvider>
      </AuthContextProvider>
    </UiContextProvider>
  );
}

// Register the headless task only once
AppRegistry.registerComponent(appName, () => Main);
