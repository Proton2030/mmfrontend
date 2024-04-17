import { View, Text, ScrollView, Image } from 'react-native';
import React, { useContext } from 'react';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { muslim } from '../../../../../assets';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import UiContext from '../../../../../contexts/uiContext/UIContext';
import { selectLanguage } from '../../../../../utils/commonFunction/languageSelect';
import { CONFITM_PAGE_TEXT } from '../../../../../constants/texts/auth/signup/confirmationPage/confirmartionPage';

const ConfirmationPage = () => {
  const navigation = useNavigation<any>();
  const {
    ui: { language, theme },
  } = useContext(UiContext);
  const handleGetStartedButtonClick = () => {
    navigation.navigate('Auth', { screen: 'signup' });
  };
  const handleNoMuslimButtonClick = () => {
    navigation.navigate('Auth', { screen: 'login' });
  };
  return (
    <View style={globalStyles.parentView}>
      <View style={globalStyles.childContainer}>
        <Image source={muslim} style={globalStyles.middleImage} />
        <Text style={globalStyles.headingText}> {selectLanguage(CONFITM_PAGE_TEXT.heading, language)}.</Text>
      </View>
      <View style={globalStyles.childContainer}>
        <Text> {selectLanguage(CONFITM_PAGE_TEXT.continue, language)}</Text>
        <Button
          mode="contained"
          onPress={handleGetStartedButtonClick}
          style={[globalStyles.pinkButton, { marginBottom: 20 }]}
          labelStyle={globalStyles.pinkButtonText}
        >
          {selectLanguage(CONFITM_PAGE_TEXT.muslim_button, language)}
        </Button>
        <Button mode="outlined" style={globalStyles.lightPinkButton} onPress={handleNoMuslimButtonClick}>
          {selectLanguage(CONFITM_PAGE_TEXT.non_muslim_button, language)}
        </Button>
      </View>
    </View>
  );
};

export default ConfirmationPage;
