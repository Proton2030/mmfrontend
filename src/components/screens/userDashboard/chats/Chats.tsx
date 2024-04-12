import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Appbar, Avatar, Text, useTheme } from 'react-native-paper';
import { api } from '../../../../utils/api';
import AuthContext from '../../../../contexts/authContext/authContext';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { IUserDetails } from '../../../../@types/types/userDEtails.types';
import { ActivityIndicator } from 'react-native';
import { MessageSeenCountContext } from '../../../../contexts/messageSeenContext/MessageSeenCountContextProvider';
import { socket } from '../../../../config/config';

const Chats = () => {
  const { colors } = useTheme();
  const { user } = useContext(AuthContext);
  const { messageSeenCount, setMessageSeenCount } = useContext(MessageSeenCountContext);
  const [chatList, setChatList] = useState<any[]>([]);
  const navigation = useNavigation<any>();
  const [isloading, setisloading] = useState(false);

  const getChatList = useCallback(async () => {
    if (user) {
      const payload = {
        userObjectId: user._id,
        gender: user?.gender,
      };
      setisloading(false);
      const chatListResponse = await api.chat.getChatList(payload);
      console.log('=====>response', chatListResponse[0].lastMessage);
      setChatList(chatListResponse);
      setisloading(true);
    }
  }, [user]);

  const handleRouteChat = (
    userDetails: IUserDetails,
    roomId: string,
    blocked_by_male_user: boolean,
    blocked_by_female_user: boolean,
    index: number,
  ) => {
    const tempChatList = chatList;
    if (tempChatList[index].lastMessage.message.status !== 'seen') {
      setMessageSeenCount((prevCount) => Math.max(prevCount - 1, 0));
      tempChatList[index].lastMessage.message.status = 'seen';
    }
    setChatList(tempChatList);

    socket.emit('seenMessage', { authorId: user?._id, roomId: roomId });
    // item.lastMessage.message.status = "seen";
    navigation.navigate('Chat', {
      userDetails: userDetails,
      roomId: roomId,
      updatedAt: userDetails?.updatedAt,
      blocked_by_male_user: blocked_by_male_user,
      blocked_by_female_user: blocked_by_female_user,
    });
  };

  useEffect(() => {
    getChatList();
  }, [getChatList]);

  const RenderChatItem = ({ item, userDetails, index }: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.chatItem}
      onPress={() =>
        handleRouteChat(userDetails, item.roomId, item.blocked_by_male_user, item.blocked_by_female_user, index)
      }
    >
      <View style={styles.avatarContainer}>
        <Avatar.Image size={50} source={{ uri: userDetails?.profile_image_url }} />
        {userDetails?.status === 'ACTIVE' ? (
          <View style={globalStyles?.onlineDot} />
        ) : (
          <View style={globalStyles?.offlineDot} />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={item.lastMessage.message.status !== 'seen' ? [styles.name, { color: '#E71B73' }] : styles.name}>
          {userDetails?.full_name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={
            item.lastMessage.message.author.id !== user?._id && item.lastMessage.message.status !== 'seen'
              ? { fontWeight: 'bold' }
              : styles?.message
          }
        >
          {item.lastMessage.message.text}
        </Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: colors.secondary,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Appbar.Content title="Chats" />
        <Appbar.Action icon="magnify" />
      </Appbar.Header>
      {isloading ? (
        <ScrollView contentContainerStyle={styles.container}>
          {chatList.map((chat, index) => (
            <RenderChatItem
              item={chat}
              index={index}
              userDetails={user?.gender === 'MALE' ? chat.female_user_details : chat.male_user_details}
              key={index}
            />
          ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#E71B73" style={{ marginTop: 80 }} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  avatarContainer: {
    position: 'relative',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50', // Green color
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#777',
  },
});

export default Chats;
