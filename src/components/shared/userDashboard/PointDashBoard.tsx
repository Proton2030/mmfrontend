import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/theme';
import ProgressContainer from './ProgressContainer/ProgressContainer';
import ProgressBar from './progress/Progress';

export default function PointDashBoard() {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.actionWrapper}>
          <ProgressContainer />

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.action}>
              <FeatherIcon color={COLORS.primary} name="settings" size={22} />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Message Limit</Text>

        <View style={styles.search}>
          <View style={styles.searchInput}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <View
                style={{
                  marginBottom: 7,
                  flexDirection: 'row',
                  gap: 10,
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  width: 100,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 4,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <FeatherIcon color={COLORS.grey} name="user" size={18} />
                <Text style={{ fontWeight: '600', fontSize: 16 }}>6 left</Text>
              </View>
              <View
                style={{
                  marginBottom: 7,
                  flexDirection: 'row',
                }}
              >
                <FeatherIcon color={'gray'} name="clock" size={20} />
              </View>
            </View>
            <ProgressBar totalCoins={5} usedCoins={3} />
          </View>

          <TouchableOpacity>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Recharge</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 9999,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#222',
    marginTop: 24,
    marginBottom: 16,
  },
  /** Action */
  action: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginHorizontal: 8,
    backgroundColor: '#fde8f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  /** Search */
  search: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginRight: 12,
  },
  /** Input */
  input: {
    height: 44,
    backgroundColor: '#f0f6fb',
    paddingLeft: 44,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fde8f1',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 24,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
