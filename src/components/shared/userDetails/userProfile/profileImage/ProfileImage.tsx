import React, { useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { selectLanguage } from '../../../../../utils/commonFunction/languageSelect';
import { getTimeAgo } from '../../../../../utils/commonFunction/lastSeen';
import { OTHERS } from '../../../../../constants/texts/others/Others';
import { IconButton, useTheme } from 'react-native-paper';
import UiContext from '../../../../../contexts/uiContext/UIContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Change this if using another icon library
import { COLORS } from '../../../../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../../../../contexts/authContext/authContext';


const ProfileImage = ({ uri, userDetails, handleNavigateChat, handleNavigateProfileImage, handleAddChoice, choice }: any) => {
    const { colors } = useTheme();
    const {
        ui: { language, theme },
    } = useContext(UiContext);
    const {
        user
    } = useContext(AuthContext);
    return (
        <ImageBackground
            source={{ uri: uri }} // Replace with your desired background image
            style={styles.header}
            imageStyle={styles.imageStyle}
        >
            {/* Overlay Linear Gradient */}
            <LinearGradient
                colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']} // Dark at top and bottom
                style={styles.gradientOverlay}
            />
            <View style={styles.profileInfo}>
                <View style={styles.userInfo}>
                    <Text style={styles.name}> {userDetails.full_name}
                        {userDetails.is_verified ? <Icon name="verified" size={18} /> : null}
                        &nbsp; <Icon name="male" size={20} color={COLORS.primary} />
                    </Text>
                    <Text style={styles.phone}> {selectLanguage(OTHERS.lives, language)} {userDetails.state || 'N/A'}</Text>
                    {userDetails.status === 'ACTIVE' ? (
                        <Text style={{ color: "white" }}>online</Text>
                    ) : (
                        <Text style={{ color: "gray", marginLeft: 5, marginTop: 3 }}>Active {getTimeAgo(new Date().getTime() - new Date(userDetails.updatedAt).getTime())}</Text>
                    )}
                </View>
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleNavigateProfileImage}>
                <Icon name="eye" size={20} color="#fff" />
            </TouchableOpacity>
            {
                userDetails._id !== user?._id ?
                    <>
                        <TouchableOpacity style={styles.msgButton} >
                            {/* <IconButton
                                icon={choice ? 'heart' : 'heart-outline'}
                                onPress={handleAddChoice}
                                iconColor={choice ? 'red' : colors.scrim}
                            ></IconButton> */}
                            <Ionicons name={choice ? 'heart' : 'heart-outline'} size={24}
                                color={'white'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNavigateChat} style={styles.LikeButton}>
                            <Ionicons name="chatbubble-ellipses-outline" size={24} color={"white"} />
                        </TouchableOpacity>
                    </>
                    : null
            }

        </ImageBackground>
    )
}

export default ProfileImage



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    header: {
        height: 430,
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
        fontSize: 25,
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
        backgroundColor: "black",
        borderRadius: 20,
        padding: 8,
    },
    msgButton: {
        position: 'absolute',
        bottom: 40,
        right: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        padding: 10,
    },
    LikeButton: {
        position: 'absolute',
        bottom: 40,
        right: 90,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        padding: 10,
    },
    accountOverview: {
        marginTop: 20,
        paddingHorizontal: 15,
    },
    option: {
        paddingTop: 20,
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