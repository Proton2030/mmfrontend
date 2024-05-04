import { View, Text, ScrollView, Image } from 'react-native';
import React, { useContext } from 'react';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { muslim } from '../../../../../assets';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import UiContext from '../../../../../contexts/uiContext/UIContext';
import { selectLanguage } from '../../../../../utils/commonFunction/languageSelect';
import { CONFITM_PAGE_TEXT } from '../../../../../constants/texts/auth/signup/confirmationPage/confirmartionPage';

const ConfirmationPage = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
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
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 30,
        backgroundColor: colors.background,
      }}
    >
      <View style={globalStyles.childContainer}>
        <Image source={muslim} style={globalStyles.middleImage} />
        <Text
          style={{
            fontSize: 25,
            color: colors.scrim,
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'capitalize',
          }}
        >
          {' '}
          {selectLanguage(CONFITM_PAGE_TEXT.heading, language)}.
        </Text>
      </View>
      <View style={globalStyles.childContainer}>
        <Text style={{ color: colors.scrim }}> {selectLanguage(CONFITM_PAGE_TEXT.continue, language)}</Text>
        <Button
          mode="contained"
          onPress={handleGetStartedButtonClick}
          style={[globalStyles.pinkButton, { marginBottom: 20 }]}
          labelStyle={globalStyles.pinkButtonText}
        >
          {selectLanguage(CONFITM_PAGE_TEXT.muslim_button, language)}
        </Button>
        <Button
          mode="outlined"
          style={{ backgroundColor: colors.secondary, borderColor: colors.secondary, width: '100%', padding: 6 }}
          onPress={handleNoMuslimButtonClick}
        >
          {selectLanguage(CONFITM_PAGE_TEXT.non_muslim_button, language)}
        </Button>
      </View>
    </View>
  );
};

export default ConfirmationPage;
