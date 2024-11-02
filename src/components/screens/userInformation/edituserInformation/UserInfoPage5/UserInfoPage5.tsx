import { View, Text, ScrollView, KeyboardAvoidingView, Image, StyleSheet, Dimensions } from 'react-native';
import { useCallback, useContext, useState } from 'react';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { Button, useTheme } from 'react-native-paper';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import AuthContext from '../../../../../contexts/authContext/authContext';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import SnackbarAlert from '../../../../shared/snackbarAlert/SnackbarAlert';
import { api } from '../../../../../utils/api';
import { defaultUser, logo } from '../../../../../assets';
import { handleVibrate } from '../../../../../utils/commonFunction/systemvibration';

import ImagePicker from 'react-native-image-crop-picker';
import UiContext from '../../../../../contexts/uiContext/UIContext';
import { selectLanguage } from '../../../../../utils/commonFunction/languageSelect';
import { SCREEN_USER_INFO_FIVE_TEXT } from '../../../../../constants/texts/userInfo/UserInfoPageFive';
import { PROFILE_TEXT } from '../../../../../constants/texts/profile/profile';

const windowWidth = Dimensions.get('window').width;

const UserInformationPage5 = () => {
  const { user, setUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const {
    ui: { language },
  } = useContext(UiContext);
  const [errorMessage, setErrorMessage] = useState<string>('Please Fill the Details');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const routeUserDashboard = CommonActions.reset({
    index: 0,
    routes: [
      {
        name: 'UserDashboard',
      },
    ],
  });

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.8,
      cropperCircleOverlay: true, // Optional: circular cropping
      freeStyleCropEnabled: true, // Optional: freeform cropping
      mediaType: 'photo', // Ensures only photos are picked
    })
      .then((image: any) => {
        setProfilePhotoUrl(image.path);
        const file: File = {
          uri: image.path,
          name: image.filename || 'image.jpg',
          type: image.mime || 'image/jpeg',
        } as unknown as File; // Casting to `File`
        setProfilePhoto(file);
      })
      .catch((error: any) => {
        console.log('ImagePicker Error:', error);
      });
  };

  const handleUpload = async () => {
    if (user && user._id && profilePhoto !== null) {
      try {
        setLoading(true);

        // Create FormData and append the file and user ID
        const formData = new FormData();
        formData.append('profile_image', profilePhoto);
        formData.append('userObjectId', user._id);

        // Log FormData entries for verification

        const response = await api.userDetails.updateUserImage(formData);
        setUser(response);
        setLoading(false);
        // navigation.dispatch(routeUserDashboard);
        console.log("===>image updated")
      } catch (error) {
        console.log('Upload error:', error);
        setErrorMessage('Something went wrong');
        setVisible(true);
        handleVibrate();
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage('Please Upload Profile Image');
      setLoading(false);
      setVisible(true);
      handleVibrate();
    }
  };

  const handleGoBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      <ScrollView
        style={{ flex: 1, paddingBottom: 0, backgroundColor: colors.background }}
        contentContainerStyle={globalStyles.parentScrollContainer}
      >
        <View style={styles.viewBox}>
          <Image style={styles.image} source={logo} />
        </View>
        <View style={globalStyles.childContainer}>
          <Text
            style={{
              fontSize: 25,
              color: colors.scrim,
              fontWeight: 'bold',
              textAlign: 'center',
              textTransform: 'capitalize',
            }}
          >
            {selectLanguage(SCREEN_USER_INFO_FIVE_TEXT.profile_photo, language)}
          </Text>
        </View>
        <View style={globalStyles.childContainer}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Image source={profilePhotoUrl ? { uri: profilePhotoUrl } : defaultUser} style={styles.profileImage} />
            <Button
              mode="outlined"
              style={{ backgroundColor: colors.secondary, borderColor: colors.secondary, width: '100%', padding: 6 }}
              textColor={colors.scrim}
              onPress={pickImage}
            >
              {selectLanguage(PROFILE_TEXT.upload_button, language)}
            </Button>
          </View>
          <Button
            mode="contained"
            loading={loading}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.primary,
              width: '100%',
              padding: 6,
              marginVertical: 10,
            }}
            onPress={handleUpload}
          >
            {selectLanguage(SCREEN_USER_INFO_FIVE_TEXT.next, language)}
          </Button>
          <Button
            mode="outlined"
            style={{ backgroundColor: colors.secondary, borderColor: colors.secondary, width: '100%', padding: 6 }}
            onPress={handleGoBack}
          >
            {selectLanguage(SCREEN_USER_INFO_FIVE_TEXT.back, language)}
          </Button>
        </View>
      </ScrollView>
      <SnackbarAlert message={errorMessage} onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
    </>
  );
};

export default UserInformationPage5;

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
