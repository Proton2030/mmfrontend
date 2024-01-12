import { AppRegistry } from 'react-native';
import App from './App';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import AuthContextProvider from './src/contexts/authContext/Provider';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E71B73',
    secondary: '#fde8f1',
  },
};

// Initialize Firebase background message handler
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage);
// });

// // Handle foreground messages
// messaging().onMessage(async (remoteMessage) => {
//   console.log('Foreground Message Arrived', remoteMessage);
//   // You can display a local notification here if required
// });

export default function Main() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);
