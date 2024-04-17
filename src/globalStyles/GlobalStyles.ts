import { Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { getAppThemeMode } from '../utils/commonFunction/getAppThemeMode';
import { DarkThemeColor, LightThemeColor } from '../constants/theme/themeColor';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const globalStylesList = () => {
  return StyleSheet.create({
    parent: {
      flex: 1,
      paddingBottom: 0,
      backgroundColor: getAppThemeMode() === 'dark' ? DarkThemeColor.background : LightThemeColor.background,
    },
    parentScrollContainer: {
      paddingTop: 25,
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    parentView: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 30,
      backgroundColor: getAppThemeMode() === 'dark' ? DarkThemeColor.background : LightThemeColor.background,
    },
    innerContainer: {
      width: '100%',
    },
    childContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth,
      padding: 30,
    },
    roundedInputBox: {
      width: '100%',
      marginBottom: 8,
      height: 60,
    },
    pinkButton: {
      width: '100%',
      marginTop: 15,
      backgroundColor: '#E71B73',
      color: getAppThemeMode() === 'dark' ? DarkThemeColor.scrim : LightThemeColor.scrim,
      padding: 6,
    },
    pinkButtonText: {
      color: getAppThemeMode() === 'dark' ? DarkThemeColor.scrim : LightThemeColor.scrim,
    },
    lightPinkButton: {
      backgroundColor: getAppThemeMode() === 'dark' ? DarkThemeColor.secondary : LightThemeColor.secondary,
      borderColor: getAppThemeMode() === 'dark' ? DarkThemeColor.secondary : LightThemeColor.secondary,
      width: '100%',
      padding: 6,
    },
    textStyle: {
      color: getAppThemeMode() === 'dark' ? DarkThemeColor.scrim : LightThemeColor.scrim,
    },
    label: {
      color: '#595857',
    },
    headingText: {
      fontSize: 25,
      color: getAppThemeMode() === 'dark' ? DarkThemeColor.scrim : LightThemeColor.scrim,
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    mediumText: {
      fontSize: 20,
      color: getAppThemeMode() === 'dark' ? DarkThemeColor.scrim : LightThemeColor.scrim,
      fontWeight: 'bold',
      textAlign: 'left',
      textTransform: 'capitalize',
    },
    middleImage: {
      width: windowWidth,
      height: windowHeight / 2,
      resizeMode: 'cover',
    },
    selectField: {
      width: '100%',
      borderColor: 'gray',
      backgroundColor: 'white',
      height: 60,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 10,
    },
    selectText: {
      color: '#595857',
      textAlign: 'left',
    },
    menuCard: {
      backgroundColor: getAppThemeMode() === 'dark' ? DarkThemeColor.secondary : LightThemeColor.secondary,
      color: '#E71B73',
      marginBottom: 12,
    },
    menucardText: {
      color: '#E71B73',
    },
    card: {
      marginTop: 40,
      paddingBottom: 20,
      borderWidth: 0,
      borderBottomWidth: 2,
      borderColor: getAppThemeMode() === 'dark' ? DarkThemeColor.secondary : LightThemeColor.secondary,
    },
    cardImage: {
      width: windowWidth,
      height: windowHeight / 3,
      resizeMode: 'cover',
    },
    iconText: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 5,
    },
    avatarContainer: {
      position: 'relative',
    },
    onlineDot: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#4CAF50', // Green color
    },
    offlineDot: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: 'red', // red color
    },
    circleImage: {
      width: windowWidth / 2,
      height: windowWidth / 2,
      borderRadius: windowHeight / 2,
    },
    topScreenImage: {
      width: windowWidth - 80,
      height: windowHeight / 3,
      resizeMode: 'contain',
    },
    inlineFlex: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    container: {
      flex: 1,
      margin: 5,
    },
    item: {
      marginVertical: 10,
    },
    headerFilter: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 5,
    },
    title: {
      color: COLORS.title,
      fontWeight: 'bold',
      fontSize: SIZES.h3,
      marginVertical: 5,
    },
    input: {
      padding: 10,
      borderWidth: 1.2,
      borderRadius: 5,
      borderColor: COLORS.grey,
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    subtitle: {
      color: COLORS.grey,
      fontWeight: '400',
      fontSize: SIZES.h4,
    },
    category: {
      margin: 3,
      borderRadius: 15,
      borderWidth: 1.2,
      padding: 5,
      paddingHorizontal: 10,
    },
    text: {
      color: COLORS.title,
      fontSize: SIZES.h4,
    },
    line: {
      backgroundColor: COLORS.lightGrey,
      height: 1,
      marginVertical: 10,
    },
    rowFilter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
    },
    button: {
      marginTop: 30,
      backgroundColor: COLORS.primary,
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonTxt: {
      color: COLORS.white,
      fontWeight: 'bold',
      fontSize: SIZES.h4,
    },
    iconHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      opacity: 1,
    },
  });
};

export const globalStyles = globalStylesList();
