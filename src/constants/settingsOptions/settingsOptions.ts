// Import necessary types if you want to define types for the options array
// For example, if you have a type defined for the options object, import it here

import { handleLanguageChange, handlePress, handleThemeChange } from '../ThemeState';

interface Option {
  icon: string;
  text: {
    ENGLISH: string;
    BENGALI: string;
  };
  route: string | null;
  color: string;
  onPress: (arg?: string) => void;
  pressArg?: string;
}

export const options: Option[] = [
  {
    icon: 'lock',
    text: {
      ENGLISH: 'Change Password',
      BENGALI: 'পাসওয়ার্ড পরিবর্তন করুন',
    },
    route: 'ResetPassword',
    color: '#E71B73',
    onPress: () => handlePress, // Replace with your function
  },
  {
    icon: 'account-lock',
    text: {
      ENGLISH: 'Block User',
      BENGALI: 'ব্যবহারকারী ব্লক করুন',
    },
    route: 'BlockUser',
    color: '#E71B73',
    onPress: () => handlePress, // Replace with your function
  },
  {
    icon: 'account-remove',
    text: {
      ENGLISH: 'Delete Account',
      BENGALI: 'অ্যাকাউন্ট মুছে ফেলুন',
    },
    route: 'DeleteAccount',
    color: '#E71B73',
    onPress: () => handlePress, // Replace with your function
  },
  {
    icon: 'theme-light-dark',
    text: {
      ENGLISH: 'Change App Theme',
      BENGALI: 'অ্যাপ থিম পরিবর্তন করুন',
    },
    route: null,
    color: '#E71B73',
    onPress: () => handleThemeChange, // Replace with your function
    pressArg: 'LIGHT',
  },
  {
    icon: 'language-fortran',
    text: {
      ENGLISH: 'Change App Language',
      BENGALI: 'অ্যাপ ভাষা পরিবর্তন করুন',
    },
    route: null,
    color: '#E71B73',
    onPress: () => handleLanguageChange, // Replace with your function
    pressArg: 'ENGLISH',
  },
];
