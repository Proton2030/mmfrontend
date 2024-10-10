import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { Button, useTheme } from 'react-native-paper';
import CenterForm from '../../../../shared/centerForm/CenterForm';
import { useNavigation, useRoute } from '@react-navigation/native';
import AuthContext from '../../../../../contexts/authContext/authContext';
import SnackbarAlert from '../../../../shared/snackbarAlert/SnackbarAlert';
import { api } from '../../../../../utils/api';
import { fullLogo } from '../../../../../assets';
import { USER_INFO_ONE } from '../../../../../constants/forms/UserInformation';
import { handleVibrate } from '../../../../../utils/commonFunction/systemvibration';
import { userInfoStyles } from '../../UserInfo.style';
import { selectLanguage } from '../../../../../utils/commonFunction/languageSelect';
import UiContext from '../../../../../contexts/uiContext/UIContext';
import { SCREEN_USER_INFO_ONE_TEXT } from '../../../../../constants/texts/userInfo/UserInfoPageOne';

const UserInformationPage1 = () => {
  const { user, setUser } = useContext(AuthContext);
  const {
    ui: { language },
  } = useContext(UiContext);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>({
    full_name: '',
    gender: '',
    age: 0,
    marital_status: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const { editable } = route.params;
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
        if (editable === true) {
          return;
        }
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
    navigation.navigate('UserInfo5', { editable: false });
    if (user) {
      if (userInfo.full_name === '' || userInfo.gender === '' || userInfo.age === 0 || userInfo.marital_status === '') {
        setErrorMessage('Please fill the all data');
        setVisible(true);
        handleVibrate();
        return;
      } else {
        if (userInfo.gender === 'MALE') {
          if (userInfo.age < 21) {
            setErrorMessage('Age should not be less than 21');
            setVisible(true);
            handleVibrate();
            return;
          }
        } else if (userInfo.gender === 'FEMALE') {
          if (userInfo.age < 18) {
            setErrorMessage('Age should not be less than 18');
            setVisible(true);
            handleVibrate();
            return;
          }
        }
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

  const [visible, setVisible] = React.useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const handleGoBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };
  useEffect(() => {
    handleSetDefaultData();
  }, [handleSetDefaultData]);

  return (
    <>
      <ScrollView
        style={{ flex: 1, paddingBottom: 0, backgroundColor: colors.background }}
        contentContainerStyle={globalStyles.parentScrollContainer}
      >
        <View style={globalStyles.childContainer}>
          <View style={{ width: '100%', marginBottom: 20, paddingLeft: 5 }}>
            <Image style={userInfoStyles.image} source={fullLogo} />
            <Text
              style={{
                fontSize: 25,
                color: colors.scrim,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
            >
              {selectLanguage(SCREEN_USER_INFO_ONE_TEXT.personal_info, language)}
            </Text>
          </View>
        </View>
        <View style={globalStyles.childContainer}>
          <CenterForm object={userInfo} handleChangeText={handleChangeText} fieldList={USER_INFO_ONE} />
          <Button
            mode="contained"
            loading={loading}
            style={[globalStyles.pinkButton, { marginBottom: 18 }]}
            onPress={handleCompleteButtonClick}
          >
            {selectLanguage(SCREEN_USER_INFO_ONE_TEXT.next, language)}
          </Button>
          {/* {editable ? null : (
            <Button
              mode="outlined"
              style={{ backgroundColor: colors.secondary, borderColor: colors.secondary, width: '100%', padding: 6 }}
              onPress={handleGoBack}
            >
              Back
            </Button>
          )} */}
        </View>
      </ScrollView>
      <SnackbarAlert message={errorMessage} onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
    </>
  );
};

export default UserInformationPage1;
