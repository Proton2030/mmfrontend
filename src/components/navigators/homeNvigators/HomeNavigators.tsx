import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/userDashboard/home/Home';
import UserDetails from '../../shared/userDetails/UserDetails';

const HomeStack = createNativeStackNavigator();

const HomeNavigators = () => {
    return (
        <HomeStack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name='dashboard' component={Home} />
            <HomeStack.Screen name='userDetails' component={UserDetails} />
        </HomeStack.Navigator>
    )
}

export default HomeNavigators