import { ScrollView, Image, Dimensions, Animated, Easing, TouchableOpacity, StatusBar } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { formatKeys } from '../../../utils/commonFunction/formatKeys';
import { View, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  IconButton,
  useTheme,
} from 'react-native-paper';
import {
  PERSONAL_DETAILS,
  USER_INFO_FOUR,
  USER_INFO_ONE,
  USER_INFO_THREE,
  USER_INFO_THREE_part2,
  USER_INFO_TWO,
} from '../../../constants/forms/UserInformation';
import { PARTNER_INFO_ONE, PARTNER_INFO_THREE, PARTNER_INFO_TWO } from '../../../constants/forms/PartnerInformation';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../contexts/authContext/authContext';
import { api } from '../../../utils/api';
import { getTimeAgo } from '../../../utils/commonFunction/lastSeen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAppThemeMode } from '../../../utils/commonFunction/getAppThemeMode';
import { DarkThemeColor, LightThemeColor } from '../../../constants/theme/themeColor';
import UiContext from '../../../contexts/uiContext/UIContext';
import { selectLanguage } from '../../../utils/commonFunction/languageSelect';
import { OTHERS } from '../../../constants/texts/others/Others';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IField, IGroup } from '../../../@types/types/FieldTypes.types';
import UserProfile from './userProfile/UserProfile';

const UserDetails = () => {
  const route = useRoute<any>();
  const { user } = useContext(AuthContext);
  const [choice, setChoice] = useState<boolean>(false);
  const { userDetails, editable, Userchoice } = route.params;
  const fadeAnim = new Animated.Value(0);
  const navigation = useNavigation<any>();

  const addChoice = useCallback(async (sender_id: string, reciver_id: string) => {
    setChoice((prev) => !prev);
    const payload = {
      senderId: user?._id,
      recieverId: userDetails._id,
    };
    const response = await api.userChoice.addChoice(payload);
  }, []);

  React.useEffect(() => {
    setChoice(Userchoice);
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <UserProfile userDetails={userDetails} uri={userDetails.profile_image_url} />

      {/* <View
        style={{
          paddingLeft: 20,
          backgroundColor: colors.secondary,
          paddingBottom: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <View>
          <Paragraph style={styles.paragraph}>{userDetails.marital_status}</Paragraph>
        </View>
        {!editable ? (
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: 20 }}>
            <IconButton
              icon={choice ? 'heart' : 'heart-outline'}
              onPress={handleAddChoice}
              iconColor={choice ? 'red' : colors.scrim}
            ></IconButton>
            <TouchableOpacity onPress={handleNavigateChat}>
              <Ionicons name="chatbox-outline" size={24} color={colors.scrim} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View> */}
      {/* <ScrollView
        style={{
          marginTop: 10,
          padding: 20,
          backgroundColor: colors.background,
        }}
      >
        <View style={{ marginBottom: 16 }}>
          <View style={globalStyles.iconText}>
            <Text style={[globalStyles.mediumText, { marginBottom: 18, color: '#E71B73' }]}>Personal Information</Text>
            {editable ? <IconButton icon="pencil-outline" onPress={handleParsonalInfoNavigate} /> : null}
          </View>
          {PERSONAL_DETAILS.map((key: IField, index: number) => {
            return (
              <View key={index} style={styles.infoItem}>
                {key.id === 'state' ? (
                  <Text style={styles.infoLabel}>District</Text>
                ) : (
                  <Text style={styles.infoLabel}>{formatKeys(key.id, language)}</Text>
                )}
                {key.id === 'age' ? (
                  <Text>{userDetails[key.id]} years</Text>
                ) : key.id === 'height' ? (
                  <Text>{userDetails[key.id]} feet</Text>
                ) : key.id === 'weight' ? (
                  <Text>{userDetails[key.id]} kg</Text>
                ) : (
                  <Text>{userDetails[key.id]}</Text>
                )}
              </View>
            );
          })}
        </View>




      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  infoItem: {},
  infoLabel: {},
});

export default UserDetails;
