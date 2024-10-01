import { View, Text } from 'react-native';
import React from 'react';

const PaymentVerification = ({ route }: any) => {
  const { tranId } = route.params;
  return (
    <View>
      <Text>PaymentVerification for {tranId}</Text>
    </View>
  );
};

export default PaymentVerification;
