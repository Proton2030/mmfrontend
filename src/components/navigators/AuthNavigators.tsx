import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/login/Login';
import SignUp from '../screens/auth/signup/SignUp';
import UpdateProfileImage from '../screens/auth/login/updateProfileImage/UpdateProfileImage';

const AuthStack = createNativeStackNavigator();

const AuthNavigators = () => {
    return (
        <AuthStack.Navigator initialRouteName='auth' screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name='login' component={Login} />
            <AuthStack.Screen name='signup' component={SignUp} />
            <AuthStack.Screen name='changeImage' component={UpdateProfileImage} />
        </AuthStack.Navigator>
    )
}

export default AuthNavigators