import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Avatar, IconButton, useTheme } from 'react-native-paper';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { IUserCardProps } from '../../../@types/props/UserCardProps.types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import AuthContext from '../../../contexts/authContext/authContext';
import { useNavigation } from '@react-navigation/native';
import { getTimeAgo } from '../../../utils/commonFunction/lastSeen';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import { playSound } from '../../../utils/commonFunction/playSound';
import { selectLanguage } from '../../../utils/commonFunction/languageSelect';
import { OTHERS } from '../../../constants/texts/others/Others';
import UiContext from '../../../contexts/uiContext/UIContext';
import ChoiceContext from '../../../contexts/choiceContext/choiceContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { profileComplete } from '../../../utils/services/profilecomplete/profileComplete';
// import { refreshSound } from '../../../assets'

const UserCard = React.memo(({ userDetails, addChoice, mode }: IUserCardProps) => {
  const [choice, setChoice] = useState<boolean>(false);
  const {
    ui: { language },
  } = useContext(UiContext);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);
  const { dispatch, state } = useContext(ChoiceContext);
  const isProfileComplete = profileComplete();

  const handleRouteTouserDetails = () => {
    navigation.navigate('UserDetails', {
      userDetails: userDetails,
      editable: false,
      updatedAt: userDetails?.updatedAt,
      Userchoice: choice,
    });
  };

  function capitalizeFirstLetter(text: any) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  const handleNavigateChat = () => {
    let roomId = '';

    if (isProfileComplete) {
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
          updatedAt: userDetails?.updatedAt,
        });
      }
    } else {
      navigation.navigate('LockPage');
    }
  };

  const handleAddChoice = useCallback(
    () => {
      setChoice((prev) => !prev);
      if (user?._id && userDetails._id) {
        console.log('called');
        try {
          // playSound(refreshSound)
          console.log('===>called');
          addChoice(user._id, userDetails._id);
        } catch (err) {
          console.log('error', err);
        }
      }
    }, // Adjust the debounce delay as needed
    [user, setChoice],
  );

  useEffect(() => {
    if (mode === 'CHOICE') {
      setChoice(true);
    }
  }, []);

  return (
    <View
      style={{
        marginTop: 40,
        paddingBottom: 20,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: colors.surfaceDisabled,
      }}
    >
      <TouchableOpacity onPress={handleRouteTouserDetails}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 10,
            paddingLeft: 10,
            marginBottom: 15,
          }}
        >
          <View style={globalStyles.avatarContainer}>
            <Avatar.Image size={45} source={{ uri: userDetails?.profile_image_url }} />
            {userDetails?.status === 'ACTIVE' ? (
              <View style={globalStyles.onlineDot} />
            ) : (
              <View style={globalStyles.offlineDot} />
            )}
          </View>
          <View style={{ display: 'flex', width: '100%' }}>
            <Text style={{ color: '#E71B73', fontSize: 18, fontWeight: 'bold' }}>
              {userDetails?.full_name || 'Test Account'}
              <Text style={{ color: colors.scrim, fontSize: 15 }}>&nbsp;({userDetails?.age} yrs)</Text>
            </Text>
            <View style={globalStyles.iconText}>
              <Ionicons name="location-sharp" size={16} color="#E71B73" />
              <View style={{ display: 'flex', flexDirection: 'row', columnGap: 20 }}>
                <Text style={{ color: colors.scrim, fontSize: 14 }}>
                  {selectLanguage(OTHERS.lives, language)} {userDetails?.state || 'N/A'}
                </Text>
                {userDetails?.status === 'ACTIVE' ? (
                  <Text style={{ color: colors.tertiary }}>online</Text>
                ) : (
                  <Text style={{ color: colors.tertiary }}>Active {getTimeAgo(new Date().getTime() - new Date(userDetails?.updatedAt).getTime())}</Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View>
          <FastImage source={{ uri: userDetails?.profile_image_url || '' }} style={globalStyles.cardImage} />
        </View>
      </TouchableOpacity>
      <View style={{ display: 'flex', flexDirection: 'row', columnGap: 15, paddingLeft: 10, marginTop: 10 }}>
        <View style={globalStyles.iconText}>
          <MaterialCommunityIcons name="human-male-height" size={18} color="#E71B73" />
          <Text style={{ color: colors.tertiary }}>{userDetails?.height} ft</Text>
        </View>
        <View style={globalStyles.iconText}>
          <MaterialCommunityIcons name="weight-kilogram" size={18} color="#E71B73" />
          <Text style={{ color: colors.tertiary }}>{userDetails?.weight} kg</Text>
        </View>
        <View style={globalStyles.iconText}>
          <MaterialCommunityIcons name="ring" size={18} color="#E71B73" />
          <Text style={{ color: colors.tertiary }}>{capitalizeFirstLetter(userDetails?.marital_status)}</Text>
        </View>
        <View style={globalStyles.iconText}>
          <Ionicons name="body" size={18} color="#E71B73" />
          <Text style={{ color: colors.tertiary }}>{capitalizeFirstLetter(userDetails?.body_color)}</Text>
        </View>
      </View>

      <View
        style={{ display: 'flex', flexDirection: 'row', marginTop: 20, alignItems: 'center', gap: 15, paddingLeft: 20 }}
      >
        {/* <IconButton
          icon={choice ? 'heart' : 'heart-outline'}
          onPress={handleAddChoice}
          iconColor={choice ? 'red' : colors.scrim}
        ></IconButton> */}
        <TouchableOpacity onPress={handleAddChoice} style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          {choice ? (
            <Ionicons name="heart" size={25} color={colors.primary} />
          ) : (
            <Ionicons name="heart-outline" size={25} color={colors.tertiary} />
          )}
          {/* <Text>Like</Text> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigateChat} style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color={colors.tertiary} />
          {/* <Text>Chat</Text> */}
        </TouchableOpacity>
        {/* <IconButton icon={'chat-outline'} onPress={handleNavigateChat}></IconButton> */}
      </View>
    </View>
  );
});

export default UserCard;
