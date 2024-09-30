import { WebView } from 'react-native-webview';
import React, { useCallback, useContext, useEffect, } from 'react';
import { SafeAreaView, } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import AuthContext from '../../../contexts/authContext/authContext';
import { api } from '../../../utils/api';
import { Alert, View, Text } from 'react-native';

const Payment = () => {
  const route = useRoute<any>();
  const { user, setUser } = useContext(AuthContext);
  const { url, tranId, message_limit } = route.params;
  const navigation = useNavigation<any>();
  const handleValidationPayment = async () => {
    console.log('called payment');
    if (user) {
      const userInstance = await api.payment.updateUserMessageLimit({
        userObjectId: user._id,
        message_limit: message_limit,
        tran_id: tranId,
      });
      console.log('----->user', userInstance);
      setUser(userInstance);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: { preventDefault: () => void }) => {
      e.preventDefault(); // Prevent the screen from being removed
      Alert.alert('Do not close the window');
      handleValidationPayment();
      unsubscribe();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Text>
        Sohoz Sadi Payment
      </Text>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
};

export default Payment;
