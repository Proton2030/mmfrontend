import { StyleSheet } from 'react-native';
import { windowWidth } from '../../../globalStyles/GlobalStyles';

export const userInfoStyles = StyleSheet.create({
  image: {
    width: windowWidth / 2,
    resizeMode: 'contain',
  },
  profileImage: {
    width: windowWidth / 2,
    height: windowWidth / 2, // Make the height equal to the width
    borderRadius: windowWidth / 4, // Set the border radius to half of the width or height to make the image round
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
