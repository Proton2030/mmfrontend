import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CenterForm from '../../../shared/centerForm/CenterForm';
import { LOGIN_SCREEN } from '../../../../constants/forms/Login';
import { ActivityIndicator, Button, useTheme } from 'react-native-paper';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { loginStyle } from './LoginStyles';
import { fullLogo, logo } from '../../../../assets';
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

const Login = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { setUser } = useContext(AuthContext);
  const { ui } = useContext(UiContext);
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
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

  // const storeData = async (key, value) => {
  //     try {
  //       await AsyncStorage.setItem(key, value);
  //       console.log('Data stored successfully!');
  //     } catch (error) {
  //       console.error('Error storing data:', error);
  //     }
  //   };

  const handleLoginButtonClick = useCallback(async () => {
    console.log('-------->click login button');
    try {
      setLoading(true);
      console.log('-------->userCredentials', userCredential);
      const userResponse = await api.auth.login(userCredential);
      console.log('---------->user', userResponse);
      setUser(userResponse);
      if (userResponse) {
        setLoading(false);
        if (!userResponse.full_name || !userResponse.age || !userResponse.state) {
          navigation.navigate('UserInfo', {
            screen: 'UserInfo1',
            params: {
              editable: false, // Another example parameter
            },
          });
          console.log('login', userResponse);
        } else if (
          userResponse.profile_image_url ===
          'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
        ) {
          navigation.navigate('changeImage');
        } else {
          navigation.dispatch(routeUserDashboard);
          const jsonUser = JSON.stringify(userResponse);
          storeData('@user', jsonUser);
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

  useEffect(() => {
    handleGetToken();
  }, [handleGetToken]);

  console.log('=====>ui', ui);

  return (
    <>
      <ScrollView
        style={{ flex: 1, paddingBottom: 0, backgroundColor: "white" }}
        contentContainerStyle={globalStyles.parentScrollContainer}
      >
        <View style={loginStyle.viewBox}>
          <Image style={globalStyles.loginImage} source={{ uri: "https://media.istockphoto.com/id/1291886001/vector/one-paper-heart-on-white-background-for-valentines-women-mother-day-greeting.jpg?s=612x612&w=0&k=20&c=wwIAORczr_Cv_g0M53ncxwWJUaDMF3zxLWGy1YiWamg=" }} />
          <Image style={loginStyle.image} source={fullLogo} />
          <Text style={{ textAlign: "left", fontWeight: "500", fontSize: 40, color: "black" }}>
            Wellcome back

          </Text>
          <Text style={{ color: colors.primary, textAlign: "left", fontWeight: "500", fontSize: 40, marginTop: -10 }}>
            Please Login
          </Text>

        </View>
        <View style={globalStyles.childContainer}>
          <CenterForm handleChangeText={handleChangeText} fieldList={LOGIN_SCREEN} object={userCredential} />
          <Text style={loginStyle.forgetPass} onPress={routeToForget}>
            {selectLanguage(LOGIN_TEXT.forget_password, ui.language)}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary, borderColor: colors.primary, width: "100%", paddingHorizontal: 6, paddingVertical: 13, marginTop: -10,
              borderTopEndRadius: 25, borderBottomEndRadius: 25, borderTopLeftRadius: 25
            }}
            onPress={handleLoginButtonClick}
          >{
              loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ fontWeight: "400", fontSize: 20, justifyContent: "center", textAlign: "center", color: "white" }}>{selectLanguage(LOGIN_TEXT.login_button, ui.language)}</Text>
              )}


          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignUpButtonClick}
            style={{ marginTop: 'auto' }}>
            <Text style={{
              fontSize: 15,
              fontWeight: '600',
              color: '#222',
              textAlign: 'center',
              letterSpacing: 0.15,
              marginTop: 20,
            }}>
              Don't have an account?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center', padding: 30 }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: colors.tertiary,
            }}
          />
          <View>
            <Text
              style={{
                width: 80,
                textAlign: 'center',
                color: colors.tertiary,
              }}
            >
              {selectLanguage(LOGIN_TEXT.new_user, ui.language)}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: colors.tertiary,
            }}
          />
        </View> */}
        {/* <View style={globalStyles.childContainer}>
          <Button
            mode="outlined"
            style={{ backgroundColor: colors.secondary, borderColor: colors.secondary, width: '100%', padding: 6 }}
            theme={{ colors: { primary: colors.primary } }}
            onPress={handleSignUpButtonClick}
          >
            {selectLanguage(LOGIN_TEXT.signup_button, ui.language)}
          </Button>
        </View> */}
      </ScrollView>
      <SnackbarAlert message="Wrong Credential" onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
    </>
  );
};
export default Login;
