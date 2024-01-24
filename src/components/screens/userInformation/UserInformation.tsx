import { View, Text, ScrollView, KeyboardAvoidingView, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { color, defaultUser, education, family, hello, imam, job, location, logo, muslimLove, weight } from '../../../assets';
import { Button } from 'react-native-paper';
import CenterForm from '../../shared/centerForm/CenterForm';
import { USER_INFO_FOUR, USER_INFO_ONE, USER_INFO_THREE, USER_INFO_TWO } from '../../../constants/forms/UserInformation';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { IUserInfo } from '../../../@types/types/userInfo.types';
import { api } from '../../../utils/api';
import AuthContext from '../../../contexts/authContext/authContext';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import SnackbarAlert from '../../shared/snackbarAlert/SnackbarAlert';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserInformation = () => {
    const { user, setUser } = useContext(AuthContext);
    const [screen, setScreen] = useState<number>(0);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        full_name: "",
        gender: "",
        age: 0,
        marital_status: "",
        country: "",
        state: "",
        height: 0,
        weight: 0,
        body_color: "",
        occupation: "",
        work_place: "",
        monthly_income: "",
        education: "",
        islamic_education: "",
        salah: "",
        sawum: "",
        message_limit: 0,
        fathers_name: "",
        fathers_occupation: "",
        mothers_name: "",
        mothers_occupation: "",
        no_of_brothers: 0,
        no_of_sisters: 0,
        financial_condition: "",
        status: "ACTIVE",
        profile_image_url: "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
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

    const handleChangeText = useCallback((field: string, type: string, text: string) => {
        if (type === "NUMBER") {
            setUserInfo(Object.assign({}, userInfo, { [field]: Number(text) }))
        }
        if (field === "gender") {
            if (text === "MALE") {
                setUserInfo(Object.assign({}, userInfo, { age: 21, [field]: text }))
            }
            else {
                setUserInfo(Object.assign({}, userInfo, { age: 18, [field]: text }))
            }
        }
        else {
            setUserInfo(Object.assign({}, userInfo, { [field]: text }))
        }
    }, [userInfo]);

    const handleCompleteButtonClick = useCallback(async () => {
        if (user) {
            const payload = {
                userDetails: userInfo,
                userObjectId: user._id
            }

            const userInstance = await api.userDetails.updateUser(payload);
            if (userInstance) {
                setUser(userInstance);
                navigation.navigate('partner-details');
            }
        }
    }, [user, userInfo]);

    const [visible, setVisible] = React.useState(false);

    const onDismissSnackBar = () => setVisible(false);

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

    const handleBackScreen = () => {
        if (screen > 0) {
            setScreen(prev => --prev);
        }
    }

    const handleUplod = async () => {
        if (user) {
            const response = await api.userDetails.updateUserImage({
                userObjectId: user._id,
                profileImage: userInfo.profile_image_url
            });
            console.log("----->first", response.profile_image_url);
            setUserInfo(Object.assign({}, userInfo, { "profile_image_url": response.profile_image_url }));
        }
    }

    const handleChangeScreen = () => {
        if (screen < 5) {

            if (screen == 0) {
                // if (
                //     userInfo.full_name === "" ||
                //     userInfo.gender === "" ||
                //     userInfo.age === 0 ||
                //     userInfo.marital_status === "" ||
                //     userInfo.state === "" ||
                //     userInfo.height === 0 ||
                //     userInfo.weight === 0
                // ) {
                //     setErrorMessage("Please fill the all data");
                //     setVisible(true)
                //     return;
                // }
                // else {
                //     if (userInfo.gender === "MALE") {
                //         if (userInfo.age < 21) {
                //             setErrorMessage("Age should not be less than 21");
                //             setVisible(true)
                //             return;
                //         }
                //     }
                //     else if (userInfo.gender === "FEMALE") {
                //         if (userInfo.age < 18) {
                //             setErrorMessage("Age should not be less than 18");
                //             setVisible(true)
                //             return;
                //         }
                //     }
                // }
            }
            if (screen === 1) {
                handleUplod();
            }
            if (screen == 2) {
                if (
                    userInfo.occupation === "" ||
                    userInfo.work_place === "" ||
                    userInfo.monthly_income === ""
                ) {
                    setErrorMessage("Please fill the all data");
                    setVisible(true)
                    return;
                }

            }
            if (screen == 3) {
                if (
                    userInfo.education === "" ||
                    userInfo.islamic_education === ""
                ) {
                    setErrorMessage("Please fill the all data");
                    setVisible(true)
                    return;
                }

            }
            if (screen == 4) {
                if (
                    userInfo.salah === "" ||
                    userInfo.sawum === ""
                ) {
                    setErrorMessage("Please fill the all data");
                    setVisible(true)
                    return;
                }
            }
            if (screen == 5) {
                if (
                    userInfo.fathers_name === "" ||
                    userInfo.fathers_occupation === "" ||
                    userInfo.mothers_name === "" ||
                    userInfo.mothers_occupation === "" ||
                    userInfo.no_of_brothers === 0 ||
                    userInfo.no_of_sisters === 0 ||
                    userInfo.financial_condition == ""
                ) {
                    setErrorMessage("Please fill the all data");
                    setVisible(true)
                    return;
                }
            }
            setScreen(prev => ++prev);
        }
        if (screen == 5) {
            handleCompleteButtonClick();
        }
    }
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
                    {screen === 0 ?
                        <Text style={globalStyles.headingText}>Please Give Your Personal Information</Text> : null
                    }
                    {screen === 1 ?
                        <Text style={globalStyles.headingText}>Please Give Your Profile Image</Text> : null
                    }
                    {screen === 2 ?
                        <Text style={globalStyles.headingText}>Please Give Your Job Information</Text> : null
                    }
                    {screen === 3 ?
                        <Text style={globalStyles.headingText}>Please Give Your Educational Background</Text> : null
                    }
                    {screen === 4 ?
                        <Text style={globalStyles.headingText}>Please Give Your Religious Information</Text> : null
                    }
                    {screen === 5 ?
                        <Text style={globalStyles.headingText}>Please Give Your Family Information</Text> : null
                    }
                </View>
                <View style={globalStyles.childContainer}>

                    {screen === 0 ?
                        <CenterForm object={userInfo} handleChangeText={handleChangeText} fieldList={USER_INFO_ONE} /> : null
                    }
                    {screen === 1 ?
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                            <Image source={{ uri: userInfo.profile_image_url }} style={styles.profileImage} />
                            <Button mode='outlined' style={globalStyles.lightPinkButton} onPress={pickImage}>Upload</Button>
                        </View>
                        : null
                    }
                    {screen === 2 ?
                        <CenterForm object={userInfo} handleChangeText={handleChangeText} fieldList={USER_INFO_TWO} /> : null
                    }
                    {screen === 3 ?
                        <CenterForm object={userInfo} handleChangeText={handleChangeText} fieldList={USER_INFO_THREE} /> : null
                    }
                    {screen === 4 ?
                        <CenterForm object={userInfo} handleChangeText={handleChangeText} fieldList={USER_INFO_FOUR} /> : null
                    }
                    {/* {screen === 5 ?
                        <CenterForm object={userInfo} handleChangeText={handleChangeText} fieldList={USER_INFO_FIVE} /> : null
                    } */}
                    <Button mode='contained' style={[globalStyles.pinkButton, { marginBottom: 18 }]} onPress={handleChangeScreen}>Next</Button>
                    {
                        screen !== 0 ?
                            <Button mode='outlined' style={globalStyles.lightPinkButton} onPress={handleBackScreen}>Back</Button> : null
                    }
                </View>

            </ScrollView>
            <SnackbarAlert message={errorMessage} onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
        </>
    )
}

export default UserInformation

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