import { useContext, useState } from 'react';
import UiContext from '../contexts/uiContext/UIContext';
import { useNavigation } from '@react-navigation/native';

const { ui, setUi } = useContext(UiContext);
const navigation = useNavigation<any>();

export const handlePress = (option: any) => {
  console.log('Selected option:', option);
  navigation.navigate(option);
};

export const handleLanguageChange = (language: 'BENGALI' | 'ENGLISH') => {
  if (language) {
    setUi({ ...ui, language });

    console.log('===>language', language);
  }
};

export const handleThemeChange = (theme: 'LIGHT' | 'DARK') => {
  if (theme) {
    setUi({ ...ui, theme });
    console.log('===>theme', ui.theme);
  }
};
