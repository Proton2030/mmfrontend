import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { List, Card, Appbar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from '../../../../contexts/authContext/authContext';
import UiContext from '../../../../contexts/uiContext/UIContext';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import MenuCard from '../../../shared/UseCrads/UseCrads';
import { storeData } from '../../../../utils/commonFunction/storeData';

const SettingsPage = ({ navigation }: any) => {
  const { colors } = useTheme();
  const { ui, setUi } = useContext(UiContext);
  const [lang, setang] = useState(ui.language);

  const handlePress = (option: any) => {
    console.log('Selected option:', option);
    navigation.navigate(option);
  };

  const handleLanguageChange = (language: 'BENGALI' | 'ENGLISH') => {
    if (language) {
      setUi({ ...ui, language });

      console.log('===>language', language);
      const changelanguage = JSON.stringify({ ...ui, language });
      storeData('@ui', changelanguage);
    }
  };

  const handleThemeChange = (theme: 'LIGHT' | 'DARK') => {
    if (theme) {
      setUi({ ...ui, theme });
      console.log('===>theme', ui.theme);
      const changetheme = JSON.stringify({ ...ui, theme });
      storeData('@ui', changetheme);
    }
  };

  const options = [
    {
      icon: 'lock',
      text: {
        ENGLISH: 'Change Password',
        BENGALI: 'পাসওয়ার্ড পরিবর্তন করুন',
      },
      route: 'ResetPassord',
      color: '#E71B73',
      onPress: handlePress,
    },
    {
      icon: 'account-lock',
      text: {
        ENGLISH: 'Block User',
        BENGALI: 'ব্যবহারকারী ব্লক করুন',
      },
      route: 'BlockList',
      color: '#E71B73',
      onPress: handlePress,
    },
    // {
    //   icon: 'account-remove',
    //   text: {
    //     ENGLISH: 'Delete Account',
    //     BENGALI: 'অ্যাকাউন্ট মুছে ফেলুন',
    //   },
    //   route: 'DeleteAccount',
    //   color: '#E71B73',
    //   onPress: handlePress,
    // },
    {
      icon: 'theme-light-dark',
      text: {
        ENGLISH: ui.theme !== 'LIGHT' ? 'Change App Theme to light' : 'Change App Theme to Dark',
        BENGALI: ui.theme !== 'LIGHT' ? 'লাইট মোডে থিম পরিবর্তন করুন' : 'ডার্ক মোডে থিম পরিবর্তন করুন',
      },
      route: null,
      color: '#E71B73',
      onPress: handleThemeChange,
      pressArg: ui.theme === 'LIGHT' ? 'DARK' : 'LIGHT',
    },
    {
      icon: 'language-fortran',
      text: {
        ENGLISH: ui.language === 'ENGLISH' ? 'Change App Language to Bengali' : 'Change App Language to English',
        BENGALI: ui.language === 'ENGLISH' ? 'বাংলায় ভাষা পরিবর্তন করুন' : 'ইংরেজিতে ভাষা পরিবর্তন করুন',
      },
      route: null,
      color: '#E71B73',
      onPress: handleLanguageChange,
      pressArg: ui.language === 'ENGLISH' ? 'BENGALI' : 'ENGLISH',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Appbar.Header style={{ backgroundColor: colors.secondary, paddingLeft: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={colors.primary} style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: '800', fontSize: 23, color: colors.onSurface }}>Settings</Text>
      </Appbar.Header>
      <ScrollView style={globalStyles.scrollContainer}>
        <List.Section style={globalStyles.listSection}>
          {options.map((option, index) => (
            <MenuCard option={option} ui={ui} index={index} />
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
};

export default SettingsPage;
