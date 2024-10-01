import { View, Text, Platform, ToastAndroid, Animated, Keyboard } from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import CenterForm from '../../../../shared/centerForm/CenterForm';
import { SIGNUP_SCREEN_THREE } from '../../../../../constants/forms/SignUp';
import { Button, useTheme } from 'react-native-paper';
import { CommonActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { ISignupScreenProps } from '../../../../../@types/props/SignupScreen.props';
import { api } from '../../../../../utils/api';
import SnackbarAlert from '../../../../shared/snackbarAlert/SnackbarAlert';
import AuthContext from '../../../../../contexts/authContext/authContext';

import { getFCMToken } from '../../../../../utils/commonFunction/getFCMToken';
import UiContext from '../../../../../contexts/uiContext/UIContext';
import { selectLanguage } from '../../../../../utils/commonFunction/languageSelect';
import { SCREEN_THREE_TEXT } from '../../../../../constants/texts/auth/signup/screenThree/ScreenThree';

const SignUpScreenThree = ({ handleChangeScreen, handleChangeText, userDetails, mode }: ISignupScreenProps) => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const {
    ui: { language, theme },
  } = useContext(UiContext);
  const { setUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const onDismissSnackBar = () => setVisible(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current;

  const routeUserInfo = CommonActions.reset({
    index: 0,
    routes: [
      {
        name: 'UserInfo',
        state: {
          routes: [
            {
              name: 'UserInfo1',
              params: { editable: false },
            },
          ],
        },
      },
    ],
  });
  const routeUserDashboard = CommonActions.reset({
    index: 0,
    routes: [{ name: 'UserDashboard' }], // Replace with your desired screen name
  });

  // const warn = (msg: string) => {
  //     if (Platform.OS === 'android') {
  //         ToastAndroid.show(msg, ToastAndroid.SHORT)
  //     }
  // }

  const handleButtonContinueClick = useCallback(async () => {
    // if (!error) {
    try {
      setLoading(true);
      handleChangeScreen();
      if (userDetails.password !== '') {
        let userInstance = null;
        if (userDetails.password !== userDetails.rePassword) {
          setErrorMessage('Password is not matching');
          setVisible(true);
        }
        if (mode === 'SIGNUP') {
          console.log('------------>user details', userDetails);
          try {
            userInstance = await api.auth.signup(userDetails);
          } catch (error) {
            setErrorMessage('Signup failed. Please try again.');
            setVisible(true);
            console.log('Signup error', error);
          } finally {
            setLoading(false);
          }
        } else {
          console.log('----->called');
          try {
            userInstance = await api.auth.chnagePassword({
              mobile: userDetails.mobile,
              newPassword: userDetails.password,
            });
          } catch {
            setErrorMessage('Password Changed failed');
            setVisible(false);
          } finally {
            setLoading(false);
          }
        }
        if (userInstance) {
          console.log('------>userInstance', userInstance);
          setUser(userInstance);
          storeData('@userId', userInstance._id);
          if (mode === 'FORGET') {
            navigation.dispatch(routeUserDashboard);
          } else {
            navigation.dispatch(routeUserInfo);
          }
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    }
    // }
    // else {
    //     warn("Enter Password Carefully")
    // }
  }, [userDetails]);

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colors.background],
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(translateY, {
        toValue: -140, // Adjust this value as needed
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(backgroundColor, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        backgroundColor: interpolatedBackgroundColor,
        paddingTop: 20,
        borderRadius: 20,
      }}
    >
      <View style={[globalStyles.childContainer, { alignItems: 'flex-start' }]}>
        <Text style={[globalStyles.headingText, { color: colors.scrim, marginBottom: 8 }]}>
          {selectLanguage(SCREEN_THREE_TEXT.enter, language)}
          <Text style={{ color: '#E71B73' }}>&nbsp; {selectLanguage(SCREEN_THREE_TEXT.password, language)}</Text>
        </Text>
        {/* <Text style={{ color: colors.tertiary }}>{selectLanguage(SCREEN_THREE_TEXT.details, language)}</Text> */}
        <View style={{ width: '100%' }}>
          <CenterForm handleChangeText={handleChangeText} fieldList={SIGNUP_SCREEN_THREE} object={userDetails} />
        </View>
        <Button
          loading={loading}
          mode="contained"
          style={globalStyles.pinkButton}
          labelStyle={globalStyles.pinkButtonText}
          onPress={handleButtonContinueClick}
        >
          {selectLanguage(SCREEN_THREE_TEXT.next, language)}
        </Button>
      </View>
      <SnackbarAlert message="Something Went Wrong" onDismissSnackBar={onDismissSnackBar} visible={visible} key={1} />
    </Animated.View>
  );
};

export default SignUpScreenThree;
