import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Appbar, Avatar, Card, useTheme } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { EpmtyPage } from '../emptyPage/EmptyPage';
import UiContext from '../../../contexts/uiContext/UIContext';
import { PaymentHistoryTopCard } from './paymentTopCard/PaymentTopCard';
import { PaymentHistoryCard } from './paymenthistoryList/PaymentHostoryList';
import { api } from '../../../utils/api';
import AuthContext from '../../../contexts/authContext/authContext';

export const PaymentHistory = () => {
  const { colors } = useTheme();
  const { user } = useContext(AuthContext);

  const [paymentHistory, setPaymentHistory] = useState<any[]>([]); // Initialize as an empty array

  const getPaymentList = async () => {
    try {
      const filter = {
        userId: user?._id,
      };
      const fetchedPaymentHistory = await api.payment.getPaymentList(filter);
      setPaymentHistory(fetchedPaymentHistory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {paymentHistory.length > 0 ? (
            paymentHistory.map((item, index) => (
              <PaymentHistoryCard key={index} data={item} />
            ))
          ) : (
            <EpmtyPage />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingTop: 40,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  /** Empty */
  empty: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    marginTop: 12,
  },
  emptyDescription: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: '#8c9197',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  /** Fake */
  fake: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  fakeCircle: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: '#e8e9ed',
    marginRight: 16,
  },
  fakeLine: {
    width: 200,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#e8e9ed',
    marginBottom: 8,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    marginTop: 'auto',
    marginHorizontal: 24,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
