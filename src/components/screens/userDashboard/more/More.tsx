import { View, Text, ScrollView, Image } from 'react-native'
import React, { useContext } from 'react'
import SmallCard from '../../../shared/smallCard/SmallCard'
import { MENU_OPTION } from '../../../../constants/MenuOption'
import { defaultUser } from '../../../../assets'
import { globalStyles } from '../../../../globalStyles/GlobalStyles'
import { Avatar } from 'react-native-paper'
import AuthContext from '../../../../contexts/authContext/authContext'

const More = () => {
    const { user } = useContext(AuthContext);
    return (
        <ScrollView contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}>
            <View style={{ marginBottom: 30, marginTop: 30 }}>
                {
                    user ?
                        <Text style={[globalStyles.headingText, { textAlign: "left" }]}>Hello, {user.full_name}</Text> : null
                }
            </View>
            {
                MENU_OPTION.map((menu, index) => {
                    return (
                        <SmallCard icon={menu.icon} route={menu.route} text={menu.text} key={index} />
                    )
                })
            }
        </ScrollView>
    )
}

export default More