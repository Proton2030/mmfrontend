import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import { Button, useTheme } from 'react-native-paper';
import AuthContext from '../../../../../contexts/authContext/authContext';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { api } from '../../../../../utils/api';
import { useNavigation } from '@react-navigation/native';
import { logo } from '../../../../../assets';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { defaultUser } from '../../../../../assets';
import ImagePicker from 'react-native-image-crop-picker';


const windowWidth = Dimensions.get('window').width;

const UpdateProfileImage = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation<any>();
  const [profilePhoto, setProfilePhoto] = useState<any>();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<any>(user?.profile_image_url);

  const { colors } = useTheme();
  const [isChnaged, setIsChnaged] = useState<boolean>(false);
  const [image, setImage] = useState<string | undefined | null>(user?.profile_image_url);
  // const pickImage = () => {
  //   let options = {
  //     mediaType: 'photo' as MediaType,
  //   };

  //   launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorMessage) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else {
  //       if (response.assets && response.assets[0].uri) {
  //         const asset = response.assets[0];
  //         if (asset.uri) {
  //           setProfilePhotoUrl(asset.uri);

  //           const file = {
  //             uri: asset.uri,
  //             name: asset.fileName || 'image.jpg',
  //             type: asset.type || 'image/jpeg',
  //           };

  //           setProfilePhoto(file as unknown as File);
  //         }
  //       }
  //     }
  //   });
  // };

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
      .then((image: { path: any; filename: any; mime: any; }) => {
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
        // Create FormData and append the file and user ID
        const formData = new FormData();
        formData.append('profile_image', profilePhoto);
        formData.append('userObjectId', user._id);
        const response = await api.userDetails.updateUserImage(formData);
        setUser(response);
        navigation.navigate('UserDashboard', { screen: 'User' });
      } catch (error) {
        console.log('Upload error:', error);
      } finally {
      }
    } else {
    }
  };


  // const handleSubmitButtonClick = async () => {
  //   const userDetails = user;
  //   const userId = user?._id;
  //   delete userDetails?._id;
  //   delete userDetails?._id;
  //   console.log(user);
  //   if (image && user) {
  //     const payload = {
  //       userDetails: { ...userDetails, profile_image_url: image },
  //       userObjectId: userId,
  //     };
  //     const userInstance = await api.userDetails.updateUser(payload);
  //     if (userInstance) {
  //       setUser(userInstance);
  //       navigation.navigate('UserDashboard', { screen: 'User' });
  //     }
  //   }
  // };

  return (
    <ScrollView
      style={globalStyles.parent}
      contentContainerStyle={[globalStyles.parentScrollContainer, { backgroundColor: colors.background }]}
    >
      <View style={styles.viewBox}>
        <Image style={styles.image} source={logo} />
      </View>
      <View style={globalStyles.childContainer}>
        <Text style={[globalStyles.headingText, { color: colors.tertiary }]}>Welcome Back {user?.full_name},Please Upload Your Profile Image</Text>
      </View>
      <View style={globalStyles.childContainer}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          {profilePhotoUrl ? <Image source={{ uri: profilePhotoUrl }} style={styles.profileImage} /> :
            <Image source={defaultUser} style={styles.profileImage} />
          }
          <Button
            mode="outlined"
            style={{
              ...globalStyles.lightPinkButton,
              backgroundColor: colors.secondary,
              borderColor: colors.primary,
              marginBottom: 10,
            }}
            onPress={pickImage}
          >
            Upload
          </Button>
        </View>
        <Button
          mode="contained"
          style={globalStyles.pinkButton}
          labelStyle={globalStyles.pinkButtonText}
          // disabled={!isChnaged}
          onPress={handleUpload}
        >
          Complete
        </Button>
      </View>
    </ScrollView>
  );
};

export default UpdateProfileImage;

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
