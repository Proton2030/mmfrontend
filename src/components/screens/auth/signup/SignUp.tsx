import { View, Text, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import SignUpScreenOne from './signUpScreenOne/SignUpScreenOne';
import { signUp } from '../../../../assets';
import { Button } from 'react-native-paper';
import SignUpScreenTwo from './signUpScreenTwo/SignUpScreenTwo';
import SignUpScreenThree from './signUpScreenThree/SignUpScreenThree';
import { useNavigation } from '@react-navigation/native';
import { IUserDetails } from '../../../../@types/types/userDEtails.types';
import { api } from '../../../../utils/api';
import SnackbarAlert from '../../../shared/snackbarAlert/SnackbarAlert';

const SignUp = () => {
    const navigation = useNavigation<any>();
    const [screen, setScreen] = useState<number>(0);
    const [otp, setOtp] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [passwordErr, setPasswordErr] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [userDetails, setUseDetails] = useState<IUserDetails>({
        email: "",
        mobile: "",
        password: "",
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
        profile_image_url: "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
        partner_min_age: 0,
        partner_max_age: 0,
        partner_bodyColor: "",
        partner_coutry: "BANGLADESH",
        partner_education: "",
        partner_hajab_maintain: "",
        partner_min_height: 0,
        partner_max_height: 0,
        partner_islamic_education: "",
        partner_marital_status: "",
        partner_religious: true,
        partner_salah: "",
        partner_state: "",
        partner_min_weight: 0,
        partner_max_weight: 0,
        updatedAt: new Date()
    })

    const handleChangeScreen = async () => {
        if (screen < 2) {
            if (screen === 0) {
                setLoading(true);
                const filter = { mobile: userDetails.mobile }
                try {
                    // const otpResponse = await api.auth.getOtp(filter);
                    // if (otpResponse) {
                    //     setOtp(otpResponse);
                    if (true) {
                        setOtp("1234");
                        setLoading(false);
                    }
                    else {
                        setVisible(true);
                        setLoading(false);
                        return;
                    }
                }
                catch (err) {
                    setVisible(true);
                    setLoading(false);
                    return;
                }

            }
            setScreen(prev => ++prev);
        }
    }
    const handleChangeText = useCallback((field: string, type: string, text: string) => {
        if (field === "re-password") {
            // console.log(userDetails.password);
            if (userDetails.password !== text) {
                setPasswordErr(true);
            }
            else {
                setPasswordErr(true);
            }
        }
        setUseDetails(Object.assign({}, userDetails, { [field]: text }))
    }, [userDetails]);

    const onDismissSnackBar = () => {
        navigation.navigate('login')
        setVisible(false);
    }

    return (
        <>
            <ScrollView style={globalStyles.parent} contentContainerStyle={globalStyles.parentScrollContainer}>
                <View style={globalStyles.childContainer}>
                    <Image source={signUp}
                        style={{ width: '100%', height: undefined, aspectRatio: 1 }}
                        resizeMode='contain' />
                </View>
                {
                    screen === 0 ?
                        <SignUpScreenOne userDetails={userDetails} handleChangeText={handleChangeText} handleChangeScreen={handleChangeScreen} loading={loading} mode='SIGNUP' /> : null
                }
                {
                    screen === 1 ?
                        <SignUpScreenTwo userDetails={userDetails} handleChangeText={handleChangeText} handleChangeScreen={handleChangeScreen} otp={otp} /> : null
                }
                {
                    screen === 2 ?
                        <SignUpScreenThree userDetails={userDetails} handleChangeText={handleChangeText} handleChangeScreen={handleChangeScreen} mode='SIGNUP' /> : null
                }
            </ScrollView>
            <SnackbarAlert message='Account Already Exist,Please Login' onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
        </>
    )
}

export default SignUp