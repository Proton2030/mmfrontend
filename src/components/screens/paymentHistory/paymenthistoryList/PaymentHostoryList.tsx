import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import { Appbar, Avatar, Card, useTheme } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const PaymentHistoryCard = () => {
  const { colors } = useTheme();

  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={{
        height: 70,
        width: '100%',
        backgroundColor: colors.surface,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: colors.surfaceDisabled,
        padding: 18,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
        shadowColor: '#cccccc',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ fontSize: 16, color: colors.scrim }}>Single Chat</Text>
        <Text style={{ fontSize: 12 }}>10 May 2024</Text>
      </View>
      <Text style={{ fontSize: 18, color: colors.scrim }}>৳ 150</Text>
    </TouchableOpacity>
  );
};
