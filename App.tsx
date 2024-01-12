import { View, Text } from 'react-native'
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        loggedIn === undefined ?
          <Stack.Screen name="Loading" component={Loading} />
          :
          user ?
            <>
              <Stack.Screen name="UserDashboard" component={UserDashboardNavigators} />
              <Stack.Screen name="Confirm" component={ConfirmNavigators} />
              <Stack.Screen name="UserInfo" component={UserInfoNavigators} />
              <Stack.Screen name="UserDetails" component={UserDetails} />
              <Stack.Screen name='Chat' component={ChatBoard} />
              <Stack.Screen name='Terms' component={TermsAndConditions} />
              <Stack.Screen name='Privacy' component={PrivacyPolicy} />
            </> :
            <>
              <Stack.Screen name="Auth" component={AuthNavigators} />
            </>
      }
    </Stack.Navigator>

  )
}

export default App