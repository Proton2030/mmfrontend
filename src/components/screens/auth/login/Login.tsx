import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CenterForm from '../../../shared/centerForm/CenterForm';
import { LOGIN_SCREEN } from '../../../../constants/forms/Login';
import { ActivityIndicator, Button, useTheme } from 'react-native-paper';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { loginStyle } from './LoginStyles';
import { fullLogo, log, logo } from '../../../../assets';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { IUserCredential } from '../../../../@types/types/userCredential.types';
import { api } from '../../../../utils/api';
import AuthContext from '../../../../contexts/authContext/authContext';
import SnackbarAlert from '../../../shared/snackbarAlert/SnackbarAlert';
import { storeData } from '../../../../utils/commonFunction/storeData';
import { getFCMToken } from '../../../../utils/commonFunction/getFCMToken';
import UiContext from '../../../../contexts/uiContext/UIContext';
import { selectLanguage } from '../../../../utils/commonFunction/languageSelect';
import { LOGIN_TEXT } from '../../../../constants/texts/auth/login/Login';
import CommonButton from '../../../shared/commonButton/CommonButton';
import LinearGradient from 'react-native-linear-gradient';
import { DarkThemeColor, LightThemeColor } from '../../../../constants/theme/themeColor';
import { TranslateToBengali } from '../../../../utils/commonFunction/translate';
import GoogleSignInButton from '../../../shared/googleSIgnInButton/GoogleSignInButton';

const Login = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { setUser } = useContext(AuthContext);
  const { ui } = useContext(UiContext);
  const ThemeColor = ui.theme === 'DARK' ? DarkThemeColor : LightThemeColor;
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [userCredential, setUserCredentail] = useState<IUserCredential>({
    userId: '',
    password: '',
    device_token: '',
  });
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const handleSignUpButtonClick = () => {
    navigation.navigate('Confirm', { screen: 'confirm' });
  };

  const routeUserDashboard = CommonActions.reset({
    index: 0,
    routes: [{ name: 'UserDashboard' }], // Replace with your desired screen name
  });

  const handleChangeText = useCallback(
    async (field: string, type: string, text: string) => {
      try {
        if (token) {
          setUserCredentail(Object.assign({}, userCredential, { [field]: text, device_token: token }));
        } else {
          setUserCredentail(Object.assign({}, userCredential, { [field]: text, device_token: 'token' }));
        }
      } catch (err) {
        console.log(err);
      }
    },
    [userCredential],
  );

  const handleLoginButtonClick = useCallback(async () => {
    try {
      setLoading(true);
      const userResponse = await api.auth.login(userCredential);
      if (userResponse) {
        storeData('@userId', userResponse._id);
        setUser(userResponse);
        setLoading(false);
        if (!userResponse.full_name || !userResponse.gender || !userResponse.state) {
          navigation.navigate('UserInfo', {
            screen: 'UserInfo1',
            params: {
              editable: false, // Another example parameter
            },
          });
          console.log('login', userResponse);
        } else if (userResponse.profile_image_url === null) {
          navigation.navigate('changeImage');
        } else {
          console.log('===>called user dashboard');
          navigation.dispatch(routeUserDashboard);
        }
      }
    } catch (err) {
      setLoading(false);
      onToggleSnackBar();
    }
  }, [userCredential]);

  const routeToForget = () => {
    navigation.navigate('forget-pass');
  };

  const handleGetToken = useCallback(async () => {
    const temp = await getFCMToken();
    if (temp) {
      setToken(temp);
    }
  }, []);

  const handleGoogleSignIn = async (payload: any) => {
    console.log('===>payload', payload);
  };

  useEffect(() => {
    handleGetToken();
  }, [handleGetToken]);

  return (
    <LinearGradient colors={[ThemeColor.surface, ThemeColor.background]} style={globalStyles.parentScrollContainer}>
      <ScrollView style={{ flex: 1, paddingBottom: 0 }} contentContainerStyle={globalStyles.parentScrollContainer}>
        <View style={loginStyle.viewBox}>
          {!isInputFocused && ( // Conditionally render the image
            <>
              <Image style={globalStyles.loginImage} source={log} />
              <Image style={loginStyle.image} source={fullLogo} />
            </>
          )}
          <Text style={{ textAlign: 'left', fontWeight: '500', fontSize: 30, color: colors.scrim, marginBottom: 10 }}>
            {selectLanguage(LOGIN_TEXT.welcome, ui.language)}!
          </Text>
          {/* <Text style={{ color: colors.primary, textAlign: 'left', fontWeight: '500', fontSize: 20, marginBottom: 5 }}>
            Login with your credentials
          </Text> */}
        </View>
        <View style={globalStyles.childContainer}>
          <CenterForm handleChangeText={handleChangeText} fieldList={LOGIN_SCREEN} object={userCredential} />
          <TouchableOpacity onPress={routeToForget} style={{ marginTop: 'auto' }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: colors.scrim,
                textAlign: 'left',
                letterSpacing: 0.15,
                marginBottom: 3,
              }}
            >
              <Text style={{ textDecorationLine: 'underline', textAlign: 'left' }}>
                {selectLanguage(LOGIN_TEXT.forget_password, ui.language)}?
              </Text>
            </Text>
          </TouchableOpacity>
          <CommonButton
            loading={loading}
            handleAction={handleLoginButtonClick}
            text={selectLanguage(LOGIN_TEXT.login_button, ui.language)}
          />
          {/* <GoogleSignInButton handleLogIn={handleGoogleSignIn} /> */}
          {/* <TouchableOpacity onPress={handleSignUpButtonClick} style={{ marginTop: 'auto' }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: colors.scrim,
                textAlign: 'center',
                letterSpacing: 0.15,
                marginTop: 5,
              }}
            >
              {selectLanguage(LOGIN_TEXT.new_user, ui.language)}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              backgroundColor: ui.theme === 'DARK' ? '#E71B73' : '#fad1e3',

              width: '100%',
              paddingHorizontal: 6,
              paddingVertical: 13,
              marginTop: 10,
              borderTopEndRadius: 25,
              borderBottomEndRadius: 25,
              borderTopLeftRadius: 25,
            }}
            onPress={handleSignUpButtonClick}
          >
            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
                justifyContent: 'center',
                textAlign: 'center',
                color: ui.theme === 'DARK' ? 'white' : '#E71B73',
              }}
            >
              {selectLanguage(LOGIN_TEXT.signup_button, ui.language)}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SnackbarAlert message="Wrong Credential" onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
    </LinearGradient>
  );
};

export default Login;
