import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { initiatePayment } from '../../../../utils/commonFunction/paymentPage';
import { uuidv4 } from '../../../../utils/commonFunction/uuiv4';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../contexts/authContext/authContext';

const PlanCards = ({ item }: any) => {
  const { user, setUser } = useContext(AuthContext);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const handlePaymentUpdate = async (package_number: number) => {
    const tran_id = uuidv4().toString();
    await AsyncStorage.setItem('@tran_id', tran_id);
    await AsyncStorage.setItem('@msg_lmt', String(item.chat_count));
    const url = await initiatePayment(user, item, tran_id);
    if (url) {
      navigation.navigate('Payment', {
        url: url,
        tranId: tran_id,
        message_limit: item.chat_count,
        // messages: messages,
      });
      // setModalVisible(false);
    }
  };
  return (
    <>
      <Card
        style={{
          marginRight: 10,
          height: 'auto',
          width: 105,
          marginLeft: 6,
          backgroundColor: colors.background,
          padding: 5,
        }}
      >
        <Text
          style={{
            textAlign: 'left',
            fontWeight: 'bold',
            color: colors.primary,
            marginTop: 3,
            marginBottom: 6,
          }}
        >
          {item?.plan_name}
        </Text>
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: colors.tertiary }}>&nbsp; {item?.plan_price}৳</Text>
        <Text style={{ fontSize: 12, color: colors.tertiary, fontWeight: 'bold' }}>
          &nbsp;{item?.chat_count} people
        </Text>
        <Card
          style={{
            marginTop: 7,
            padding: 0,
            backgroundColor: colors.primary,
            borderRadius: 50,
            width: 'auto',
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
          onPress={() => handlePaymentUpdate}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Buy</Text>
        </Card>
      </Card>
    </>
  );
};

export default PlanCards;
