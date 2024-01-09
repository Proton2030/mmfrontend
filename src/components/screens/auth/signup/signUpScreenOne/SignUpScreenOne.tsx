import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../../../../globalStyles/GlobalStyles'
import { muslim, signUp } from '../../../../../assets'
import { Button } from 'react-native-paper'
import CenterForm from '../../../../shared/centerForm/CenterForm'
import { SIGNUP_SCREEN_ONE } from '../../../../../constants/forms/SignUp'
import { ISignupScreenProps } from '../../../../../@types/props/SignupScreen.props'

const SignUpScreenOne = ({ handleChangeScreen, handleChangeText, userDetails, loading }: ISignupScreenProps) => {
    const handleGenerateOtpClick = () => {
        if (userDetails.mobile.length >= 10) {
            handleChangeScreen();
        }
        else return;
    }
    return (
        <View>
            <View style={[globalStyles.childContainer, { alignItems: "flex-start" }]}>
                <Text style={[globalStyles.mediumText, { marginBottom: 8 }]}>Please Give Your
                    <Text style={{ color: "#E71B73" }}>
                        &nbsp;Phone Number
                    </Text>
                </Text>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eligendi ipsam eum quo, cumque quas tempora ex aspernatur repellat unde dolores nob</Text>
            </View>
            <View style={globalStyles.childContainer}>
                <CenterForm handleChangeText={handleChangeText} fieldList={SIGNUP_SCREEN_ONE} key={1} />
                <Button mode='contained' loading={loading} style={globalStyles.pinkButton} onPress={handleGenerateOtpClick} >Generate OTP</Button>
            </View>
        </View>
    )
}

export default SignUpScreenOne