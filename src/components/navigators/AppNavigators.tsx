import { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDashboardNavigators from './UserDashboardNavigators';
import UserInfoNavigators from './UserInfoNavigators';
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
import { SubscriptionPage } from '../screens/subscriptionPage/SubscriptionPage';
import PaymentPage from '../screens/others/paymentPage/PaymentPage';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import PersonalChatPage from '../shared/socketChat/ChatScreen';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { Linking } from 'react-native';
import PaymentVerification from '../screens/paymentVerification/PaymentVerification';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  SplashScreen: undefined;
  UserDashboard: undefined;
  PaymentVerification: undefined;
  // Add other screens here as needed
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['http://shohozshadi.com', 'https://shohozshadi.com'],
  config: {
    screens: {
      SplashScreen: 'splash',
      UserDashboard: 'dashboard',
      PaymentVerification: 'app/payment-verification/:tranId', // Match the pathPrefix in your intent filter
      // Add other routes here if needed
    },
  },
};

const AppNavigators = () => {
  const { colors } = useTheme();
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,

          // ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        {user && user.acount_status === 'ACTIVE' ? (
          <>
            <Stack.Screen
              name="UserDashboard"
              component={UserDashboardNavigators}
              options={{
                statusBarHidden: false,
                statusBarColor: 'transparent',
                statusBarTranslucent: true,
              }}
            />
            <Stack.Screen name="UserInfo" component={UserInfoNavigators} />
            <Stack.Screen name="Chat" component={PersonalChatPage} />
            <Stack.Screen
              name="UserDetails"
              component={UserDetails}
              options={{
                statusBarHidden: false,
                statusBarColor: 'transparent',
                statusBarTranslucent: true,
              }}
            />
            <Stack.Screen name="ProfileImage" component={ProfileImage} />
            <Stack.Screen name="Notification" component={NotificationPage} />
            <Stack.Screen name="Terms" component={TermsAndConditions} />
            <Stack.Screen name="Privacy" component={PrivacyPolicy} />
            <Stack.Screen name="Settings" component={SettingsPage} />
            <Stack.Screen name="subscriptionPage" component={SubscriptionPage} />
            <Stack.Screen name="paymentPage" component={PaymentPage} />
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
            <Stack.Screen name="PaymentVerification" component={PaymentVerification} />
            {/* <Stack.Screen name="EditProfileImage" component={UpdateProfilePic} /> */}
          </>
        ) : (
          <>
            <Stack.Screen name="onboard" component={OnboardingScreen} />
            <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
            <Stack.Screen name="Auth" component={AuthNavigators} />
            <Stack.Screen name="Confirm" component={ConfirmNavigators} />
            <Stack.Screen name="UserInfo" component={UserInfoNavigators} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigators;
