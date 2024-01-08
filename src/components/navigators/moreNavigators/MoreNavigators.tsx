import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import More from '../../screens/userDashboard/more/More';

const MoreStack = createNativeStackNavigator();

const MoreNavigators = () => {
    return (
        <MoreStack.Navigator initialRouteName='more' screenOptions={{ headerShown: false }}>
            <MoreStack.Screen name='user' component={More} />
        </MoreStack.Navigator>
    )
}

export default MoreNavigators