import { useContext, useEffect } from 'react';
import { socket } from './src/config/config';
import AuthContext from './src/contexts/authContext/authContext';
import { useAppState } from '@react-native-community/hooks';
import AppNavigators from './src/components/navigators/AppNavigators';
import { PermissionsAndroid } from 'react-native';
import { LinkingOptions, useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme, PaperProvider, MD3DarkTheme as DarkTheme } from 'react-native-paper';
import { DarkThemeColor, LightThemeColor, ThemeColor } from './src/constants/theme/themeColor';
import UiContext from './src/contexts/uiContext/UIContext';
import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...LightThemeColor,
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...DarkThemeColor,
  },
};

const App = ({ isRoute }: any) => {
  const { user } = useContext(AuthContext);
  const {
    ui: { theme },
  } = useContext(UiContext);
  const { colors } = useTheme();
  const appState = useAppState();
  const paperTheme = theme === 'DARK' ? darkTheme : lightTheme;
  useEffect(() => {
    if (appState === 'active') {
      if (user && user.acount_status === 'ACTIVE') {
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
    SplashScreen.hide();
  }, []);
  useEffect(() => {
    if (isRoute) {
      console.log('======>notification');
      // navigation.navigate('Notification');
    }
  }, [isRoute]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperTheme}>
        <AppNavigators />
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
