import { View, Text } from 'react-native'
import React, { useContext } from 'react'
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

const Stack = createNativeStackNavigator();

const AppNavigators = () => {

    const { user } = useContext(AuthContext);

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    user ?
                        <>
                            <Stack.Screen name="UserDashboard" component={UserDashboardNavigators} />
                            <Stack.Screen name="UserInfo" component={UserInfoNavigators} />
                            <Stack.Screen name='Chat' component={ChatBoard} />
                            <Stack.Screen name="UserDetails" component={UserDetails} />
                            <Stack.Screen name="ProfileImage" component={ProfileImage} />
                            <Stack.Screen name='Notification' component={NotificationPage} />
                            <Stack.Screen name='Terms' component={TermsAndConditions} />
                            <Stack.Screen name='Privacy' component={PrivacyPolicy} />
                            <Stack.Screen name='Payment' component={Payment} />
                            {/* <Stack.Screen name="Auth" component={AuthNavigators} /> */}
                            {/* <Stack.Screen name="EditProfileImage" component={UpdateProfilePic} /> */}
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

export default AppNavigators