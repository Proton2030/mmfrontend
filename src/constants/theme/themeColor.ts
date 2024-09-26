import { getAppThemeMode } from '../../utils/commonFunction/getAppThemeMode';

export const LightThemeColor = {
  primary: '#E71B73',
  background: 'hsl(0, 0%, 98%)',
  secondary: '#fde8f1',
  tertiary: '#6e6d6d',
  scrim: 'black',
  surface: '#fce8f1',
};
export const DarkThemeColor = {
  tertiary: '#d9d9d9',
  scrim: 'white',
  primary: 'white', // Example primary color for dark mode
  secondary: '#222831', // Example secondary color for dark mode
  background: '#00001a',
  surface: '#00004d',
};
export let ThemeColor = getAppThemeMode() !== 'dark' ? LightThemeColor : DarkThemeColor;
