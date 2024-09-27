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
  primary: '#F5F5F5', // Softer white to reduce harshness
  background: '#121212', // A neutral dark background for better readability
  secondary: '#393E46', // A medium dark tone to contrast with the background
  tertiary: '#B0BEC5', // A lighter gray for softer tertiary elements
  scrim: 'white',
  surface: '#1A1A2E', // A rich dark blue for depth
};

export let ThemeColor = getAppThemeMode() !== 'dark' ? LightThemeColor : DarkThemeColor;
