import { View, Text, SafeAreaView } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../../../utils/api';
import AuthContext from '../../../contexts/authContext/authContext';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { paymentFail, playingHeart, paymentSuccess } from '../../../assets';
import { ActivityIndicator } from 'react-native-paper';
import { set } from 'lodash';

const PlayStorePaymentVerification = ({ route }: any) => {
  const { paymentStatus } = route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    try {
      if (paymentStatus) {
        setLoading(true);
        if (paymentStatus === 'SUCCESS') {
          setIsPaymentSuccess(true);
          setLoading(false);
        } else {
          setIsPaymentSuccess(false);
          setLoading(false);
        }
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigation.goBack();
      }, 2700);
    }
  }, [paymentStatus]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : isPaymentSuccess ? (
        <LottieView source={paymentSuccess} autoPlay loop={false} style={{ width: 350, height: 400 }} />
      ) : (
        <LottieView source={paymentFail} autoPlay loop={false} style={{ width: 300, height: 200 }} />
      )}
      <Text>{paymentStatus}</Text>
    </SafeAreaView>
  );
};

export default PlayStorePaymentVerification;
