/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from './src/contexts/authContext/Provider';

export default function Main() {
  return (
    // <PaperProvider>
    <NavigationContainer>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </NavigationContainer>
    // </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
