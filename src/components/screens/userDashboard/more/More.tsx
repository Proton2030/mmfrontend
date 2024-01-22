import { View, Text, ScrollView, Image } from 'react-native'
import React, { useContext } from 'react'
import SmallCard from '../../../shared/smallCard/SmallCard'
import { MENU_OPTION } from '../../../../constants/MenuOption'
import { defaultUser } from '../../../../assets'
import { globalStyles } from '../../../../globalStyles/GlobalStyles'
import { Appbar, Avatar } from 'react-native-paper'
import AuthContext from '../../../../contexts/authContext/authContext'
import { useNavigation } from '@react-navigation/native'



const More = () => {
    const navigation = useNavigation<any>();
    const { user } = useContext(AuthContext);
    const routeToChatList = () => {
        navigation.navigate("Chat-List");
    }
    const routeToNotificationList = () => {
        navigation.navigate("Notification");
    }
    return (
        <>
            <Appbar.Header style={{
                backgroundColor: '#fde8f1', shadowColor: '#000000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
            }}>
                <Appbar.Content title="Muslim Matrimony" titleStyle={{ color: "#E71B73", fontFamily: "cursive", fontSize: 24, fontWeight: 'bold' }} />
                <Appbar.Action icon="chat-outline" onPress={routeToChatList} />
                <Appbar.Action icon="bell-outline" onPress={routeToNotificationList} />
            </Appbar.Header>
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