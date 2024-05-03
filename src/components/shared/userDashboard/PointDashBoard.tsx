import React, { useContext } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/theme';
import ProgressContainer from './ProgressContainer/ProgressContainer';
import ProgressBar from './progress/Progress';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { Card, useTheme } from 'react-native-paper';
import AuthContext from '../../../contexts/authContext/authContext';
import UiContext from '../../../contexts/uiContext/UIContext';

export default function PointDashBoard() {
  const { user } = useContext(AuthContext);
  const { ui, setUi } = useContext(UiContext);

  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const routeToPaymentHistory = () => {
    navigation.navigate('paymentHistory');
  };
  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 16,
            // borderWidth: 0.5,
            padding: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
            backgroundColor: colors.surface,
            borderColor: colors.onSurfaceDisabled,
            borderRadius: 12,
          }}
        >
          <ProgressContainer />
        </View>
        <View
          style={{
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: colors.tertiary,

              marginBottom: 16,
            }}
          >
            Message Limit
          </Text>

          <View style={styles.search}>
            <View style={styles.searchInput}>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View
                  style={{
                    marginBottom: 7,
                    flexDirection: 'row',
                    gap: 4,
                  }}
                >
                  <FeatherIcon color={COLORS.primary} name="user" size={18} />
                  <Text style={{ fontWeight: '600', fontSize: 16, color: colors.tertiary }}>
                    {user?.message_limit} left
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    marginBottom: 7,
                    flexDirection: 'row',
                    marginLeft: 5,
                  }}
                  onPress={routeToPaymentHistory}
                >
                  <FeatherIcon color={'gray'} name="clock" size={18} />
                </TouchableOpacity>
              </View>
              <ProgressBar totalCoins={20} usedCoins={user?.message_limit} />
            </View>

            <Card
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: colors.surface,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.primary }}>Recharge</Text>
            </Card>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    margin: 16,
    borderWidth: 2,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
