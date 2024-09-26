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
import { storeData } from '../../../../../utils/commonFunction/storeData';
const windowWidth = Dimensions.get('window').width;

const UserInformationPage5 = () => {
  const { user, setUser } = useContext(AuthContext);
  const { colors } = useTheme();
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
    let options = {
      mediaType: 'photo' as MediaType,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets[0].uri) {
          const asset = response.assets[0];
          if (asset.uri) {
            setProfilePhotoUrl(asset.uri);

            const file = {
              uri: asset.uri,
              name: asset.fileName || 'image.jpg',
              type: asset.type || 'image/jpeg',
            };

            setProfilePhoto(file as unknown as File);
          }
        }
      }
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

        const jsonUser = JSON.stringify(response);
        storeData('@user', jsonUser);
        navigation.dispatch(routeUserDashboard);
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
            Please Give Your Profile Image
          </Text>
        </View>
        <View style={globalStyles.childContainer}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Image source={profilePhotoUrl ? { uri: profilePhotoUrl } : defaultUser} style={styles.profileImage} />
            <Button
              mode="outlined"
              style={{ backgroundColor: colors.secondary, borderColor: colors.secondary, width: '100%', padding: 6 }}
              onPress={pickImage}
            >
              Upload
            </Button>
          </View>
          <Button
            mode="contained"
            loading={loading}
            style={{
              backgroundColor: colors.secondary,
              borderColor: colors.secondary,
              width: '100%',
              padding: 6,
              marginVertical: 10,
            }}
            onPress={handleUpload}
          >
            Submit
          </Button>
          <Button
            mode="outlined"
            style={{ backgroundColor: colors.secondary, borderColor: colors.secondary, width: '100%', padding: 6 }}
            onPress={handleGoBack}
          >
            Back
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
