import { AppRegistry } from 'react-native';
import App from './App';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from './src/contexts/authContext/Provider';
import messaging from '@react-native-firebase/messaging';
import { useState } from 'react';
import { ChoiceContextProvider } from './src/contexts/choiceContext/choiceContext';
import MessageSeenCountContextProvider from './src/contexts/messageSeenContext/MessageSeenCountContextProvider';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E71B73',
    secondary: '#fde8f1',
  },
};

export default function Main() {
  const [isRoute, setIsRoute] = useState(false);
  const handleRouteNotification = () => {
    setIsRoute(true);
  };

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    handleRouteNotification();
    console.log('remoteMessage', remoteMessage);
  });

  return (
    <NavigationContainer>
      <AuthContextProvider>
        <ChoiceContextProvider>
          <MessageSeenCountContextProvider>
            <PaperProvider theme={theme}>
              <App route={isRoute} />
            </PaperProvider>
          </MessageSeenCountContextProvider>
        </ChoiceContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

// Register the headless task only once
AppRegistry.registerComponent(appName, () => Main);
