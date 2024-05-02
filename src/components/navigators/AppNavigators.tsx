import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDashboardNavigators from './UserDashboardNavigators';
import UserInfoNavigators from './UserInfoNavigators';
import ChatBoard from '../shared/chat/ChatBoard';
import UserDetails from '../shared/userDetails/UserDetails';
import ProfileImage from '../screens/profileImage/ProfileImage';
import NotificationPage from '../screens/others/notification/NotificationPage';
import TermsAndConditions from '../screens/others/terms&conditions/Terms&Conditions';
import PrivacyPolicy from '../screens/others/privacy_policy/PrivacyPolicyPage';
import Payment from '../shared/payment/Payment';
import AuthNavigators from './AuthNavigators';
import ConfirmNavigators from './ConfirmNavigators';
import AuthContext from '../../contexts/authContext/authContext';
import SplashScreen from '../shared/splash/SplashScreen';
import HelpAndSupport from '../screens/others/help&support/HelpSupport';
import { Aboutus } from '../screens/others/about us/aboutus';
import { Icon, useTheme } from 'react-native-paper';
import SettingsPage from '../screens/others/settings/Settings';
import PasswordReset from '../screens/others/settings/passwordReset/PasswordReset';
import Language from '../screens/language/Language';
import { EpmtyPage } from '../screens/emptyPage/EmptyPage';
import { PaymentHistory } from '../screens/paymentHistory/PaymnetHistory';
import { TransitionPresets } from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

const AppNavigators = () => {
  const { colors } = useTheme();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        {user ? (
          <>
            <Stack.Screen name="UserDashboard" component={UserDashboardNavigators} />
            <Stack.Screen name="UserInfo" component={UserInfoNavigators} />
            <Stack.Screen name="Chat" component={ChatBoard} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
            <Stack.Screen name="ProfileImage" component={ProfileImage} />
            <Stack.Screen name="Notification" component={NotificationPage} />
            <Stack.Screen name="Terms" component={TermsAndConditions} />
            <Stack.Screen name="Privacy" component={PrivacyPolicy} />
            <Stack.Screen name="Settings" component={SettingsPage} />
            <Stack.Screen name="paymentHistory" component={PaymentHistory} />
            <Stack.Screen name="ResetPassord" component={PasswordReset} />
            <Stack.Screen
              name="About Us"
              component={Aboutus}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#fde8f1',
                },
              }}
            />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Support" component={HelpAndSupport} />
            {/* <Stack.Screen name="EditProfileImage" component={UpdateProfilePic} /> */}
          </>
        ) : (
          <>
            {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
            <Stack.Screen name="Language" component={Language} />
            <Stack.Screen name="Auth" component={AuthNavigators} />
            <Stack.Screen name="Confirm" component={ConfirmNavigators} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default AppNavigators;
