import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import { Appbar, Avatar, Card, useTheme } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { EpmtyPage } from '../emptyPage/EmptyPage';
import UiContext from '../../../contexts/uiContext/UIContext';
import { PaymentHistoryTopCard } from './paymentTopCard/PaymentTopCard';
import { PaymentHistoryCard } from './paymenthistoryList/PaymentHostoryList';

export const PaymentHistory = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const paymentHistoryData = [1, 2, 3, 4];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Appbar.Header style={{ backgroundColor: colors.secondary, paddingLeft: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={colors.primary} style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: '500', fontSize: 23, color: colors.primary }}>Payment History</Text>
      </Appbar.Header>
      <View style={styles.container}>
        <PaymentHistoryTopCard />

        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 40,
          }}
        >
          {/* <View
            style={{
              height: 1,
              backgroundColor: '#ddd', // You can change the color as needed
              marginVertical: 10, // Add margin if you want space around the divider
            }}
          /> */}
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 5 }}
          >
            <Text style={{ fontWeight: '500', fontSize: 14, marginVertical: 10, color: colors.scrim }}>
              Past Transactions
            </Text>
            <Text style={{ fontWeight: '500', fontSize: 14, marginVertical: 10, color: colors.primary }}>See All</Text>
          </View>
          {paymentHistoryData.map((item, index) => (
            <PaymentHistoryCard key={index} />
          ))}
        </View>
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
