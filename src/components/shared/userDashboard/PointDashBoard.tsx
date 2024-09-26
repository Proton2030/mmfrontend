import React, { useState, useContext } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput, Modal, Pressable, Animated } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../constants/theme';
import ProgressContainer from './ProgressContainer/ProgressContainer';
import ProgressBar from './progress/Progress';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { Card, useTheme } from 'react-native-paper';
import AuthContext from '../../../contexts/authContext/authContext';
import UiContext from '../../../contexts/uiContext/UIContext';
import { SubscriptionPage } from '../../screens/subscriptionPage/SubscriptionPage';

export default function PointDashBoard() {
  const { user } = useContext(AuthContext);
  const { ui, setUi } = useContext(UiContext);

  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const routeToPaymentHistory = () => {
    navigation.navigate('paymentHistory');
  };
  const handleRouteMyProfile = () => {
    navigation.navigate('UserDetails', {
      userDetails: user,
      editable: true,
    });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={handleRouteMyProfile}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 16,
            padding: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
            backgroundColor: colors.surface,
            borderColor: colors.onSurfaceDisabled,
            borderRadius: 12,
          }}
        >
          <ProgressContainer />
        </TouchableOpacity>

        <View style={{ marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.tertiary, marginBottom: 16 }}>
            Message Limit
          </Text>

          <View style={styles.search}>
            <View style={styles.searchInput}>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View style={{ marginBottom: 7, flexDirection: 'row', gap: 4 }}>
                  <FeatherIcon color={COLORS.primary} name="user" size={18} />
                  <Text style={{ fontWeight: '600', fontSize: 16, color: colors.tertiary }}>
                    {user?.message_limit} left
                  </Text>
                </View>
                <TouchableOpacity style={{ marginBottom: 7, flexDirection: 'row', marginLeft: 5 }} onPress={routeToPaymentHistory}>
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
              onPress={openModal}
            >
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.primary }}>Recharge</Text>
            </Card>
          </View>
        </View>
      </View>

      {/* Bottom Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            <SubscriptionPage />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000033',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    // padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: 500

  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
