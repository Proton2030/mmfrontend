import { ScrollView, Image, Dimensions, Animated, Easing, TouchableOpacity } from 'react-native';
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

const UserDetails = () => {
  const { colors } = useTheme();
  const {
    ui: { language, theme },
  } = useContext(UiContext);
  const route = useRoute<any>();
  const { user } = useContext(AuthContext);
  const [choice, setChoice] = useState<boolean>(false);
  const { userDetails, editable, Userchoice } = route.params;
  const fadeAnim = new Animated.Value(0);
  const navigation = useNavigation<any>();

  const handleParsonalInfoNavigate = () => {
    navigation.navigate('UserInfo', {
      screen: 'UserInfo1',
      params: {
        editable: true,
        // Any other parameters you want to pass
      },
    });
    console.log('navigate');
  };
  const handleJobInfoNavigate = () => {
    navigation.navigate('UserInfo', {
      screen: 'UserInfo2',
      params: {
        editable: true,
        // Any other parameters you want to pass
      },
    });
  };
  const handleEduInfoNavigate = () => {
    navigation.navigate('UserInfo', {
      screen: 'UserInfo3',
      params: {
        editable: true,
        // Any other parameters you want to pass
      },
    });
  };
  const handleReligiousInfoNavigate = () => {
    navigation.navigate('UserInfo', {
      screen: 'UserInfo3_part2',
      params: {
        editable: true,
        // Any other parameters you want to pass
      },
    });
  };
  const handleFamilyInfoNavigate = () => {
    navigation.navigate('UserInfo', {
      screen: 'UserInfo4',
      params: {
        editable: true,
        // Any other parameters you want to pass
      },
    });
  };

  const addChoice = useCallback(async (sender_id: string, reciver_id: string) => {
    setChoice((prev) => !prev);
    const payload = {
      senderId: user?._id,
      recieverId: userDetails._id,
    };
    const response = await api.userChoice.addChoice(payload);
  }, []);

  const handleNavigateProfileImage = () => {
    navigation.navigate('ProfileImage', {
      userid: userDetails._id,
      username: userDetails.full_name,
      imageURL: userDetails.profile_image_url,
    });
  };

  const handleNavigateChat = () => {
    let roomId = '';
    if (user && user._id && userDetails._id) {
      if (user?.gender === 'MALE') {
        roomId = user._id + userDetails._id;
      } else {
        roomId = userDetails._id + user._id;
      }
      console.log('roomId', roomId);
      navigation.navigate('Chat', {
        userDetails: userDetails,
        roomId: roomId,
      });
    }
  };

  const handleAddChoice = useCallback(() => {
    if (user?._id && userDetails._id) {
      addChoice(user._id, userDetails._id);
    }
  }, [user]);

  React.useEffect(() => {
    setChoice(Userchoice);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.secondary,
        paddingTop: 30,
      }}
    >
      <View
        style={{
          paddingLeft: 20,
          backgroundColor: colors.secondary,
          paddingBottom: 8,
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
          <TouchableOpacity onPress={handleNavigateProfileImage}>
            <Avatar.Image
              source={{
                uri: userDetails.profile_image_url,
              }}
              size={80}
            />
          </TouchableOpacity>
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
              {userDetails.full_name}
              {userDetails.is_verified ? <Icon name="verified" size={18} /> : null}
            </Title>
            <Text style={{ color: '#E71B73', fontSize: 16 }}>{userDetails.age} Years</Text>
            <Text style={{ color: '#E71B73', fontSize: 16 }}>
              {selectLanguage(OTHERS.lives, language)} {userDetails.state || 'N/A'}
            </Text>
            {userDetails.status === 'ACTIVE' ? (
              <Text>online</Text>
            ) : (
              <Text>{getTimeAgo(new Date().getTime() - new Date(userDetails.updatedAt).getTime())}</Text>
            )}
          </View>
        </View>
      </View>

      <View
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
              <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.scrim} />
            </TouchableOpacity>
            {/* <IconButton icon={'chat-outline'} onPress={handleNavigateChat}></IconButton> */}
          </View>
        ) : null}
      </View>
      <ScrollView
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
          {USER_INFO_ONE.map((key, index) => {
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
        <View style={{ marginBottom: 16 }}>
          <View style={globalStyles.iconText}>
            <Text style={[globalStyles.mediumText, { marginBottom: 18, color: '#E71B73' }]}>Job Information</Text>
            {editable ? <IconButton icon="pencil-outline" onPress={handleJobInfoNavigate} /> : null}
          </View>
          {USER_INFO_TWO.map((key, index) => {
            return (
              <View key={index} style={styles.infoItem}>
                <Text style={styles.infoLabel}>{formatKeys(key.id, language)}</Text>
                <Text>{userDetails[key.id]}</Text>
              </View>
            );
          })}
        </View>
        <View style={{ marginBottom: 16 }}>
          <View style={globalStyles.iconText}>
            <Text style={[globalStyles.mediumText, { marginBottom: 18, color: '#E71B73' }]}>Education</Text>
            {editable ? <IconButton icon="pencil-outline" onPress={handleEduInfoNavigate} /> : null}
          </View>
          {USER_INFO_THREE.map((key, index) => {
            return (
              <View key={index} style={styles.infoItem}>
                <Text style={styles.infoLabel}>{formatKeys(key.id, language)}</Text>
                <Text>{userDetails[key.id]}</Text>
              </View>
            );
          })}
        </View>
        <View style={{ marginBottom: 16 }}>
          <View style={globalStyles.iconText}>
            <Text style={[globalStyles.mediumText, { marginBottom: 18, color: '#E71B73' }]}>Religious information</Text>
            {editable ? <IconButton icon="pencil-outline" onPress={handleReligiousInfoNavigate} /> : null}
          </View>
          {USER_INFO_THREE_part2.map((key, index) => {
            return (
              <View key={index} style={styles.infoItem}>
                <Text style={styles.infoLabel}>{formatKeys(key.id, language)}</Text>
                <Text>{userDetails[key.id]}</Text>
              </View>
            );
          })}
        </View>
        <View style={{ marginBottom: 16 }}>
          <View style={globalStyles.iconText}>
            <Text style={[globalStyles.mediumText, { marginBottom: 18, color: '#E71B73' }]}>Family Information</Text>
            {editable ? <IconButton icon="pencil-outline" onPress={handleFamilyInfoNavigate} /> : null}
          </View>
          {USER_INFO_FOUR.map((key, index) => {
            return (
              <View key={index} style={styles.infoItem}>
                <Text style={styles.infoLabel}>{formatKeys(key.id, language)}</Text>
                <Text>{userDetails[key.id]}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getAppThemeMode() === 'dark' ? DarkThemeColor.secondary : LightThemeColor.secondary,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: getAppThemeMode() === 'dark' ? DarkThemeColor.secondary : LightThemeColor.secondary,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  userInfoSectionTwo: {
    paddingLeft: 20,
    backgroundColor: getAppThemeMode() === 'dark' ? DarkThemeColor.secondary : LightThemeColor.secondary,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#E71B73',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#E71B73',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
    color: '#E71B73',
  },
  infoBoxWrapper: {
    flexDirection: 'row',
    height: 80,
    // backgroundColor: '#ecf0f1',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  infoBox: {
    alignItems: 'center',
  },
  menuWrapper: {
    marginTop: 10,
    padding: 20,
    backgroundColor: getAppThemeMode() === 'dark' ? DarkThemeColor.background : LightThemeColor.background,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
});

export default UserDetails;
