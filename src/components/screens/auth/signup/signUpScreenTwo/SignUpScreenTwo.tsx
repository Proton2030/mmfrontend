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
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eligendi ipsam eum quo, cumque quas tempora ex aspernatur repellat unde dolores nob</Text>
            <View style={{ width: "100%" }}>
                <OTPTextView inputCount={4} tintColor={"#E71B73"} handleTextChange={(otp) => { setOtpValue(otp) }} />
            </View>
            <Button mode='contained' style={globalStyles.pinkButton} onPress={handleVerifyOtpButtonClick}>Verify OTP</Button>
        </View>
    )
}

export default SignUpScreenTwo