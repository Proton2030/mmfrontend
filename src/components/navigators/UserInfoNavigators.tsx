import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInformation from '../screens/userInformation/UserInformation';
import PartnerInformation from '../screens/partnerInformation/PartnerInformation';

const UserInfoStack = createNativeStackNavigator();
const UserInfoNavigators = () => {
    return (
        <UserInfoStack.Navigator initialRouteName='' screenOptions={{ headerShown: false }}>
            <UserInfoStack.Screen name='peronsal-details' component={UserInformation} />
            <UserInfoStack.Screen name='partner-details' component={PartnerInformation} />
        </UserInfoStack.Navigator>
    )
}

export default UserInfoNavigators