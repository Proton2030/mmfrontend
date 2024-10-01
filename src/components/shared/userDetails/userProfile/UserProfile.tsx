import React, { useCallback, useContext, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient'; // Import LinearGradient
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Change this if using another icon library
import { COLORS } from '../../../../constants/theme';
import { useTheme } from 'react-native-paper';
import { OTHERS } from '../../../../constants/texts/others/Others';
import { selectLanguage } from '../../../../utils/commonFunction/languageSelect';
import UiContext from '../../../../contexts/uiContext/UIContext';
import { getTimeAgo } from '../../../../utils/commonFunction/lastSeen';
import ProfileDetailsCard from './profileDetailCard/ProfileDetailsCard';
import { PERSONAL_DETAILS, USER_INFO_FOUR, USER_INFO_THREE, USER_INFO_THREE_part2, USER_INFO_TWO } from '../../../../constants/forms/UserInformation';
import { IField } from '../../../../@types/types/FieldTypes.types';
import { formatKeys } from '../../../../utils/commonFunction/formatKeys';
import ProfileImage from './profileImage/ProfileImage';
import AuthContext from '../../../../contexts/authContext/authContext';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../../utils/api';

const UserProfile = ({ uri, userDetails }: any) => {
    const { colors } = useTheme();
    const { user } = useContext(AuthContext)
    const {
        ui: { language, theme },
    } = useContext(UiContext);
    const navigation = useNavigation<any>();
    const [choice, setChoice] = useState<boolean>(false);

    const handleNavigateChat = () => {
        let roomId = '';
        if (user && user._id && userDetails._id) {
            if (user?.gender === 'MALE') {
                roomId = user._id + userDetails._id;
            } else {
                roomId = userDetails._id + user._id;
            }
            console.log('roomId', roomId);
            navigation.navigate('Chat', {
                userDetails: userDetails,
                roomId: roomId,
            });
        }
    };

    const handleParsonalInfoNavigate = () => {
        navigation.navigate('UserInfo', {
            screen: 'UserInfo1',
            params: {
                editable: true,
                // Any other parameters you want to pass
            },
        });
        console.log('navigate');
    };
    const handleJobInfoNavigate = () => {
        navigation.navigate('UserInfo', {
            screen: 'UserInfo2',
            params: {
                editable: true,
                // Any other parameters you want to pass
            },
        });
    };
    const handleEduInfoNavigate = () => {
        navigation.navigate('UserInfo', {
            screen: 'UserInfo3',
            params: {
                editable: true,
                // Any other parameters you want to pass
            },
        });
    };
    const handleReligiousInfoNavigate = () => {
        navigation.navigate('UserInfo', {
            screen: 'UserInfo3_part2',
            params: {
                editable: true,
                // Any other parameters you want to pass
            },
        });
    };
    const handleFamilyInfoNavigate = () => {
        navigation.navigate('UserInfo', {
            screen: 'UserInfo4',
            params: {
                editable: true,
                // Any other parameters you want to pass
            },
        });
    };

    const addChoice = useCallback(async (sender_id: string, reciver_id: string) => {
        setChoice((prev) => !prev);
        const payload = {
            senderId: user?._id,
            recieverId: userDetails._id,
        };
        const response = await api.userChoice.addChoice(payload);
    }, []);

    const handleNavigateProfileImage = () => {
        navigation.navigate('ProfileImage', {
            userid: userDetails._id,
            username: userDetails.full_name,
            imageURL: userDetails.profile_image_url,
        });
    };

    const handleAddChoice = useCallback(() => {
        if (user?._id && userDetails._id) {
            addChoice(user._id, userDetails._id);
        }
    }, [user]);
    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: colors.background,
        }}>

            <ProfileImage
                handleNavigateChat={handleNavigateChat} uri={uri} userDetails={userDetails}
                handleNavigateProfileImage={handleNavigateProfileImage}
                handleAddChoice={handleAddChoice} choice={choice}
            />

            {/* Account Overview Section */}
            <View style={styles.accountOverview}>
                <View style={[styles.option]}>
                    <View style={styles.optionRow}>
                        {/* <Icon name="account" size={24} color="#4CAF50" /> */}
                        <Text style={[styles.optionText, { color: colors.scrim, fontWeight: "700" }]}>
                            Profile Details
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleParsonalInfoNavigate} style={{
                        flexDirection: "row", gap: 5, backgroundColor: theme !== "DARK" ? "#e6e6e6" : colors.backdrop,
                        paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, alignItems: "center", justifyContent: "center"
                    }}>
                        <Icon name="pencil" size={14} color={colors.tertiary} />
                        <Text style={{ color: colors.tertiary, fontWeight: "700", fontSize: 12 }}>Edit</Text>

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                    {PERSONAL_DETAILS.map((key: IField, index: number) => {
                        if (key.id === 'gender' || key.id === 'state' || key.id === 'full_name') {
                            return null;
                        }

                        return (
                            <View key={index}>
                                <View style={{
                                    backgroundColor: theme !== "DARK" ? "#e6e6e6" : colors.backdrop,
                                    height: 50,
                                    width: 110,
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    gap: 4,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: colors.tertiary, fontSize: 12 }}>
                                        {formatKeys(key.id, language)}
                                    </Text>
                                    <Text style={{ color: theme === "DARK" ? "white" : colors.tertiary, fontWeight: "500" }}>
                                        {userDetails[key.id]}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                <View style={[styles.option]}>
                    <View style={styles.optionRow}>
                        {/* <Icon name="account" size={24} color="#4CAF50" /> */}
                        <Text style={[styles.optionText, { color: colors.scrim, fontWeight: "700" }]}>
                            Professional Details
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleJobInfoNavigate} style={{
                        flexDirection: "row", gap: 5, backgroundColor: theme !== "DARK" ? "#e6e6e6" : colors.backdrop,
                        paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, alignItems: "center", justifyContent: "center"
                    }}>
                        <Icon name="pencil" size={14} color={colors.tertiary} />
                        <Text style={{ color: colors.tertiary, fontWeight: "700", fontSize: 12 }}>Edit</Text>

                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                    {USER_INFO_TWO.map((key: IField, index: number) => {
                        if (key.id === 'gender' || key.id === 'state' || key.id === 'full_name') {
                            return null;
                        }

                        return (
                            <View key={index}>
                                <View style={{
                                    backgroundColor: theme !== "DARK" ? "#e6e6e6" : colors.backdrop,
                                    height: 50,
                                    width: "auto",
                                    minWidth: 110,
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    gap: 4,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: colors.tertiary, fontSize: 12 }}>
                                        {formatKeys(key.id, language)}
                                    </Text>
                                    <Text style={{ color: theme === "DARK" ? "white" : colors.tertiary, fontWeight: "500" }}>
                                        {userDetails[key.id]}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                <View style={[styles.option]}>
                    <View style={styles.optionRow}>
                        {/* <Icon name="account" size={24} color="#4CAF50" /> */}
                        <Text style={[styles.optionText, { color: colors.scrim, fontWeight: "700" }]}>
                            Education
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleEduInfoNavigate} style={{
                        flexDirection: "row", gap: 5, backgroundColor: theme !== "DARK" ? "#e6e6e6" : colors.backdrop,
                        paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, alignItems: "center", justifyContent: "center"
                    }}>
                        <Icon name="pencil" size={14} color={colors.tertiary} />
                        <Text style={{ color: colors.tertiary, fontWeight: "700", fontSize: 12 }}>Edit</Text>

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                    {USER_INFO_THREE.map((key: IField, index: number) => {
                        if (key.id === 'gender' || key.id === 'state' || key.id === 'full_name') {
                            return null;
                        }

                        return (
                            <View key={index}>
                                <View style={{
                                    backgroundColor: theme !== "DARK" ? "#e6e6e6" : colors.backdrop,
                                    height: 50,
                                    width: "auto",
                                    minWidth: 110,
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    gap: 4,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: colors.tertiary, fontSize: 12 }}>
                                        {formatKeys(key.id, language)}
                                    </Text>
                                    <Text style={{ color: theme === "DARK" ? "white" : colors.tertiary, fontWeight: "500" }}>
                                        {userDetails[key.id]}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

                <View style={[styles.option]}>
                    <View style={styles.optionRow}>
                        {/* <Icon name="account" size={24} color="#4CAF50" /> */}
                        <Text style={[styles.optionText, { color: colors.scrim, fontWeight: "700" }]}>
                            Religious Information
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleReligiousInfoNavigate} style={{
                        flexDirection: "row", gap: 5, backgroundColor: theme !== "DARK" ? "#e6e6e6" : colors.backdrop,
                        paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, alignItems: "center", justifyContent: "center"
                    }}>
                        <Icon name="pencil" size={14} color={colors.tertiary} />
                        <Text style={{ color: colors.tertiary, fontWeight: "700", fontSize: 12 }}>Edit</Text>

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                    {USER_INFO_THREE_part2.map((key: IField, index: number) => {
                        if (key.id === 'gender' || key.id === 'state' || key.id === 'full_name') {
                            return null;
                        }

                        return (
                            <View key={index}>
                                <View style={{
                                    backgroundColor: theme !== "DARK" ? "#e6e6e6" : colors.backdrop,
                                    height: 50,
                                    width: "auto",
                                    minWidth: 110,
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    gap: 4,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: colors.tertiary, fontSize: 12 }}>
                                        {formatKeys(key.id, language)}
                                    </Text>
                                    <Text style={{ color: theme === "DARK" ? "white" : colors.tertiary, fontWeight: "500" }}>
                                        {userDetails[key.id]}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
                <View style={[styles.option]}>
                    <View style={styles.optionRow}>
                        {/* <Icon name="account" size={24} color="#4CAF50" /> */}
                        <Text style={[styles.optionText, { color: colors.scrim, fontWeight: "700" }]}>
                            Family Background
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleFamilyInfoNavigate} style={{
                        flexDirection: "row", gap: 5, backgroundColor: theme !== "DARK" ? "#e6e6e6" : colors.backdrop,
                        paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, alignItems: "center", justifyContent: "center"
                    }}>
                        <Icon name="pencil" size={14} color={colors.tertiary} />
                        <Text style={{ color: colors.tertiary, fontWeight: "700", fontSize: 12 }}>Edit</Text>

                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                    {USER_INFO_FOUR.map((key: IField, index: number) => {
                        return (
                            <View key={index}>
                                <View style={{
                                    backgroundColor: theme !== "DARK" ? "#e6e6e6" : colors.backdrop,
                                    height: 50,
                                    width: "auto",
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    gap: 4,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: colors.tertiary, fontSize: 12 }}>
                                        {formatKeys(key.id, language)}
                                    </Text>
                                    <Text style={{ color: theme === "DARK" ? "white" : colors.tertiary, fontWeight: "500" }}>
                                        {userDetails[key.id]}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    header: {
        height: 400,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingBottom: 30,
        overflow: 'hidden',
        elevation: 15
    },
    imageStyle: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject, // Make the gradient cover the entire ImageBackground
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    userInfo: {
        marginTop: 30,
    },
    name: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
    phone: {
        fontSize: 16,
        color: '#fff',
        marginTop: 4,
    },
    editButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        padding: 8,
    },
    accountOverview: {
        marginTop: 10,
        paddingHorizontal: 15,
    },
    option: {
        paddingTop: 25,
        paddingBottom: 10,
        borderRadius: 10,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 18,
        marginLeft: 5,
        color: '#333',
    },
});

export default UserProfile;
