import { Alert, Image, Text } from 'react-native';
import React, { useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { getFCMToken } from '../../../utils/commonFunction/getFCMToken';
import { Button, useTheme } from 'react-native-paper';
import { IGoogleLoginProps } from '../../../@types/props/googleLogin.props';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { googleIcon } from '../../../assets';

GoogleSignin.configure({
  webClientId: '311450822882-nm3bgjhev1eehqdtjbi32bhjvg6ebadj.apps.googleusercontent.com',
});

const GoogleSignInButton = ({ handleLogIn }: IGoogleLoginProps) => {

  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  async function onGoogleButtonPress() {
    setLoading(true)
    try {
      // console.log('==>called');
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      // console.log('===>google', response);
      const { data } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const { idToken } = data as unknown as any;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      if (userCredential) {
        const {
          user: { displayName, email, photoURL },
        } = userCredential;
        const payload = {
          full_name: displayName,
          email: email,
          profile_image_url: photoURL,
          device_token: await getFCMToken(),
        };
        await handleLogIn(payload);
        // console.log(userCredential);
      }
      setLoading(false)
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
      }
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Button
      // eslint-disable-next-line react/no-unstable-nested-components
      icon={() => <Image source={googleIcon} style={globalStyles.googleIcon} />}
      mode="contained"
      onPress={onGoogleButtonPress}
      style={{
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        width: '100%',
        paddingHorizontal: 6,
        paddingVertical: 5,
        marginTop: 10,

      }}
    >
      {
        loading ?
          <Text>Loading...</Text>
          :
          <Text>Continue with Google</Text>
      }
    </Button>
  );
};

export default GoogleSignInButton;
