import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PartnerInformation from '../screens/partnerInformation/PartnerInformation';

const PartnerInfoStack = createNativeStackNavigator();
const PartnerInfoNavigators = () => {
    return (
        <PartnerInfoStack.Navigator initialRouteName='' screenOptions={{ headerShown: false }}>
            <PartnerInfoStack.Screen name='partner-details' component={PartnerInformation} />
            {/* <UserInfoStack.Screen name='partner-details' component={SignUp} /> */}
        </PartnerInfoStack.Navigator>
    )
}


export default PartnerInfoNavigators