import { View, Text, Image, Dimensions } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { Avatar, Button, Card, IconButton } from 'react-native-paper'
import { globalStyles } from '../../../globalStyles/GlobalStyles'
import { education } from '../../../assets'
import { IUserCardProps } from '../../../@types/props/UserCardProps.types'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AuthContext from '../../../contexts/authContext/authContext'
import { useNavigation } from '@react-navigation/native'

const UserCard = React.memo(({ userDetails, addChoice }: IUserCardProps) => {
    const [choice, setChoice] = useState<boolean>(false);
    const navigation = useNavigation<any>();
    const { user } = useContext(AuthContext);
    const handleNavigateChat = () => {
        navigation.navigate('Chat', {
            profile_image: userDetails.profile_image_url,
            name: userDetails.full_name
        });
    }
    const handleAddChoice = useCallback(() => {
        if (user?._id && userDetails._id) {
            addChoice(user._id, userDetails._id)
            setChoice(true);
        }
    }, [user]);
    return (
        <View style={globalStyles.card}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: 10, paddingLeft: 10, marginBottom: 15 }}>
                <Avatar.Image size={45} source={{ uri: userDetails.profile_image_url }} />
                <View style={{ display: "flex", width: "100%" }}>
                    <Text style={{ color: "#E71B73", fontSize: 18, fontWeight: "bold" }}>{userDetails.full_name || "Test Account"}
                        <Text style={{ color: "black", fontSize: 15 }}>
                            &nbsp;({userDetails.age} yrs)
                        </Text>
                    </Text>
                    <View style={globalStyles.iconText}>
                        <Icon name="map-marker-alt" size={18} color="#E71B73" />
                        <Text style={{ color: "black", fontSize: 14 }}>
                            Lives In {userDetails.state || "N/A"}</Text>
                    </View>
                </View>
            </View>
            <View>
                <Image source={{ uri: userDetails.profile_image_url }} style={globalStyles.cardImage} />
            </View>
            <View style={{ display: 'flex', flexDirection: "row", columnGap: 15, paddingLeft: 10, marginTop: 10 }}>
                <View style={globalStyles.iconText}>
                    <Icon name="ruler-vertical" size={18} color="#E71B73" />
                    <Text style={{ color: "#6e6d6d" }}>{userDetails.height} ft</Text>
                </View>
                <View style={globalStyles.iconText}>
                    <Icon name="dumbbell" size={18} color="#E71B73" />
                    <Text style={{ color: "#6e6d6d" }}>{userDetails.weight} kg</Text>
                </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
                <IconButton icon={choice ? "heart" : "heart-outline"} onPress={handleAddChoice} iconColor={choice ? "red" : "black"}></IconButton>
                <IconButton icon={"chat-outline"} onPress={handleNavigateChat}></IconButton>
                <IconButton icon={"information-outline"}></IconButton>
            </View>
        </View>
    )
})

export default UserCard