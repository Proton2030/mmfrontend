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
import { handelVibrate } from '../../../../../utils/commonFunction/systemvibration';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const UserInformationPage4 = () => {
    const { user, setUser } = useContext(AuthContext);
    const [screen, setScreen] = useState<number>(0);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [userInfo, setUserInfo] = useState<IUserInfo4>({
        message_limit: 0,
        fathers_name: "",
        fathers_occupation: "",
        mothers_name: "",
        mothers_occupation: "",
        no_of_brothers: 0,
        no_of_sisters: 0,
        financial_condition: "",
        status: "ACTIVE",
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
                handelVibrate()
                return;
            }
            const payload = {
                userDetails: userInfo,
                userObjectId: user._id
            }

            try {
                setLoading(true)
                const userInstance = await api.userDetails.updateUser(payload);
                if (userInstance) {
                    setUser(userInstance);
                    setLoading(false)
                    navigation.navigate('UserInfo5');
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
                setVisible(true)
                handelVibrate()

            }

        }
    }, [user, userInfo]);
    const handleGoBack = () => {
        // Navigate back to the previous screen
        navigation.goBack();
    };
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
                    <Text style={globalStyles.headingText}>Please Give Your Family Information</Text>
                </View>
                <View style={globalStyles.childContainer}>


                    <CenterForm object={userInfo} handleChangeText={handleChangeText} fieldList={USER_INFO_FOUR} />
                    <Button mode='contained' loading={loading} style={[globalStyles.pinkButton, { marginBottom: 18 }]} onPress={handleCompleteButtonClick}>Next</Button>
                    <Button mode='outlined' style={globalStyles.lightPinkButton} onPress={handleGoBack}>Back</Button>

                </View>

            </ScrollView>
            <SnackbarAlert message={errorMessage} onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
        </>
    )
}

export default UserInformationPage4

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