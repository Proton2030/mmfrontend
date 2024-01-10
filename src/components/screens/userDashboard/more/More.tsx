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
        <>
            <ScrollView contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ marginBottom: 30, marginTop: 30 }}>
                    {
                        user ?
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 10 }}>
                                <Avatar.Image size={45} source={{ uri: user.profile_image_url }} />
                                <Text style={[globalStyles.headingText, { textAlign: "left" }]}>{user.full_name}</Text>
                            </View> : null
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
        </>
    )
}

export default More