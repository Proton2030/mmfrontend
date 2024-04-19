import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { List, Card, Appbar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from '../../../../contexts/authContext/authContext';
import UiContext from '../../../../contexts/uiContext/UIContext';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';

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
    }
  };

  const handleThemeChange = (theme: 'LIGHT' | 'DARK') => {
    if (theme) {
      setUi({ ...ui, theme });
      console.log('===>theme', theme);
    }
  };

  const options = [
    {
      icon: 'lock',
      text: {
        ENGLISH: 'Change Password',
        BENGALI: 'পাসওয়ার্ড পরিবর্তন করুন',
      },
      route: 'ResetPassword',
      color: '#E71B73',
      onPress: handlePress,
    },
    {
      icon: 'account-lock',
      text: {
        ENGLISH: 'Block User',
        BENGALI: 'ব্যবহারকারী ব্লক করুন',
      },
      route: 'BlockUser',
      color: '#E71B73',
      onPress: handlePress,
    },
    {
      icon: 'account-remove',
      text: {
        ENGLISH: 'Delete Account',
        BENGALI: 'অ্যাকাউন্ট মুছে ফেলুন',
      },
      route: 'DeleteAccount',
      color: '#E71B73',
      onPress: handlePress,
    },
    {
      icon: 'theme-light-dark',
      text: {
        ENGLISH: 'Change App Theme',
        BENGALI: 'অ্যাপ থিম পরিবর্তন করুন',
      },
      route: null,
      color: '#E71B73',
      onPress: handleThemeChange,
      pressArg: ui.theme === 'LIGHT' ? 'DARK' : 'LIGHT',
    },
    {
      icon: 'language-fortran',
      text: {
        ENGLISH: 'Change App Language',
        BENGALI: 'অ্যাপ ভাষা পরিবর্তন করুন',
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
      <ScrollView style={styles.scrollContainer}>
        <List.Section style={styles.listSection}>
          {options.map((option, index) => (
            <Card
              key={index}
              style={globalStyles.menuCard}
              onPress={() => option.onPress(option.route ? option.route : option.pressArg)}
            >
              <Card.Content>
                <View style={styles.cardContainer}>
                  <View style={styles.optionContainer}>
                    <Icon2 name={option.icon} size={20} color={option.color} />
                    <Text style={globalStyles.menucardText}>{option.text[ui.language]}</Text>
                  </View>
                  <Icon2 name="arrow-right" size={20} color={option.color} />
                </View>
              </Card.Content>
            </Card>
          ))}
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingLeft: 20,
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  listSection: {
    marginTop: 20,
    paddingRight: 15,
  },
});

export default SettingsPage;
