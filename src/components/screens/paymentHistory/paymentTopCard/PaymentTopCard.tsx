import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import { Appbar, Avatar, Card, useTheme } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UiContext from '../../../../contexts/uiContext/UIContext';

export const PaymentHistoryTopCard = () => {
  const { colors } = useTheme();
  const { ui } = useContext(UiContext);

  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        style={{
          height: 140,
          width: '100%',
          backgroundColor: colors.surface,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 20,
          elevation: 3,
          padding: 18,
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        {/* First View */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Avatar.Icon size={26} icon="sale" />
            <Text style={{ fontSize: 20, color: colors.scrim, fontWeight: '400' }}>Basic plan</Text>
          </View>

          <View
            style={{
              borderWidth: 0.8,
              borderRadius: 40,
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderColor: colors.primary,
            }}
          >
            <Text style={{ fontSize: 14, color: colors.primary }}>Active</Text>
          </View>
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: '#ddd', // You can change the color as needed
            marginVertical: 10, // Add margin if you want space around the divider
          }}
        />

        {/* Second View */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text
            style={{ fontSize: 16, color: ui.theme === 'DARK' ? colors.scrim : colors.backdrop, fontWeight: '600' }}
          >
            Total Spent:
          </Text>
          <Text style={{ fontSize: 26, color: colors.scrim }}>৳ 699.00</Text>
        </View>
      </TouchableOpacity>
    </View>
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
