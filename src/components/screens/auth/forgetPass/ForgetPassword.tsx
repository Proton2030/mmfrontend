import { View, Text, ScrollView, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import { signUp } from '../../../../assets';
import { Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { IUserDetails } from '../../../../@types/types/userDEtails.types';
import { api } from '../../../../utils/api';
import SnackbarAlert from '../../../shared/snackbarAlert/SnackbarAlert';
import SignUpScreenOne from '../signup/signUpScreenOne/SignUpScreenOne';
import SignUpScreenTwo from '../signup/signUpScreenTwo/SignUpScreenTwo';
import SignUpScreenThree from '../signup/signUpScreenThree/SignUpScreenThree';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { COUNTRY_ENV } from '../../../../config/config';

const ForgetPassword = () => {
  const navigation = useNavigation<any>();
  const [screen, setScreen] = useState<number>(0);
  const [otp, setOtp] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userCredentials, setUserCredentails] = useState<{
    mobile: string;
    password: string;
    rePassword: string;
  }>({
    mobile: '',
    password: '',
    rePassword: '',
  });

  const handleChangeScreen = async () => {
    if (screen < 1) {
      // if (screen === 0) {
      //   setLoading(true);
      //   const filter = { mobile: userCredentials.mobile };
      //   try {
      //     const otpResponse = await api.auth.forgetPassOtp(filter);
      //     if (otpResponse) {
      //       setOtp(otpResponse);
      //       setLoading(false);
      //     } else {
      //       setVisible(true);
      //       setLoading(false);
      //       return;
      //     }
      //   } catch (err) {
      //     setVisible(true);
      //     setLoading(false);
      //     return;
      //   }
      // }
      setScreen((prev) => ++prev);
    }
  };
  const handleChangeText = useCallback(
    (field: string, type: string, text: string) => {
      if (field === 're-password') {
        // console.log(userDetails.password);
        if (userCredentials.password !== text) {
          return;
          setVisible(true);
        }
      }
      setUserCredentails(Object.assign({}, userCredentials, { [field]: text }));
    },
    [userCredentials],
  );

  const handleGenerateOtp = async () => {
    try {
      setLoading(true);
      const filter = { mobile: userCredentials.mobile };
      const otpResponse = await api.auth.forgetPassOtp(filter);
      if (otpResponse) {
        setOtp(COUNTRY_ENV === 'BD' ? otpResponse : '1234');
      }
    } catch (err: any) {
      console.log(err.response.status);
      if (err.response.status === 409) {
        setVisible(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const onDismissSnackBar = () => {
    navigation.navigate('login');
    setVisible(false);
  };

  return (
    <>
      <ScrollView style={globalStyles.parent} contentContainerStyle={globalStyles.parentScrollContainer}>
        <View style={globalStyles.childContainer}>
          <Image source={signUp} style={{ width: '100%', height: undefined, aspectRatio: 1 }} resizeMode="contain" />
        </View>
        {screen === 0 ? (
          <SignUpScreenOne
            userDetails={userCredentials}
            handleChangeText={handleChangeText}
            handleChangeScreen={handleChangeScreen}
            handleGenerateOtp={handleGenerateOtp}
            loading={loading}
            otp={otp}
            setOtp={setOtp}
            mode="FORGET"
          />
        ) : null}
        {screen === 1 ? (
          <SignUpScreenThree
            userDetails={userCredentials}
            handleChangeText={handleChangeText}
            handleChangeScreen={handleChangeScreen}
            loading={loading}
            otp=""
            mode="FORGET"
          />
        ) : null}
      </ScrollView>
      <SnackbarAlert
        message="Account Does Not Exist,Please Signup"
        onDismissSnackBar={onDismissSnackBar}
        visible={visible}
        key={0}
      />
    </>
  );
};

export default ForgetPassword;
