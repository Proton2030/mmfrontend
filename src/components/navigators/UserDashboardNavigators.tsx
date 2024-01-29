import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDashboard from '../screens/userDashboard/UserDashboard';
import Chats from '../screens/userDashboard/chats/Chats';
import UpdateProfileImage from '../screens/auth/login/updateProfileImage/UpdateProfileImage';

const UserDashboardStack = createNativeStackNavigator();

const UserDashboardNavigators = () => {
    return (
        <UserDashboardStack.Navigator initialRouteName='UserDashboard' screenOptions={{ headerShown: false }}>
            <UserDashboardStack.Screen name='User' component={UserDashboard} />
            <UserDashboardStack.Screen name='Chat-List' component={Chats} />
            <UserDashboardStack.Screen name='changeImage' component={UpdateProfileImage} />
        </UserDashboardStack.Navigator>
    )
}

export default UserDashboardNavigators