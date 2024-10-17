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
    width: windowWidth / 2,
    height: windowWidth / 6,
    resizeMode: 'contain',
    // backgroundColor: 'red',
  },
  viewBox: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'center',
    paddingLeft: 20,
  },
});
