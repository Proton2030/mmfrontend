import { ScrollView, Image, Dimensions, Animated, Easing, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { formatKeys } from '../../../utils/commonFunction/formatKeys';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch, IconButton } from 'react-native-paper';
import { USER_INFO_FOUR, USER_INFO_ONE, USER_INFO_THREE, USER_INFO_TWO } from '../../../constants/forms/UserInformation';
import { PARTNER_INFO_ONE, PARTNER_INFO_THREE, PARTNER_INFO_TWO } from '../../../constants/forms/PartnerInformation';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../contexts/authContext/authContext';
import { api } from '../../../utils/api';
import { getTimeAgo } from '../../../utils/commonFunction/lastSeen';

const UserDetails = () => {
    const route = useRoute<any>();
    const { user } = useContext(AuthContext);
    const [choice, setChoice] = useState<boolean>(false);
    const { userDetails, editable } = route.params;
    const fadeAnim = new Animated.Value(0);
    const navigation = useNavigation<any>();

    const handlePartnerNavigate = () => {
        navigation.navigate('UserInfo', {
            screen: 'partner-details',
            params: {
                editable: false  // Another example parameter
            }
        }
        );
        console.log("navigate");

    }
    const handleParsonalNavigate = () => {
        console.log("clicked")
        navigation.navigate('UserInfo', {
            params: {
                screen: 'personal-details',
                editable: false  // Another example parameter
            }
        }
        );
        console.log("navigate");
    }

    const addChoice = useCallback(async (sender_id: string, reciver_id: string) => {
        const payload = {
            senderId: user?._id,
            recieverId: userDetails._id
        }
        const response = await api.userChoice.addChoice(payload);
    }, []);

    const handleNavigateProfileImage = () => {
        navigation.navigate('ProfileImage', {
            userid: userDetails._id,
            username: userDetails.full_name,
            imageURL: userDetails.profile_image_url
        })
    }

    const handleNavigateChat = () => {
        let roomId = "";
        if (user && user._id && userDetails._id) {
            if (user?.gender === "MALE") {
                roomId = user._id + userDetails._id;
            }
            else {
                roomId = userDetails._id + user._id;
            }
            console.log("roomId", roomId)
            navigation.navigate('Chat', {
                profile_image: userDetails.profile_image_url,
                name: userDetails.full_name,
                userId: userDetails._id,
                roomId: roomId
            });
        }
    }

    const handleAddChoice = useCallback(() => {
        if (user?._id && userDetails._id) {
            addChoice(user._id, userDetails._id)
            setChoice(true);
        }
    }, [user]);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 15 }}>
                    <TouchableOpacity onPress={handleNavigateProfileImage}>
                        <Avatar.Image
                            source={{
                                uri: userDetails.profile_image_url,
                            }}
                            size={80}
                        />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>{userDetails.full_name}</Title>
                        <Text style={{ color: "#E71B73", fontSize: 16 }}>{userDetails.age} Years</Text>
                        <Text style={{ color: "#E71B73", fontSize: 16 }}>Lives in {userDetails.state || "N/A"}</Text>
                        {
                            userDetails.status === "ACTIVE" ?
                                <Text>online</Text> :
                                <Text>{getTimeAgo(new Date().getTime() - new Date(userDetails.updatedAt).getTime())}</Text>
                        }
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSectionTwo}>
                <View>
                    <Paragraph style={styles.paragraph}>{userDetails.marital_status}</Paragraph>
                </View>
                {

                    !editable ?
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <IconButton icon={choice ? "heart" : "heart-outline"} onPress={handleAddChoice} iconColor={choice ? "red" : "black"}></IconButton>
                            <IconButton icon={"chat-outline"} onPress={handleNavigateChat}></IconButton>
                        </View> : null
                }
            </View>


            <ScrollView style={styles.menuWrapper}>
                <View style={{ marginBottom: 16 }}>
                    <View style={globalStyles.iconText}>
                        <Text style={[globalStyles.mediumText, { marginBottom: 18, color: "#E71B73" }]}>Personal Information</Text>
                        {
                            editable ?
                                <IconButton icon="pencil-outline" onPress={handleParsonalNavigate} /> : null
                        }
                    </View>
                    {USER_INFO_ONE.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                {
                                    key.id === "age" ?
                                        <Text style={styles.infoValue}>{userDetails[key.id]} years</Text> :
                                        key.id === "height" ?
                                            <Text style={styles.infoValue}>{userDetails[key.id]} feet</Text> :
                                            key.id === "weight" ?
                                                <Text style={styles.infoValue}>{userDetails[key.id]} kg</Text> :
                                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                                }

                            </View>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 16 }}>
                    <View style={globalStyles.iconText}>
                        <Text style={[globalStyles.mediumText, { marginBottom: 18, color: "#E71B73" }]}>Job Information</Text>
                        {
                            editable ?
                                <IconButton icon="pencil-outline" onPress={handleParsonalNavigate} /> : null
                        }
                    </View>
                    {USER_INFO_TWO.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                            </View>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 16 }}>
                    <View style={globalStyles.iconText}>
                        <Text style={[globalStyles.mediumText, { marginBottom: 18, color: "#E71B73" }]}>Education Information</Text>
                        {
                            editable ?
                                <IconButton icon="pencil-outline" onPress={handlePartnerNavigate} /> : null
                        }
                    </View>
                    {USER_INFO_THREE.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                            </View>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 16 }}>
                    <View style={globalStyles.iconText}>
                        <Text style={[globalStyles.mediumText, { marginBottom: 18, color: "#E71B73" }]}>Religious Information</Text>
                        {
                            editable ?
                                <IconButton icon="pencil-outline" onPress={handlePartnerNavigate} /> : null
                        }
                    </View>
                    {USER_INFO_FOUR.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                            </View>
                        );
                    })}
                </View>

            </ScrollView>

        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    userInfoSection: {
        paddingLeft: 20,
        backgroundColor: '#fde8f1',
        paddingBottom: 8,
        display: "flex",
        flexDirection: "row",
        width: "100%",
    },
    userInfoSectionTwo: {
        paddingLeft: 20,
        backgroundColor: '#fde8f1',
        paddingBottom: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    title: {
        fontSize: 24,
        marginTop: 15,
        fontWeight: 'bold',
        color: '#E71B73',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#E71B73',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
        color: '#E71B73',
    },
    infoBoxWrapper: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#ecf0f1',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    infoBox: {
        alignItems: 'center',
    },
    menuWrapper: {
        marginTop: 10,
        padding: 20,
    },
    infoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#333',
    },
    infoValue: {
        color: '#555',
    },
});

export default UserDetails;