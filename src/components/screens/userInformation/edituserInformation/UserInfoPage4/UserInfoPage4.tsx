import { View, Text, ScrollView, KeyboardAvoidingView, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { Button, useTheme } from 'react-native-paper';
import CenterForm from '../../../../shared/centerForm/CenterForm';
import { useNavigation, useRoute } from '@react-navigation/native';
import AuthContext from '../../../../../contexts/authContext/authContext';
import SnackbarAlert from '../../../../shared/snackbarAlert/SnackbarAlert';
import { api } from '../../../../../utils/api';
import { logo } from '../../../../../assets';
import { USER_INFO_FOUR } from '../../../../../constants/forms/UserInformation';
import { IUserInfo4 } from '../../../../../@types/types/userInfo4.types';
import { handleVibrate } from '../../../../../utils/commonFunction/systemvibration';
import { selectLanguage } from '../../../../../utils/commonFunction/languageSelect';
import { SCREEN_USER_INFO_FOUR_TEXT } from '../../../../../constants/texts/userInfo/UserInfoPageFour';
import UiContext from '../../../../../contexts/uiContext/UIContext';

const UserInformationPage4 = () => {
  const { user, setUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const {
    ui: { language },
  } = useContext(UiContext);
  const route = useRoute<any>();
  const { editable } = route.params;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userInfo, setUserInfo] = useState<IUserInfo4>({
    message_limit: 0,
    fathers_name: '',
    fathers_occupation: '',
    mothers_name: '',
    mothers_occupation: '',
    no_of_brothers: 0,
    no_of_sisters: 0,
    financial_condition: '',
    status: 'ACTIVE',
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
      if (
        userInfo.fathers_name === '' ||
        userInfo.fathers_occupation === '' ||
        userInfo.mothers_name === '' ||
        userInfo.mothers_occupation === '' ||
        userInfo.no_of_brothers === 0 ||
        userInfo.no_of_sisters === 0 ||
        userInfo.financial_condition == ''
      ) {
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

  return (
    <>
      <ScrollView
        style={{ flex: 1, paddingBottom: 0, backgroundColor: colors.background }}
        contentContainerStyle={globalStyles.parentScrollContainer}
      >
        {/* <View style={styles.viewBox}>
          <Image style={styles.image} source={logo} />
        </View> */}
        <View style={globalStyles.childContainer}>
          <Text
            style={{
              fontSize: 25,
              color: colors.scrim,
              fontWeight: 'bold',
              textAlign: 'left',
              textTransform: 'capitalize',
              marginBottom: 10,
            }}
          >
            {selectLanguage(SCREEN_USER_INFO_FOUR_TEXT.family_info, language)}
          </Text>
        </View>
        <View style={globalStyles.childContainer}>
          <CenterForm object={userInfo} handleChangeText={handleChangeText} fieldList={USER_INFO_FOUR} />
          <Button
            mode="contained"
            loading={loading}
            style={[globalStyles.pinkButton, { marginBottom: 18 }]}
            onPress={handleCompleteButtonClick}
          >
            Next
          </Button>
          {editable ? null : (
            <Button
              mode="outlined"
              style={{
                backgroundColor: colors.secondary,
                borderColor: colors.secondary,
                width: '100%',
                padding: 6,
                marginTop: -10,
              }}
              onPress={handleGoBack}
            >
              Back
            </Button>
          )}
        </View>
      </ScrollView>
      <SnackbarAlert message={errorMessage} onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
    </>
  );
};

export default UserInformationPage4;
