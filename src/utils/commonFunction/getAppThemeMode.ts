import { Appearance } from 'react-native';
export const getAppThemeMode = () => {
  console.log('theme', Appearance.getColorScheme());
  return Appearance.getColorScheme();
};
