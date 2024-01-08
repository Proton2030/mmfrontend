import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyChoice from '../../screens/userDashboard/choice/myChoice/MyChoice';
import ChooseMe from '../../screens/userDashboard/choice/chooseMe/ChooseMe';

const Tab = createMaterialTopTabNavigator();;

const ChoiceNavigators = () => {
    return (
        <>
            <Tab.Navigator>
                <Tab.Screen name="MyChoice" options={{ tabBarLabel: "My Choice", tabBarIndicatorStyle: { backgroundColor: "#E71B73" } }} component={MyChoice} />
                <Tab.Screen name="ChooseMe" options={{ tabBarLabel: "Choose Me", tabBarIndicatorStyle: { backgroundColor: "#E71B73" } }} component={ChooseMe} />
                {/* <Tab.Screen name="ScreenTwo" component={ScreenTwo} /> */}
            </Tab.Navigator>
        </>
    )
}

export default ChoiceNavigators