import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const EpmtyPage = ({ text1, text2 }: any) => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  return (
    <View style={styles.empty}>
      <View style={styles.fake}>
        <View style={styles.fakeCircle} />

        <View>
          <View style={[styles.fakeLine, { width: 120 }]} />

          <View style={styles.fakeLine} />

          <View style={[styles.fakeLine, { width: 70, marginBottom: 0 }]} />
        </View>
      </View>

      <View style={[styles.fake, { opacity: 0.5 }]}>
        <View style={styles.fakeCircle} />

        <View>
          <View style={[styles.fakeLine, { width: 120 }]} />

          <View style={styles.fakeLine} />

          <View style={[styles.fakeLine, { width: 70, marginBottom: 0 }]} />
        </View>
      </View>

      {/* <Text style={styles.emptyTitle}>Your payment inbox is empty</Text>

      <Text style={styles.emptyDescription}>Once you buy a a plan, you'll see payment history here</Text> */}

      <Text style={[styles.emptyTitle, { color: colors.scrim }]}>{text1}</Text>

      <Text style={[styles.emptyDescription, { color: colors.tertiary }]}>{text2}</Text>
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
