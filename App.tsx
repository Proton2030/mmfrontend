import { useCallback, useContext, useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const { setUser } = useContext(AuthContext);
  const {
    ui: { theme },
  } = useContext(UiContext);
  const [userId, setUserId] = useState<string | null>(null);
  const appState = useAppState();
  const paperTheme = theme === 'DARK' ? darkTheme : lightTheme;

  // const getUserDetails = async () => {
  //   const userId = await AsyncStorage.getItem('@userId');
  //   if (userId) {
  //     const userDetails = await api.userDetails.getUserInfo({ userObjectId: userId });
  //     // console.log('===>userDetails', userDetails);
  //     if (userDetails && userDetails?.acount_status === 'ACTIVE') {
  //       setUser(userDetails);
  //     }
  //   }
  // };

  const getUserId = useCallback(async () => {
    const userId = await AsyncStorage.getItem('@userId');
    setUserId(userId);
  }, []);

  useEffect(() => {
    if (userId) {
      if (appState === 'active') {
        if (userId) {
          socket.emit('online', { userId });
          socket.on('online', (userInstance) => {
            console.log('------->userInstance', userInstance);
            setUser(userInstance);
          });
        }
      }
      if (appState === 'background' || appState === 'inactive') {
        socket.emit('offline', { userId });
      }
    }
  }, [appState, userId]);

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  useEffect(() => {
    getUserId();
  }, [getUserId]);

  console.log('==>app state', appState);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={paperTheme}>
        {/* <BottomSheetModalProvider> */}
        <AppNavigators />
        {/* </BottomSheetModalProvider> */}
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
