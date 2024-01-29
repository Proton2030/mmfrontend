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
import { handelVibrate } from '../../../../../utils/commonFunction/systemvibration';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const UserInformationPage2 = () => {
    const { user, setUser } = useContext(AuthContext);
    const route = useRoute<any>();
    const { editable } = route.params;
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [userInfo, setUserInfo] = useState<IUserInfo2>({
        occupation: "",
        work_place: "",
        monthly_income: "",
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

    const handleGoBack = () => {
        // Navigate back to the previous screen
        navigation.goBack();
    };
    const handleCompleteButtonClick = useCallback(async () => {

        if (user) {
            if (
                userInfo.occupation === "" ||
                userInfo.work_place === "" ||
                userInfo.monthly_income === ""
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
                    if (editable) {
                        navigation.navigate('UserDashboard');
                    } else {
                        navigation.navigate('UserInfo3', { editable: false });
                    }
                }
            } catch (error) {
                setLoading(false)
                console.log(error);
                setVisible(true)
                handelVibrate()
            }

        }
    }, [user, userInfo]);
    console.log("------->called user info 2");

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
                    <Text style={globalStyles.headingText}>Please Give Your Job Background</Text>

                </View>
                <View style={globalStyles.childContainer}>


                    <CenterForm object={userInfo} handleChangeText={handleChangeText} fieldList={USER_INFO_TWO} />
                    <Button mode='contained' loading={loading} style={[globalStyles.pinkButton, { marginBottom: 18 }]} onPress={handleCompleteButtonClick}>
                        {editable ? "Submit" : "Next"}
                    </Button>
                    {
                        editable ? null :
                            <Button mode='outlined' style={globalStyles.lightPinkButton} onPress={handleGoBack}>Back</Button>
                    }
                </View>
            </ScrollView>
            <SnackbarAlert message={errorMessage} onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
        </>
    )
}

export default UserInformationPage2

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