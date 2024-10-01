import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  Keyboard,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { Button, useTheme } from 'react-native-paper';
import CenterForm from '../../../../shared/centerForm/CenterForm';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import AuthContext from '../../../../../contexts/authContext/authContext';
import SnackbarAlert from '../../../../shared/snackbarAlert/SnackbarAlert';
import { api } from '../../../../../utils/api';
import { education, fullLogo, logo } from '../../../../../assets';
import { USER_INFO_THREE } from '../../../../../constants/forms/UserInformation';
import { IUserInfo3 } from '../../../../../@types/types/userInfo3.types';
import { handleVibrate } from '../../../../../utils/commonFunction/systemvibration';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserInformationPage3 = () => {
  const { user, setUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const route = useRoute<any>();
  const translateY = useRef(new Animated.Value(0)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const { editable } = route.params;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userInfo, setUserInfo] = useState<IUserInfo3>({
    education: '',
    islamic_education: '',
  });

  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSetDefaultData = useCallback(() => {
    if (user) {
      const tempData: any = user;
      delete tempData.updatedAt;
      setUserInfo(user);
    }
  }, [user]);

  const handleChangeText = useCallback(
    (field: string, type: string, text: string) => {
      if (type === 'NUMBER') {
        setUserInfo(Object.assign({}, userInfo, { [field]: Number(text) }));
      }
      if (field === 'gender') {
        if (text === 'MALE') {
          setUserInfo(Object.assign({}, userInfo, { age: 21, [field]: text }));
        } else {
          setUserInfo(Object.assign({}, userInfo, { age: 18, [field]: text }));
        }
      } else {
        setUserInfo(Object.assign({}, userInfo, { [field]: text }));
      }
    },
    [userInfo],
  );

  const handleCompleteButtonClick = useCallback(async () => {
    if (user) {
      if (userInfo.education === '' || userInfo.islamic_education === '') {
        setErrorMessage('Please fill the all data');
        setVisible(true);
        handleVibrate();
        return;
      }
      const payload = {
        userDetails: userInfo,
        userObjectId: user._id,
      };

      try {
        setLoading(true);
        const userInstance = await api.userDetails.updateUser(payload);
        if (userInstance) {
          setUser(userInstance);
          setLoading(false);
          if (editable) {
            navigation.navigate('UserDashboard');
          } else {
            navigation.navigate('UserInfo5', { editable: false });
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setVisible(true);
        handleVibrate();
      }
    }
  }, [user, userInfo]);
  const handleGoBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };
  const [visible, setVisible] = React.useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    handleSetDefaultData();
  }, [handleSetDefaultData]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(translateY, {
        toValue: -100, // Adjust this value as needed
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

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colors.background],
  });

  return (
    <>
      <ScrollView
        style={{ flex: 1, paddingBottom: 0, backgroundColor: colors.background }}
        contentContainerStyle={globalStyles.parentScrollContainer}
      >
        <View style={globalStyles.childContainer}>
          <Image source={education} style={{ width: '100%', height: undefined, aspectRatio: 1 }} resizeMode="contain" />
        </View>
        <Animated.View
          style={{
            transform: [{ translateY }],
            backgroundColor: interpolatedBackgroundColor,
            paddingTop: 20,
            borderRadius: 20,
          }}
        >
          <View style={globalStyles.childContainer}>
            <View style={{ width: '100%', marginBottom: 20, paddingLeft: 5 }}>
              {/* <Image style={userInfoStyles.image} source={fullLogo} /> */}
              <Text
                style={{
                  fontSize: 25,
                  color: colors.scrim,
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}
              >
                Please Give Your Education Background
              </Text>
            </View>
            <CenterForm object={userInfo} handleChangeText={handleChangeText} fieldList={USER_INFO_THREE} />
            <Button
              mode="contained"
              loading={loading}
              style={[globalStyles.pinkButton, { marginBottom: 18 }]}
              onPress={handleCompleteButtonClick}
            >
              {editable ? 'Submit' : 'Next'}
            </Button>
            {editable ? null : (
              <Button
                mode="outlined"
                style={{ backgroundColor: colors.secondary, borderColor: colors.secondary, width: '100%', padding: 6 }}
                onPress={handleGoBack}
              >
                Back
              </Button>
            )}
          </View>
        </Animated.View>
      </ScrollView>
      <SnackbarAlert message={errorMessage} onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
    </>
  );
};

export default UserInformationPage3;
