import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../../../../globalStyles/GlobalStyles'
import { signUp } from '../../../../../assets'
import { Button } from 'react-native-paper'
import OTPTextView from 'react-native-otp-textinput'
import { ISignupScreenProps } from '../../../../../@types/props/SignupScreen.props'

const SignUpScreenTwo = ({ handleChangeScreen, handleChangeText, userDetails, otp }: any) => {
    const [otpValue, setOtpValue] = React.useState('');
    const handleVerifyOtpButtonClick = () => {
        console.log("gen", otp)
        console.log("user", otpValue)
        if (otp === otpValue) {
            console.log("first")
            handleChangeScreen();
        }
        else {
            return;
        }
    }
    return (
        <View style={[globalStyles.childContainer, { alignItems: "flex-start" }]}>
            <Text style={[globalStyles.mediumText, { marginBottom: 8 }]}>Please Enter Your OTP
            </Text>
            <Text>Once you've provided your essential details, a unique One-Time Password (OTP) will be sent to the mobile number you've provided. This OTP serves as a protective layer, confirming your identity and safeguarding your information from unauthorized access</Text>
            <View style={{ width: "100%" }}>
                <OTPTextView inputCount={4} tintColor={"#E71B73"} handleTextChange={(otp) => { setOtpValue(otp) }} />
            </View>
            <Button mode='contained' style={globalStyles.pinkButton} onPress={handleVerifyOtpButtonClick}>Verify OTP</Button>
        </View>
    )
}

export default SignUpScreenTwo