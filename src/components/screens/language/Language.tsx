import { View, Text, ScrollView, Image } from 'react-native';
import React, { useContext } from 'react';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { Button } from 'react-native-paper';
import { muslim, welcome } from '../../../assets';
import UiContext from '../../../contexts/uiContext/UIContext';
import { useNavigation } from '@react-navigation/native';

const Language = () => {
  const { ui, setUi } = useContext(UiContext);
  const navigation = useNavigation<any>();
  const handleLanguageChange = (language: 'BENGALI' | 'ENGLISH') => {
    if (language) {
      setUi({ ...ui, language: language });
      navigation.navigate('Auth');
    }
  };
  return (
    <ScrollView style={globalStyles.parent} contentContainerStyle={globalStyles.parentScrollContainer}>
      <View style={globalStyles.childContainer}>
        <Image source={welcome} style={globalStyles.middleImage} />
        <Text style={globalStyles.headingText}>Muslim Matrimony অ্যাপে আপনাকে স্বাগতম</Text>
      </View>
      <View style={globalStyles.childContainer}>
        <Text>আপনার পছন্দের ভাষা চয়ন করুন</Text>
        <Button
          //   mode="contained"
          onPress={() => handleLanguageChange('BENGALI')}
          style={[globalStyles.pinkButton, { marginBottom: 20 }]}
          labelStyle={globalStyles.pinkButtonText}
        >
          বাংলার সাথে ব্যবহার করুন
        </Button>
        <Button mode="outlined" style={globalStyles.lightPinkButton} onPress={() => handleLanguageChange('ENGLISH')}>
          Continue With English
        </Button>
      </View>
    </ScrollView>
  );
};

export default Language;
