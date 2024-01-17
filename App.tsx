import { View, Text, StatusBar } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigators from './src/components/navigators/AuthNavigators';
import ConfirmNavigators from './src/components/navigators/ConfirmNavigators';
import UserInfoNavigators from './src/components/navigators/UserInfoNavigators';
import UserDashboardNavigators from './src/components/navigators/UserDashboardNavigators';
import PartnerInfoNavigators from './src/components/navigators/PartnerInfoNavigators';
import ChatBoard from './src/components/shared/chat/ChatBoard';
import UserDetails from './src/components/shared/userDetails/UserDetails';
import { fetchData } from './src/utils/commonFunction/storeData';
import { socket } from './src/config/config';
import AuthContext from './src/contexts/authContext/authContext';
import { useAppState } from '@react-native-community/hooks';
import Loading from './src/components/shared/loading/Loading';
import TermsAndConditions from './src/components/screens/others/terms&conditions/Terms&Conditions';
import PrivacyPolicy from './src/components/screens/others/privacy_policy/PrivacyPolicyPage';
import NotificationPage from './src/components/screens/others/notification/NotificationPage';
import Payment from './src/components/shared/payment/Payment';
import ProfileImage from './src/components/screens/profileImage/ProfileImage';
import SplashScreen from './src/components/shared/splash/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const { user } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState<any>();
  const appState = useAppState();

  console.log("user", user);

  const checkUserAuthentication = useCallback(async () => {
    setLoggedIn(user)
  }, [user]);

  useEffect(() => {
    checkUserAuthentication();
  }, [checkUserAuthentication])

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
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        {
          user ?
            <>
              {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
              <Stack.Screen name="UserDashboard" component={UserDashboardNavigators} />
              <Stack.Screen name="UserInfo" component={UserInfoNavigators} />
              <Stack.Screen name='Chat' component={ChatBoard} />
              <Stack.Screen name="UserDetails" component={UserDetails} />
              <Stack.Screen name="ProfileImage" component={ProfileImage} />
              <Stack.Screen name='Notification' component={NotificationPage} />
              <Stack.Screen name='Terms' component={TermsAndConditions} />
              <Stack.Screen name='Privacy' component={PrivacyPolicy} />
              <Stack.Screen name='Payment' component={Payment} />
              <Stack.Screen name="Auth" component={AuthNavigators} />
            </> :
            <>
              {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
              <Stack.Screen name="Auth" component={AuthNavigators} />
              <Stack.Screen name="Confirm" component={ConfirmNavigators} />
            </>
        }
      </Stack.Navigator>
    </>
  )
}

export default App