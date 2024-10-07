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
import ProfileCompleteBtn from './profileComepletBtn/ProfileCompleteBtn';
import { selectLanguage } from '../../../utils/commonFunction/languageSelect';
import { OTHERS } from '../../../constants/texts/others/Others';
import { profileComplete } from '../../../utils/services/profilecomplete/profileComplete';
import { USER_INFO_FOUR, USER_INFO_THREE_part2 } from '../../../constants/forms/UserInformation';

export default function PointDashBoard() {
  const { user } = useContext<any>(AuthContext);
  const {
    ui: { language },
  } = useContext(UiContext);
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);

  const isReligiousInfoIncomplete = USER_INFO_THREE_part2.some((field) => !user?.[field.id]);

  // Check which fields from USER_INFO_FOUR are missing
  const isFamilyInfoIncomplete = USER_INFO_FOUR.some((field) => !user?.[field.id]);

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
  const isProfileComplete = profileComplete();
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
        {!isReligiousInfoIncomplete && !isFamilyInfoIncomplete ? null : <ProfileCompleteBtn />}

        <View style={{ marginHorizontal: 10, paddingHorizontal: 10, paddingVertical: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.tertiary, marginBottom: 16 }}>
            {selectLanguage(OTHERS.message_limit, language)}
          </Text>

          <View style={styles.search}>
            <View style={styles.searchInput}>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View style={{ marginBottom: 7, flexDirection: 'row', gap: 4 }}>
                  <FeatherIcon color={COLORS.primary} name="user" size={18} />
                  <Text style={{ fontWeight: '600', fontSize: 16, color: colors.tertiary }}>
                    {user?.message_limit} {selectLanguage(OTHERS.left, language)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ marginBottom: 7, flexDirection: 'row', marginLeft: 5 }}
                  onPress={routeToPaymentHistory}
                >
                  <FeatherIcon color={'gray'} name="clock" size={18} />
                </TouchableOpacity>
              </View>
              <ProgressBar totalCoins={20} usedCoins={user?.message_limit} />
            </View>
            {isProfileComplete ? (
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
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.primary }}>
                  {selectLanguage(OTHERS.recharge, language)}
                </Text>
              </Card>
            ) : null}
          </View>
        </View>
      </View>

      {/* Bottom Sheet Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            <SubscriptionPage closeModal={closeModal} />
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
    height: 500,
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
