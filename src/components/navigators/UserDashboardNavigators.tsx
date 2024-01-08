import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDashboard from '../screens/userDashboard/UserDashboard';
import UserDetails from '../screens/userDashboard/home/userDetails/UserDetails';

const UserDashboardStack = createNativeStackNavigator();

const UserDashboardNavigators = () => {
    return (
        <UserDashboardStack.Navigator initialRouteName='UserDashboard' screenOptions={{ headerShown: false }}>
            <UserDashboardStack.Screen name='User' component={UserDashboard} />
        </UserDashboardStack.Navigator>
    )
}

export default UserDashboardNavigators