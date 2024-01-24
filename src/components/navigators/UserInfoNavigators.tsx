import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInformation from '../screens/userInformation/UserInformation';
import PartnerInformation from '../screens/partnerInformation/PartnerInformation';
import UserInformationPage1 from '../screens/userInformation/edituserInformation/UserInfoPage1/UserInfoPage1';
import UserInformationPage2 from '../screens/userInformation/edituserInformation/UserInfoPage2/UserInfoPage2';
import UserInformationPage3 from '../screens/userInformation/edituserInformation/UserInfoPage3/UserInfoPage3';
import UserInformationPage4 from '../screens/userInformation/edituserInformation/UserInfoPage4/UserInfoPage4';
import UserInformationPage5 from '../screens/userInformation/edituserInformation/UserInfoPage5/UserInfoPage5';

const UserInfoStack = createNativeStackNavigator();
const UserInfoNavigators = () => {
    return (
        <UserInfoStack.Navigator initialRouteName='UserInfo1' screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
            {/* <UserInfoStack.Screen name='peronsal-details' component={UserInformation} /> */}
            <UserInfoStack.Screen name='UserInfo1' component={UserInformationPage1} />
            <UserInfoStack.Screen name='UserInfo2' component={UserInformationPage2} />
            <UserInfoStack.Screen name='UserInfo3' component={UserInformationPage3} />
            <UserInfoStack.Screen name='UserInfo4' component={UserInformationPage4} />
            <UserInfoStack.Screen name='UserInfo5' component={UserInformationPage5} />
            {/* <UserInfoStack.Screen name='partner-details' component={PartnerInformation} /> */}
        </UserInfoStack.Navigator>
    )
}

export default UserInfoNavigators