import { View, Text, ScrollView, KeyboardAvoidingView, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { Button } from 'react-native-paper';
import CenterForm from '../../../../shared/centerForm/CenterForm';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import AuthContext from '../../../../../contexts/authContext/authContext';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import SnackbarAlert from '../../../../shared/snackbarAlert/SnackbarAlert';
import { api } from '../../../../../utils/api';
import { logo } from '../../../../../assets';
import { USER_INFO_FOUR, USER_INFO_ONE, USER_INFO_THREE, USER_INFO_TWO } from '../../../../../constants/forms/UserInformation';
import { IUserInfo } from '../../../../../@types/types/userInfo.types';
import { IUserInfo1 } from '../../../../../@types/types/userInfo1.types';
import { IUserInfo2 } from '../../../../../@types/types/userInfo2.types';
import { IUserInfo3 } from '../../../../../@types/types/userInfo3.types';
import { IUserInfo4 } from '../../../../../@types/types/userInfo4.types';
import { IUserInfo5 } from '../../../../../@types/types/userInfo5.types';
import { handelVibrate } from '../../../../../utils/commonFunction/systemvibration';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const UserInformationPage5 = () => {
    const { user, setUser } = useContext(AuthContext);
    const [screen, setScreen] = useState<number>(0);

    const [errorMessage, setErrorMessage] = useState<string>("Please Fill the Details");
    const [userInfo, setUserInfo] = useState<IUserInfo5>({
        profile_image_url: "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
    })

    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const handleSetDefaultData = useCallback(() => {
        if (user) {
            const tempData: any = user;
            delete tempData.updatedAt;
            setUserInfo(user);
        }
    }, [user])
    const routeUserDashboard = CommonActions.reset({
        index: 0,
        routes: [
            {
                name: 'UserDashboard'
            },
        ],
    });
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
                    setUserInfo(Object.assign({}, userInfo, { "profile_image_url": source }));
                }
            }
        });
    };
    const handleUplod = async () => {
        setLoading(true)
        if (user) {
            if (userInfo.profile_image_url !== "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg") {
                const response = await api.userDetails.updateUserImage({
                    userObjectId: user._id,
                    profileImage: userInfo.profile_image_url
                });
                console.log("----->first", response.profile_image_url);
                setUserInfo(Object.assign({}, userInfo, { "profile_image_url": response.profile_image_url }));
                setUser(response);
                setLoading(false)
                navigation.dispatch(routeUserDashboard);
            }
            else {
                setErrorMessage("Please Upload Profile Image")
                setVisible(true);
                handelVibrate()
                return;
            }
        }
    }


    const handleGoBack = () => {
        // Navigate back to the previous screen
        navigation.goBack();
    };
    const handleCompleteButtonClick = useCallback(async () => {

        setLoading(true)
        if (user) {

            const payload = {
                userDetails: userInfo,
                userObjectId: user._id
            }

            try {

                const userInstance = await api.userDetails.updateUser(payload);
                if (userInstance) {
                    setUser(userInstance);
                    setLoading(false)
                    navigation.dispatch(routeUserDashboard);
                }
            } catch (error) {
                console.log(error);

            }

        }
    }, [user, userInfo]);

    const [visible, setVisible] = React.useState(false);

    const onDismissSnackBar = () => setVisible(false);

    useEffect(() => {
        handleSetDefaultData();
    }, [handleSetDefaultData])

    return (

        <>
            <ScrollView style={globalStyles.parent} contentContainerStyle={globalStyles.parentScrollContainer}>
                <View style={styles.viewBox}>
                    <Image style={styles.image} source={logo} />
                </View>
                <View style={globalStyles.childContainer}>
                    <Text style={globalStyles.headingText}>Please Give Your Profile Image</Text>
                </View>
                <View style={globalStyles.childContainer}>


                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                        <Image source={{ uri: userInfo.profile_image_url }} style={styles.profileImage} />
                        <Button mode='outlined' style={globalStyles.lightPinkButton} onPress={pickImage}>Upload</Button>
                    </View>
                    <Button mode='contained' loading={loading} style={[globalStyles.pinkButton, { marginBottom: 18 }]} onPress={handleUplod}>Submit</Button>
                    <Button mode='outlined' style={globalStyles.lightPinkButton} onPress={handleGoBack}>Back</Button>

                </View>

            </ScrollView>
            <SnackbarAlert message={errorMessage} onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
        </>
    )
}

export default UserInformationPage5

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
})