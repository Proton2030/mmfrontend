import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../../../../globalStyles/GlobalStyles'
import { signUp } from '../../../../../assets'
import { Button, Icon, IconButton } from 'react-native-paper'
import OTPTextView from 'react-native-otp-textinput'
import { ISignupScreenProps } from '../../../../../@types/props/SignupScreen.props'

const SignUpScreenTwo = ({ handleChangeScreen, handleChangeText, userDetails, otp,navigateBack }: any) => {
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
           
            <Text  style={{color:"black",marginTop:10,fontWeight:"500"}}>we have sent you a 4 Character OTP to </Text>
            <View style={{display:"flex",flexDirection:"row",gap:5,justifyContent:"center",alignItems:"center"}}>

            <Text style={{color:"#1F75FE",fontWeight:"700"}}>+880{userDetails.mobile}</Text>
            
            <IconButton
            icon="pencil"
            iconColor='#E71B73'
            size={20}
            style={{ margin:0}}
             onPress={navigateBack}// Add onPress handler for refreshing
            />
        </View>
             
            <Text style={{color:"black",fontWeight:"500"}}> Please Enter the code below to continue</Text>
            <View style={{ width: "100%" }}>
                <OTPTextView inputCount={4} tintColor={"#E71B73"} handleTextChange={(otp) => { setOtpValue(otp) }} />
            </View>
            <Button mode='contained' style={globalStyles.pinkButton} onPress={handleVerifyOtpButtonClick}>Verify OTP</Button>
        </View>
    )
}

export default SignUpScreenTwo