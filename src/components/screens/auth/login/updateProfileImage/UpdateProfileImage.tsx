import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button } from 'react-native-paper'
import { globalStyles } from '../../../../../globalStyles/GlobalStyles'
import AuthContext from '../../../../../contexts/authContext/authContext';
import { IUserDetails } from '../../../../../@types/types/userDEtails.types';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import UserDetails from '../../../userDashboard/home/userDetails/UserDetails';
import { api } from '../../../../../utils/api';
import { useNavigation } from '@react-navigation/native';
import { logo } from '../../../../../assets';

const windowWidth = Dimensions.get("window").width;

const UpdateProfileImage = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigation = useNavigation<any>();
    const [isChnaged, setIsChnaged] = useState<boolean>(false);
    const [image, setImage] = useState<string | undefined>(user?.profile_image_url);
    const pickImage = () => {
        let options = {
            mediaType: 'photo' as MediaType,
            includeBase64: true,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {

                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                if (response.assets) {
                    const source = `data:image/jpeg;base64,${response.assets[0].base64}`;
                    setIsChnaged(true);
                    setImage(source);
                }
            }
        });
    };

    const handleSubmitButtonClick = async () => {
        const userDetails = user;
        const userId = user?._id;
        delete userDetails?._id;
        delete userDetails?._id;
        console.log(user);
        if (image && user) {
            const payload = {
                userDetails: { ...userDetails, "profile_image_url": image },
                userObjectId: userId
            }
            const userInstance = await api.userDetails.updateUser(payload);
            if (userInstance) {
                setUser(userInstance);
                navigation.navigate('UserDashboard');
            }
        }
    }

    return (
        <ScrollView style={globalStyles.parent} contentContainerStyle={globalStyles.parentScrollContainer}>
            <View style={styles.viewBox}>
                <Image style={styles.image} source={logo} />
            </View>
            <View style={globalStyles.childContainer}>
                <Text style={globalStyles.headingText}>Welcome Back {user?.full_name},Please Upload Your Profile Image</Text>
            </View>
            <View style={globalStyles.childContainer}>

                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                    {image ?
                        <Image source={{ uri: image }} style={styles.profileImage} /> : null
                    }
                    <Button mode='outlined' style={globalStyles.lightPinkButton} onPress={pickImage}>Upload</Button>
                </View>
                <Button mode='contained' style={globalStyles.pinkButton} disabled={!isChnaged} onPress={handleSubmitButtonClick}>Complete</Button>
            </View>
        </ScrollView>
    )
}

export default UpdateProfileImage;


const styles = StyleSheet.create({
    image: {
        width: windowWidth / 4,
        height: windowWidth / 4, // Make the height equal to the width
        borderRadius: windowWidth / 8, // Set the border radius to half of the width or height to make the image round
        resizeMode: 'cover',
        marginBottom: 10 // Cover the whole View without distortion
    },
    profileImage: {
        width: windowWidth / 2,
        height: windowWidth / 2, // Make the height equal to the width
        borderRadius: windowWidth / 4, // Set the border radius to half of the width or height to make the image round
        resizeMode: 'cover',
        marginBottom: 10 // Cover the whole View without distortion
    },
    viewBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    }
});