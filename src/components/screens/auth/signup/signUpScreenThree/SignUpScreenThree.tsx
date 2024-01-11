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

const SignUpScreenThree = ({ handleChangeScreen, handleChangeText, userDetails, error }: ISignupScreenProps) => {
    const navigation = useNavigation<any>();
    const { user, setUser } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const routeUserInfo = CommonActions.reset({
        index: 0,
        routes: [
            {
                name: 'UserInfo',
                params: { screen: 'personal-details' },
            },
        ], // Replace with your desired screen name
    });

    const warn = (msg: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        }
    }

    const handleButtonContinueClick = useCallback(async () => {
        // if (!error) {
        try {
            setLoading(true);
            if (userDetails.password !== "") {
                handleChangeScreen();
                const userInstance = await api.auth.signup(userDetails);
                setLoading(false);
                if (userInstance) {
                    setUser(userInstance);
                    navigation.dispatch(routeUserInfo)
                }
            }
        }
        catch (error) {
            setLoading(false);
            onToggleSnackBar();
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