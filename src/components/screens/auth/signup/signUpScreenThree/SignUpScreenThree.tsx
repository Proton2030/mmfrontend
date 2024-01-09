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
        if (!error) {
            try {
                setLoading(true);
                // const userInstance = await api.auth.signup(userDetails);
                // setLoading(false);
                // if (userInstance) {
                //     setUser(userInstance);
                //     navigation.dispatch(routeUserInfo)
                // }
            }
            catch (error) {
                setLoading(false);
                onToggleSnackBar();
            }
        }
        else {
            warn("Enter Password Carefully")
        }
    }, [userDetails])
    return (
        <>
            <View style={[globalStyles.childContainer, { alignItems: "flex-start" }]}>
                <Text style={[globalStyles.mediumText, { marginBottom: 8 }]}>Please Enter A Password
                </Text>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eligendi ipsam eum quo, cumque quas tempora ex aspernatur repellat unde dolores nob</Text>
                <View style={{ width: "100%", marginTop: 20 }}>
                    <CenterForm handleChangeText={handleChangeText} fieldList={SIGNUP_SCREEN_THREE} />
                </View>
                <Button loading={loading} mode='contained' style={globalStyles.pinkButton} onPress={handleButtonContinueClick}>Continue</Button>
            </View>
            <SnackbarAlert message='Something Went Wrong' onDismissSnackBar={onDismissSnackBar} visible={visible} key={1} />
        </>
    )
}

export default SignUpScreenThree