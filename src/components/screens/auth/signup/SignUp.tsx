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

const SignUp = () => {
    const [screen, setScreen] = useState<number>(0);
    const [otp, setOtp] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [userDetails, setUseDetails] = useState<IUserDetails>({
        full_name: "",
        email: "",
        mobile: "",
        password: "",
        gender: "MALE",
        age: 18,
        marital_status: "UNMARRIED",
        country: "BANGLADESH",
        state: "",
        height: 0,
        weight: 0,
        body_color: "",
        eye_color: "",
        hair_color: "",
        occupation: "",
        work_place: "",
        monthly_income: "",
        education: "",
        islamic_education: "",
        salah: "",
        sawum: "",
        hajab_maintain: 0,
        religious: "LOW",
        fathers_name: "",
        fathers_occupation: "",
        mothers_name: "",
        mothers_occupation: "",
        no_of_brothers: 0,
        no_of_sister: 0,
        total_family_member: 0,
        financial_condition: "",
        status: "ACTIVE",
        partner_min_age: 18,
        partner_max_age: 18,
        partner_bodyColor: "",
        partner_coutry: "BANGLADESH",
        partner_education: "",
        partner_hajab_maintain: 1,
        partner_min_height: 0,
        partner_max_height: 0,
        partner_islamic_education: "",
        partner_marital_status: "UNMARRIED",
        partner_religious: true,
        partner_salah: "",
        partner_state: "",
        partner_min_weight: 0,
        partner_max_weight: 0,
        profile_image_url: "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
    })

    const handleChangeScreen = async () => {
        if (screen < 2) {
            if (screen === 0) {
                setLoading(true);
                // const filter = { mobile: userDetails.mobile }
                // const otpResponse = await api.auth.getOtp(filter)
                setOtp('1234');
                setLoading(false);
            }
            setScreen(prev => ++prev);
        }
    }
    const handleChangeText = useCallback((field: string, type: string, text: string) => {
        if (field === "re-password") {
            // console.log(userDetails.password);
            if (userDetails.password !== text) {
                console.log("first")
                setPasswordErr(true);
            }
            else {
                setPasswordErr(true);
            }
        }
        setUseDetails(Object.assign({}, userDetails, { [field]: text }))
    }, [userDetails]);

    return (
        <ScrollView style={globalStyles.parent} contentContainerStyle={globalStyles.parentScrollContainer}>
            <View style={globalStyles.childContainer}>
                <Image source={signUp}
                    style={{ width: '100%', height: undefined, aspectRatio: 1 }}
                    resizeMode='contain' />
            </View>
            {
                screen === 0 ?
                    <SignUpScreenOne userDetails={userDetails} handleChangeText={handleChangeText} handleChangeScreen={handleChangeScreen} loading={loading} /> : null
            }
            {
                screen === 1 ?
                    <SignUpScreenTwo userDetails={userDetails} handleChangeText={handleChangeText} handleChangeScreen={handleChangeScreen} otp={otp} /> : null
            }
            {
                screen === 2 ?
                    <SignUpScreenThree userDetails={userDetails} handleChangeText={handleChangeText} handleChangeScreen={handleChangeScreen} /> : null
            }
        </ScrollView>
    )
}

export default SignUp