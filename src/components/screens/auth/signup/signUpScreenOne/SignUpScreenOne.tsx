import { View, Text, ScrollView, Image } from 'react-native';
import React, { useContext, useState } from 'react';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { muslim, signUp } from '../../../../../assets';
import { Button, useTheme } from 'react-native-paper';
import CenterForm from '../../../../shared/centerForm/CenterForm';
import { SIGNUP_SCREEN_ONE } from '../../../../../constants/forms/SignUp';
import { ISignupScreenProps } from '../../../../../@types/props/SignupScreen.props';
import { GoogleSigninButton } from 'react-native-google-signin';
import { selectLanguage } from '../../../../../utils/commonFunction/languageSelect';
import { SCREEN_ONE } from '../../../../../constants/texts/auth/signup/screenOne/ScreenOne';
import UiContext from '../../../../../contexts/uiContext/UIContext';
import CommonButton from '../../../../shared/commonButton/CommonButton';

const SignUpScreenOne = ({ handleChangeScreen, handleChangeText, userDetails, loading }: ISignupScreenProps) => {
  const { colors } = useTheme();
  const {
    ui: { language, theme },
  } = useContext(UiContext);
  const handleGenerateOtpClick = () => {
    if (userDetails.mobile.length >= 10) {
      handleChangeScreen();
    } else return;
  };
  return (
    <View>
      <View style={[globalStyles.childContainer, { alignItems: 'flex-start' }]}>
        <Text style={[globalStyles.headingText, { color: colors.scrim }]}>
          {selectLanguage(SCREEN_ONE.request, language)}
          <Text style={{ color: '#E71B73' }}>&nbsp; {selectLanguage(SCREEN_ONE.phone, language)}</Text>
        </Text>
      </View>
      <View style={globalStyles.childContainer}>
        <CenterForm handleChangeText={handleChangeText} fieldList={SIGNUP_SCREEN_ONE} object={userDetails} key={1} />
        <CommonButton
          loading={loading}
          handleAction={handleGenerateOtpClick}
          text={selectLanguage(SCREEN_ONE.otp_button, language)}
        />
      </View>
    </View>
  );
};

export default SignUpScreenOne;
