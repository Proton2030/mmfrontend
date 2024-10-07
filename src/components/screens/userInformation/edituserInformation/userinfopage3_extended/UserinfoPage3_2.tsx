import { View, Text, ScrollView, Image, Animated, Keyboard } from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { Button, useTheme } from 'react-native-paper';
import CenterForm from '../../../../shared/centerForm/CenterForm';
import { useNavigation, useRoute } from '@react-navigation/native';
import AuthContext from '../../../../../contexts/authContext/authContext';
import SnackbarAlert from '../../../../shared/snackbarAlert/SnackbarAlert';
import { api } from '../../../../../utils/api';
import { logo, question } from '../../../../../assets';
import { USER_INFO_THREE_part2 } from '../../../../../constants/forms/UserInformation';
import { IUserInfo3part2 } from '../../../../../@types/types/userinfo3Part2';
import { handleVibrate } from '../../../../../utils/commonFunction/systemvibration';

import { userInfoStyles } from '../../UserInfo.style';
import { selectLanguage } from '../../../../../utils/commonFunction/languageSelect';
import { RELIGIOUS_INFO_TEXT } from '../../../../../constants/texts/userInfo/ReligiousInfoText';
import UiContext from '../../../../../contexts/uiContext/UIContext';

const UserInformationPage3_part2 = () => {
  const { user, setUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const {
    ui: { language },
  } = useContext(UiContext);
  const route = useRoute<any>();
  const { editable } = route.params;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const translateY = useRef(new Animated.Value(0)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const [userInfo, setUserInfo] = useState<IUserInfo3part2>({
    salah: '',
    sawum: '',
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
      if (userInfo.salah === '' || userInfo.sawum === '') {
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
          navigation.navigate('UserInfo4', { editable });
          // if (editable) {
          //   navigation.navigate('UserDashboard');
          // } else {
          //   navigation.navigate('UserInfo4', { editable: false });
          // }
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
    outputRange: ['transparent', 'white'],
  });
  return (
    <>
      <ScrollView
        style={{ flex: 1, paddingBottom: 0, backgroundColor: colors.background }}
        contentContainerStyle={globalStyles.parentScrollContainer}
      >
        <View style={globalStyles.childContainer}>
          <Image source={question} style={{ width: '100%', height: undefined, aspectRatio: 1 }} resizeMode="contain" />
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
                {selectLanguage(RELIGIOUS_INFO_TEXT.religious_info, language)}
              </Text>
            </View>
            <CenterForm object={userInfo} handleChangeText={handleChangeText} fieldList={USER_INFO_THREE_part2} />
            <Button
              mode="contained"
              loading={loading}
              style={[globalStyles.pinkButton, { marginBottom: 18 }]}
              onPress={handleCompleteButtonClick}
            >
              Next
            </Button>
            <Button
              mode="outlined"
              style={{ backgroundColor: colors.secondary, borderColor: colors.secondary, width: '100%', padding: 6 }}
              onPress={handleGoBack}
            >
              Back
            </Button>
          </View>
        </Animated.View>
      </ScrollView>
      <SnackbarAlert message={errorMessage} onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
    </>
  );
};

export default UserInformationPage3_part2;
