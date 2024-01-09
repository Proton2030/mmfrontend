import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigators from './src/components/navigators/AuthNavigators';
import ConfirmNavigators from './src/components/navigators/ConfirmNavigators';
import UserInfoNavigators from './src/components/navigators/UserInfoNavigators';
import UserDashboardNavigators from './src/components/navigators/UserDashboardNavigators';
import PartnerInfoNavigators from './src/components/navigators/PartnerInfoNavigators';
import ChatBoard from './src/components/shared/chat/ChatBoard';
import UserDetails from './src/components/shared/userDetails/UserDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigators} />
      <Stack.Screen name="UserDashboard" component={UserDashboardNavigators} />
      <Stack.Screen name="Confirm" component={ConfirmNavigators} />
      <Stack.Screen name="UserInfo" component={UserInfoNavigators} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name='Chat' component={ChatBoard} />
      <Stack.Screen name="PartnerInfo" component={PartnerInfoNavigators} />
    </Stack.Navigator>

  )
}

export default App