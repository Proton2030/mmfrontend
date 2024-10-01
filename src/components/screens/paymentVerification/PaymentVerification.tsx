import { View, Text } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../../../utils/api';
import AuthContext from '../../../contexts/authContext/authContext';
import { useNavigation } from '@react-navigation/native';

const PaymentVerification = ({ route }: any) => {
  const { tranId, planId } = route.params;
  const { user, setUser } = useContext(AuthContext);
  const [paymentVerified, setPaymentVerified] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const handlePaymentVerification = useCallback(async () => {
    try {
      const payload = {
        tran_id: tranId,
        userId: user?._id,
        planId,
      };
      const response = await api.payment.validatePayment(payload);
      if (response) {
        setPaymentVerified(true);
        setUser(response);
      } else {
        setPaymentVerified(false);
      }
    } catch (error: any) {
      console.log(error);
      setPaymentVerified(false);
    } finally {
      setTimeout(() => {
        navigation.goBack();
      }, 2500);
    }
  }, [tranId, planId, user]);

  useEffect(() => {
    handlePaymentVerification();
  }, [handlePaymentVerification]);

  return <View>{paymentVerified ? <Text>Payment Verifiew</Text> : <Text>Payment Not Verified</Text>}</View>;
};

export default PaymentVerification;
