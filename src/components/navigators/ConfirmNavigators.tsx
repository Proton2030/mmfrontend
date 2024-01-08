import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfirmationPage from '../screens/auth/signup/confirmationPage/ConfirmationPage';

const ConfirmStack = createNativeStackNavigator();

const ConfirmNavigators = () => {
    return (
        <ConfirmStack.Navigator screenOptions={{ headerShown: false }}>
            <ConfirmStack.Screen name='confirm' component={ConfirmationPage} />
        </ConfirmStack.Navigator>
    )
}

export default ConfirmNavigators