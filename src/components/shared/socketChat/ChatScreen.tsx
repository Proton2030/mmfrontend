import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import io from 'socket.io-client';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTimeAgo } from '../../../utils/commonFunction/lastSeen';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import AuthContext from '../../../contexts/authContext/authContext';
import { SubscriptionPage } from '../../screens/subscriptionPage/SubscriptionPage';
import { socket } from '../../../config/config';

// const socket = io('http://192.168.127.155:9999');

const PersonalChatPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const route = useRoute<any>();
  let { userDetails, roomId, updatedAt, blocked_by_male_user, blocked_by_female_user } = route.params;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<any>();

  const disconnectUser = () => {
    socket.emit('disconnectUser', user?._id);
  };

  const hadnlenavigate = () => {
    navigation.goBack();
    disconnectUser();
  };

  useEffect(() => {
    socket.emit('joinRoom', roomId);

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socket.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages);
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages): any => [...prevMessages, message]);
    });

    return () => {
      socket.off('connect');
      socket.off('receiveMessage');
      socket.off('previousMessages');
    };
  }, [roomId]);

  const sendMessage = () => {
    if (messages.length <= 0 && user && user.message_limit <= 0) {
      openModal();
    } else {
      if (text.trim()) {
        const female = user?.gender === 'FEMALE' ? user?._id : userDetails?._id;
        const male = user?.gender === 'MALE' ? user?._id : userDetails?._id;
        console.log(male);
        console.log(female);
        const message = {
          roomId,
          text,
          sender: user?._id,
          female_user: female,
          male_user: male,
        };
        socket.emit('sendMessage', message);
        setText('');
      }
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={hadnlenavigate}>
            <FeatherIcon name="arrow-left" size={24} color="#000" style={styles.backArrow} />
          </TouchableOpacity>
          {userDetails?.profile_image_url ? (
            <View>
              <Image
                alt=""
                resizeMode="cover"
                source={{ uri: userDetails?.profile_image_url }}
                style={styles.cardImg}
              />
              {userDetails.status === 'ACTIVE' ? (
                <View style={globalStyles.onlineDot} />
              ) : (
                <View style={globalStyles.offlineDot} />
              )}
            </View>
          ) : (
            <View style={[styles.cardImg, styles.cardAvatar]}>
              {/* <Text style={styles.cardAvatarText}>{name[0]}</Text> */}
            </View>
          )}
          <Text style={styles.userName}> {userDetails.full_name?.split(' ')[0]}</Text>

          <Text style={{ fontSize: 10, textAlign: 'left', marginLeft: 4, color: 'gray', alignItems: 'flex-end' }}>
            {userDetails.status === 'ACTIVE'
              ? '(Online)'
              : `Offline ${getTimeAgo(new Date().getTime() - new Date(updatedAt).getTime())}`}
          </Text>
        </View>
        <TouchableOpacity>
          <FeatherIcon name="more-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.messageList}>
        {messages.map((message: any, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              message.sender === user?._id ? styles.myMessageContainer : styles.theirMessageContainer,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.sender === user?._id ? styles.myMessageBubble : styles.theirMessageBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.sender === user?._id ? styles.myMessageText : styles.theirMessageText,
                ]}
              >
                {message.text}
              </Text>
            </View>
            {/* <Text style={{textAlign:"right",fontSize:11}}>{formatDate(message?.timestamp)}</Text> */}
            {message.sender === user?._id && message.seenBySender === true && (
              <View
                style={{
                  flexDirection: 'row',
                  width: 50,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  marginLeft: 'auto',
                }}
              >
                <Ionicons name="checkmark-done" color={COLORS.primary} size={18} />
                <Text style={{ color: 'black', fontSize: 12 }}>Seen</Text>
              </View>
            )}
          </View>
        ))}
        <View style={{ height: 50 }}></View>
      </ScrollView>
      {blocked_by_male_user || blocked_by_female_user ? null : (
        <View style={styles.inputContainer}>
          <TextInput value={text} onChangeText={setText} style={styles.input} placeholder="Type a message..." />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.bottomSheet}>
            <SubscriptionPage />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PersonalChatPage;
