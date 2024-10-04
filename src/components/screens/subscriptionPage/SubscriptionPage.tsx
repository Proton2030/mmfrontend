import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';

import { COLORS } from '../../../constants/theme';
import { styles } from './subcriptionStyles';
import Plans from './plans/Plans';
import Payment from './payment/Payment';
import { api } from '../../../utils/api';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../contexts/authContext/authContext';
import { useTheme } from 'react-native-paper';
import UiContext from '../../../contexts/uiContext/UIContext';

export const SubscriptionPage = ({ closeModal }: any) => {
  const [selected, setSelected] = useState(0);
  const [page, setPage] = useState(0);
  const [plans, setPlans] = useState<any>([]);

  const { user, setUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const {
    ui: { language, theme },
  } = useContext(UiContext);

  const navigation = useNavigation<any>();

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const getAllPlans = async () => {
    const response = await api.payment.getAllPlans();
    setPlans(response);
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  const handlePaymentUpdate = async (plan: any) => {
    if (!user?._id || !plan?._id) return;
    // navigation.replace('PaymentVerification', { tranId: 'tran_1727848874969_h720nyzwm', planId: plan._id });
    const response = await api.payment.initPayment(user?._id, plan?._id);
    closeModal();
    console.log('====>url', response.paymentUrl);
    if (response) {
      const { paymentUrl, tranId } = response;
      navigation.navigate('Payment', {
        paymentUrl,
        tranId,
        planId: plan._id,
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      {page === 0 ? (
        <Plans
          prices={plans}
          selected={selected}
          setSelected={setSelected}
          nextPage={nextPage}
          handlePaymentUpdate={handlePaymentUpdate}
        />
      ) : (
        <Payment
          prevPage={prevPage}
          closeModal={closeModal}
          handlePaymentUpdate={handlePaymentUpdate}
          selectedPlan={plans[selected]}
        />
      )}
      <TouchableOpacity onPress={getAllPlans}></TouchableOpacity>
    </SafeAreaView>
  );
};
