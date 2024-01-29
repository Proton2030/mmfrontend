import { View, Text, Platform, ToastAndroid } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { globalStyles } from '../../../../../globalStyles/GlobalStyles'
import CenterForm from '../../../../shared/centerForm/CenterForm'
import { SIGNUP_SCREEN_THREE } from '../../../../../constants/forms/SignUp'
import { Button } from 'react-native-paper'
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native'
import { ISignupScreenProps } from '../../../../../@types/props/SignupScreen.props'
import { api } from '../../../../../utils/api'
import SnackbarAlert from '../../../../shared/snackbarAlert/SnackbarAlert'
import AuthContext from '../../../../../contexts/authContext/authContext'
import { storeData } from '../../../../../utils/commonFunction/storeData'
import { getFCMToken } from '../../../../../utils/commonFunction/getFCMToken'

const SignUpScreenThree = ({ handleChangeScreen, handleChangeText, userDetails, mode }: ISignupScreenProps) => {
    const navigation = useNavigation<any>();
    const { user, setUser } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const onDismissSnackBar = () => setVisible(false);

    const routeUserInfo = CommonActions.reset({
        index: 0,
        routes: [
            {
                name: 'UserInfo',
                state: {
                    routes: [
                        {
                            name: 'UserInfo1',
                            params: { editable: false },
                        },
                    ],
                },
            },
        ],
    });
    const routeUserDashboard = CommonActions.reset({
        index: 0,
        routes: [{ name: 'UserDashboard' }], // Replace with your desired screen name
    });

    // const warn = (msg: string) => {
    //     if (Platform.OS === 'android') {
    //         ToastAndroid.show(msg, ToastAndroid.SHORT)
    //     }
    // }

    const handleButtonContinueClick = useCallback(async () => {
        // if (!error) {
        try {
            setLoading(true);
            if (userDetails.password !== "") {
                handleChangeScreen();
                let userInstance = null;
                if (mode === "SIGNUP") {
                    console.log("------------>user details", userDetails)
                    userInstance = await api.auth.signup(userDetails);
                }
                else {
                    console.log("----->called")
                    userInstance = await api.auth.chnagePassword({
                        mobile: userDetails.mobile,
                        newPassword: userDetails.password
                    });
                }
                setLoading(false);
                if (userInstance) {
                    console.log("------>userInstance", userInstance)
                    setUser(userInstance);
                    if (mode === "FORGET") {
                        const jsonUser = JSON.stringify(userInstance);
                        storeData("@user", jsonUser);
                        navigation.dispatch(routeUserDashboard);
                    }
                    else {
                        navigation.dispatch(routeUserInfo)
                    }
                }
            }
        }
        catch (error) {
            setLoading(false);
            console.log("error", error)
        }
        // }
        // else {
        //     warn("Enter Password Carefully")
        // }
    }, [userDetails])
    return (
        <>
            <View style={[globalStyles.childContainer, { alignItems: "flex-start" }]}>
                <Text style={[globalStyles.mediumText, { marginBottom: 8 }]}>Please Enter A Password
                </Text>
                <Text>As you craft your password, consider using a combination of uppercase and lowercase letters, numbers, and special characters to enhance its strength</Text>
                <View style={{ width: "100%", marginTop: 20 }}>
                    <CenterForm handleChangeText={handleChangeText} fieldList={SIGNUP_SCREEN_THREE} object={userDetails} />
                </View>
                <Button loading={loading} mode='contained' style={globalStyles.pinkButton} onPress={handleButtonContinueClick}>Next</Button>
            </View>
            <SnackbarAlert message='Something Went Wrong' onDismissSnackBar={onDismissSnackBar} visible={visible} key={1} />
        </>
    )
}

export default SignUpScreenThree