import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, Modal, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import io from 'socket.io-client';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { getTimeAgo } from '../../../utils/commonFunction/lastSeen';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import AuthContext from '../../../contexts/authContext/authContext';
import { SubscriptionPage } from '../../screens/subscriptionPage/SubscriptionPage';
import { socket } from '../../../config/config';
import Bubble from './bubble/Bubble';
import { useTheme } from 'react-native-paper';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { uuidv4 } from '../../../utils/commonFunction/uuiv4';

const PersonalChatPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const route = useRoute<any>();
  let { userDetails, roomId, updatedAt, blocked_by_male_user, blocked_by_female_user } = route.params;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const scrollViewRef = useRef<FlatList>(null);
  const [userCount, setUserCount] = useState(0);

  const disconnectUser = () => {
    socket.emit('disconnectUser', user?._id, roomId);
  };

  const hadnlenavigate = () => {
    disconnectUser();
    console.log(user?._id);
    navigation.goBack();
  };

  useEffect(() => {
    socket.on('userCountUpdate', ({ userCount }) => {
      console.log('User count in the room:', userCount);
      setUserCount(userCount);
      // You can update the state here to display userCount in the UI
    });

    return () => {
      socket.off('userCountUpdate');
    };
  }, []);

  useEffect(() => {
    socket.emit('joinRoom', roomId, user?._id);

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socket.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages);
      setLoading(false);
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages): any => [...prevMessages, message]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      socket.off('connect');
      socket.off('receiveMessage');
      socket.off('previousMessages');
    };
  }, [roomId]);

  // useEffect(() => {
  //     socket.emit('disconnect');
  // }, [roomId])

  const sendMessage = () => {
    if (false) {
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
        console.log('User count in the room:', userCount);
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
  const handleGesture = (event: any) => {
    if (event.nativeEvent.translationY > 100) {
      closeModal();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surfaceVariant }]}>
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.secondary }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={hadnlenavigate}>
            <FeatherIcon name="arrow-left" size={24} color={colors.scrim} style={styles.backArrow} />
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
          <Text style={[styles.userName, { color: colors.scrim }]}> {userDetails.full_name?.split(' ')[0]}</Text>

          <Text style={{ fontSize: 10, textAlign: 'left', marginLeft: 4, color: 'gray', alignItems: 'flex-end' }}>
            {userDetails.status === 'ACTIVE'
              ? '(Online)'
              : `Offline ${getTimeAgo(new Date().getTime() - new Date(updatedAt).getTime())}`}
          </Text>
        </View>
        <TouchableOpacity>
          <FeatherIcon name="more-vertical" size={24} color={colors.scrim} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 10, backgroundColor: colors.surfaceVariant }}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
        renderItem={({ item, index }) => <Bubble message={item} userId={user?._id || ''} userCount={userCount} />}
        keyExtractor={(_, index) => index.toString()}
      />

      {blocked_by_male_user || blocked_by_female_user ? null : (
        <View style={[styles.inputContainer, { backgroundColor: colors.background, borderColor: 'transparent' }]}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={[styles.input, { color: colors.scrim, borderColor: colors.tertiary }]}
            placeholderTextColor={colors.scrim}
            placeholder="Type a message..."
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <View style={styles.modalContainer}>
            <View style={styles.bottomSheet}>
              <SubscriptionPage closeModal={closeModal} />
            </View>
          </View>
        </PanGestureHandler>
      </Modal>
    </SafeAreaView>
  );
};

export default PersonalChatPage;
