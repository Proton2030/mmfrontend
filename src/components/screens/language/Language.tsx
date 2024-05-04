import { View, Text, ScrollView, Image } from 'react-native';
import React, { useContext } from 'react';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { Button, useTheme } from 'react-native-paper';
import { muslim, welcome } from '../../../assets';
import UiContext from '../../../contexts/uiContext/UIContext';
import { useNavigation } from '@react-navigation/native';

const Language = () => {
  const { ui, setUi } = useContext(UiContext);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const handleLanguageChange = (language: 'BENGALI' | 'ENGLISH') => {
    if (language) {
      setUi({ ...ui, language: language });
      navigation.navigate('Auth');
    }
  };
  return (
    <ScrollView
      style={{ flex: 1, paddingBottom: 0, backgroundColor: colors.background }}
      contentContainerStyle={globalStyles.parentScrollContainer}
    >
      <View style={globalStyles.childContainer}>
        <Image source={welcome} style={globalStyles.middleImage} />
        <Text
          style={{
            fontSize: 25,
            color: colors.scrim,
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'capitalize',
          }}
        >
          Muslim Matrimony অ্যাপে আপনাকে স্বাগতম
        </Text>
      </View>
      <View style={globalStyles.childContainer}>
        <Text style={{ color: colors.scrim }}>আপনার পছন্দের ভাষা চয়ন করুন</Text>
        <Button
          //   mode="contained"
          onPress={() => handleLanguageChange('BENGALI')}
          style={[globalStyles.pinkButton, { marginBottom: 20 }]}
          labelStyle={globalStyles.pinkButtonText}
        >
          বাংলার সাথে ব্যবহার করুন
        </Button>
        <Button
          mode="outlined"
          style={{ backgroundColor: colors.secondary, borderColor: colors.secondary, width: '100%', padding: 6 }}
          onPress={() => handleLanguageChange('ENGLISH')}
        >
          Continue With English
        </Button>
      </View>
    </ScrollView>
  );
};

export default Language;
