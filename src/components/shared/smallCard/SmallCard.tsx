import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { Card } from 'react-native-paper'
import { globalStyles } from '../../../globalStyles/GlobalStyles'
import { TMenuProps } from '../../../@types/props/MenuProps.types'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../../contexts/authContext/authContext'

const SmallCard = ({ icon, text }: TMenuProps) => {
    const navigation = useNavigation<any>();
    const { setUser } = useContext(AuthContext);
    const handleLogOut = () => {
        navigation.navigate('Auth', { screen: 'login' });
        setUser(null);
    }
    const handleClick = () => {
        if (text === "Logout") {
            handleLogOut();
        }
    }
    return (
        <Card style={globalStyles.menuCard} onPress={handleClick}>
            <Card.Content>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10
                    }}>
                        <Icon name={icon} size={20} color="#E71B73" />
                        <Text style={globalStyles.menucardText}>{text}</Text>
                    </View>
                    <Icon name="arrow-right" size={20} color="#E71B73" />
                </View>
            </Card.Content>
        </Card>
    )
}

export default SmallCard