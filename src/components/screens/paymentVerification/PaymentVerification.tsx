import { View, Text, SafeAreaView, Image } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../../../utils/api';
import AuthContext from '../../../contexts/authContext/authContext';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { paymentFail, paymentLoader, sucessPayment } from '../../../assets';

const PaymentVerification = ({ route }: any) => {
  const { tranId, planId } = route.params;
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<string>('');

  const handlePaymentVerification = useCallback(async () => {
    try {
      if (tranId && planId && user?._id) {
        const payload = {
          tran_id: tranId,
          userId: user?._id,
          planId,
        };
        setLoading(true);
        console.log('====>payload', payload);
        const response = await api.payment.validatePayment(payload);
        console.log('===>response', response);
        if (response) {
          setIsPaymentSuccess(true);
          setPaymentStatus(response.payment_status);
          setUser(response.userDetails);
        } else {
          setIsPaymentSuccess(false);
          setPaymentStatus('FAILED');
        }
      }
    } catch (error: any) {
      console.log(JSON.stringify(error));
    } finally {
      setLoading(false);
      // setTimeout(() => {
      //   navigation.goBack();
      // }, 2700);
    }
  }, [tranId, planId]);

  useEffect(() => {
    handlePaymentVerification();
  }, [handlePaymentVerification]);

  console.log('==>payment', isPaymentSuccess);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <LottieView source={paymentLoader} autoPlay loop style={{ width: 300, height: 200 }} />
      ) : isPaymentSuccess ? (
        <Image source={sucessPayment} style={{ width: 300, height: 200 }} />
      ) : (
        <LottieView source={paymentFail} autoPlay loop={false} style={{ width: 300, height: 200 }} />
      )}
      <Text>{paymentStatus}</Text>
    </SafeAreaView>
  );
};

export default PaymentVerification;
