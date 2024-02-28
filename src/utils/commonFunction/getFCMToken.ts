import messaging from '@react-native-firebase/messaging';

export const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    return token;
    } catch (e) {
      console.log(e);
    }
};