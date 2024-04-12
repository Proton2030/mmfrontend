import { Dimensions, StyleSheet } from 'react-native';
import { getAppThemeMode } from '../../../../utils/commonFunction/getAppThemeMode';
import { DarkThemeColor, LightThemeColor } from '../../../../constants/theme/themeColor';

const windowWidth = Dimensions.get('window').width;

export const loginStyle = StyleSheet.create({
  forgetPass: {
    marginLeft: 'auto',
    color: getAppThemeMode() === 'light' ? LightThemeColor.scrim : DarkThemeColor.scrim,
    fontSize: 16,
  },
  logoStyle: {
    width: '100%',
    height: 20,
  },
  image: {
    width: windowWidth / 4,
    height: windowWidth / 4, // Make the height equal to the width
    borderRadius: windowWidth / 8, // Set the border radius to half of the width or height to make the image round
    resizeMode: 'cover',
    marginBottom: 10, // Cover the whole View without distortion
  },
  viewBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
