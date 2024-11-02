import { Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { getAppThemeMode } from '../utils/commonFunction/getAppThemeMode';
import { DarkThemeColor, LightThemeColor, ThemeColor } from '../constants/theme/themeColor';

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

const globalStylesList = () => {
  return StyleSheet.create({
    parent: {
      flex: 1,
      paddingBottom: 0,
      backgroundColor: ThemeColor.background,
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: ThemeColor.secondary,
    },
    parentScrollContainer: {
      paddingTop: 25,
      flexGrow: 1,
      justifyContent: 'center',
    },
    parentScrollContainer2: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    parentView: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 30,
      backgroundColor: ThemeColor.background,
    },
    innerContainer: {
      width: '100%',
    },
    childContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth,
      padding: 10,
      paddingVertical: 0,
    },
    roundedInputBox: {
      width: '100%',
      marginBottom: 15,
      height: 50,
    },
    pinkButton: {
      width: '100%',
      marginTop: 0,
      backgroundColor: '#E71B73',
      color: ThemeColor.scrim,
      padding: 6,
    },
    pinkButtonText: {
      color: ThemeColor.scrim,
    },
    lightPinkButton: {
      backgroundColor: ThemeColor.secondary,
      borderColor: ThemeColor.secondary,
      width: '100%',
      padding: 6,
    },
    textStyle: {
      color: ThemeColor.scrim,
    },
    label: {
      color: '#595857',
    },
    headingText: {
      fontSize: 25,
      color: ThemeColor.surfaceVariant,
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'capitalize',
    },
    mediumText: {
      fontSize: 20,

      fontWeight: 'bold',
      textAlign: 'left',
      textTransform: 'capitalize',
    },
    middleImage: {
      width: windowWidth,
      height: windowHeight / 3,
      resizeMode: 'cover',
    },
    landinImage: {
      width: windowWidth,
      height: windowHeight / 3,
      resizeMode: 'contain',
      // transform: [{ rotate: '-30deg' }], // Rotate 90 degrees (or adjust as needed)
      // marginTop: -40,
    },
    loginImage: {
      width: windowWidth + 15,
      height: windowHeight / 4 + 20,
      resizeMode: 'cover',
      // transform: [{ rotate: '30deg' }], // Rotate 90 degrees (or adjust as needed)
      marginTop: -40,
      marginLeft: -40,
    },
    selectField: {
      width: '100%',
      borderColor: 'gray',
      // backgroundColor: ThemeColor.background,
      height: 50,
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 10,
    },
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
    selectText: {
      color: '#595857',
      textAlign: 'left',
    },
    menuCard: {
      color: '#E71B73',
      marginBottom: 12,
      marginHorizontal: 5,
    },
    menucardText: {
      color: '#E71B73',
    },
    card: {
      marginTop: 40,
      paddingBottom: 20,
      borderWidth: 0,
      borderBottomWidth: 2,
      borderColor: ThemeColor.secondary,
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
      right: 5,
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
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      // flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    container: {
      flex: 1,
      margin: 5,
    },
    item: {
      marginVertical: 5,
    },
    googleButton: {
      marginTop: 20,
      height: 50,
      justifyContent: 'center',
      backgroundColor: '#f2f2f2',
    },
    googleIcon: {
      width: 40,
      height: 40,
      marginRight: 5
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
      color: 'white',
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
      borderTopEndRadius: 25,
      borderBottomStartRadius: 25,
      borderTopLeftRadius: 25,
      padding: 5,
      paddingHorizontal: 20,
      // backgroundColor: 'white',
      shadowOffset: { width: 0, height: 2 }, // Offset of the shadow (horizontal, vertical)
      shadowOpacity: 1, // Opacity of the shadow
      shadowRadius: 3, // Radius of the shadow
      elevation: 2, // Required for Android to show the shadow
    },
    filter: {
      margin: 3,
      borderRadius: 15,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: 'white',
      // Color of the shadow
      shadowOffset: { width: 0, height: 2 }, // Offset of the shadow (horizontal, vertical)
      shadowOpacity: 1, // Opacity of the shadow
      shadowRadius: 3, // Radius of the shadow
      elevation: 2, // Required for Android to show the shadow
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderStartColor: 'white',
      marginBottom: 5,
    },

    text: {
      color: 'gray',
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
      marginTop: 20,
      backgroundColor: '#E71B73',
      borderTopEndRadius: 25,
      borderBottomStartRadius: 25,
      borderTopLeftRadius: 25,
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      marginBottom: 10,
      marginHorizontal: 5,
    },
    button2: {
      marginTop: 5,

      borderTopEndRadius: 25,
      borderBottomEndRadius: 25,
      borderTopLeftRadius: 25,
      padding: 12,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      marginBottom: 10,
      marginHorizontal: 5,
    },
    buttonTxt: {
      color: 'white',
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
    shadowView: {
      paddingHorizontal: 10,
      borderTopEndRadius: 25,
      borderBottomStartRadius: 25,
      borderTopLeftRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',

      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 2,
      marginHorizontal: 5,
      paddingVertical: 0,
    },
  });
};

export const globalStyles = globalStylesList();
