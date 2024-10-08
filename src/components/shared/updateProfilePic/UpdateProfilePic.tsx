import React, { useCallback, useContext, useState } from 'react';
import CenterForm from '../centerForm/CenterForm';
import { IUserInfo } from '../../../@types/types/userInfo.types';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { MediaType } from 'react-native-image-picker';
import { Button } from 'react-native-paper';
import AuthContext from '../../../contexts/authContext/authContext';
import { api } from '../../../utils/api';
import { useNavigation } from '@react-navigation/native';
import { defaultUser } from '../../../assets';
const windowWidth = Dimensions.get('window').width;

const UpdateProfilePic = () => {
  const pickImage = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigation = useNavigation<any>();

    let options = {
      mediaType: 'photo' as MediaType,
      includeBase64: true,
    };
    const [userInfo, setUserInfo] = useState<IUserInfo>({
      full_name: '',
      gender: '',
      age: 0,
      marital_status: '',
      country: '',
      state: '',
      height: 0,
      weight: 0,
      body_color: '',
      occupation: '',
      work_place: '',
      monthly_income: '',
      education: '',
      islamic_education: '',
      salah: '',
      sawum: '',
      message_limit: 0,
      fathers_name: '',
      fathers_occupation: '',
      mothers_name: '',
      mothers_occupation: '',
      no_of_brothers: 0,
      no_of_sisters: 0,
      financial_condition: '',
      status: 'ACTIVE',
      profile_image_url: null,
    });
    const handleCompleteButtonClick = useCallback(async () => {
      if (user) {
        const payload = {
          userDetails: userInfo,
          userObjectId: user._id,
        };

        const userInstance = await api.userDetails.updateUser(payload);
        if (userInstance) {
          setUser(userInstance);
          navigation.navigate('partner-details');
        }
      }
    }, [user, userInfo]);
    return (
      <>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          {user?.profile_image_url ? (
            <Image source={{ uri: userInfo.profile_image_url || '' }} style={styles.profileImage} />
          ) : (
            <Image source={defaultUser} style={styles.profileImage} />
          )}
          <Button mode="outlined" style={globalStyles.lightPinkButton} onPress={pickImage}>
            Upload
          </Button>
        </View>
      </>
    );
  };
};

const styles = StyleSheet.create({
  image: {
    width: windowWidth / 4,
    height: windowWidth / 4, // Make the height equal to the width
    borderRadius: windowWidth / 8, // Set the border radius to half of the width or height to make the image round
    resizeMode: 'cover',
    marginBottom: 10, // Cover the whole View without distortion
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

export default UpdateProfilePic;
