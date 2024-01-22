import { AppRegistry } from 'react-native';
import App from './App';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from './src/contexts/authContext/Provider';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E71B73',
    secondary: '#fde8f1',
  },
};

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
// AppRegistry.runApplication('App', {
//   rootTag: document.getElementById('root'),
// });
