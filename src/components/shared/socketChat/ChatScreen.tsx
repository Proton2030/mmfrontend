import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, Modal, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import io from 'socket.io-client';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

import { SafeAreaView } from 'react-native-safe-area-context';
import { SubscriptionPage } from '../../screens/subscriptionPage/SubscriptionPage';
import { socket } from '../../../config/config';
import Bubble from './bubble/Bubble';
import { useTheme } from 'react-native-paper';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import ChatHeader from './chatHeader/ChatHeader';
import AuthContext from '../../../contexts/authContext/authContext';
import ChatReportModal from '../chatReport/ChatReportModal';
import { encryptText } from '../../../utils/commonFunction/encryptText';

const PersonalChatPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const route = useRoute<any>();
  let { userDetails, roomId, updatedAt, blocked_by_male_user, blocked_by_female_user } = route.params;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const scrollViewRef = useRef<FlatList>(null);
  const [userCount, setUserCount] = useState(0);

  const [blockedByme, setBlockedByme] = useState(false);
  const [blockedBysender, setBlockedBysender] = useState(false);

  const disconnectUser = () => {
    socket.emit('disconnectUser', user?._id, roomId);
  };

  const hadnlenavigate = () => {
    disconnectUser();
    console.log(user?._id);
    navigation.goBack();
  };
  const blockUser = async () => {
    await socket.emit('block', {
      roomId,
      userId: user?._id,
      status: true,
      gender: user?.gender,
      blockedto: userDetails?._id,
    });
    setModal2Visible(false);
    setBlockedByme(true);
  };

  const unblockUser = async () => {
    await socket.emit('block', {
      roomId,
      userId: user?._id,
      status: false,
      gender: user?.gender,
      blockedto: userDetails?._id,
    });
    setModal2Visible(false);
    setBlockedByme(false);
  };

  const handleNavigateToReport = () => {
    closeModal2();
    navigation.navigate('AccountReport', {
      userDetails: userDetails,
      roomId: roomId,
    });
  };
  useEffect(() => {
    socket.on('userCountUpdate', ({ userCount }: any) => {
      console.log('User count in the room:', userCount);
      setUserCount(userCount);
      // You can update the state here to display userCount in the UI
    });

    return () => {
      socket.off('userCountUpdate');
    };
  }, []);

  useEffect(() => {
    socket.on('block', (data: any) => {
      const { userId, is_blocked, gender } = data;
      console.log(is_blocked)
      if (userId === user?._id) {
        setBlockedByme(is_blocked);
        // console.log("I blocked", userId, is_blocked, user?.full_name)
        console.log("blocked from ", user?.full_name, blockedByme, is_blocked)
      } else {
        setBlockedBysender(is_blocked);
        // console.log("sender blocked", userId, is_blocked, user?.full_name)
        // console.log("blocked from sender", user?.full_name, blockedBysender, is_blocked)
      }
    });

    return () => {
      socket.off('block');
    };
  }, [socket, user, blockedByme, blockedBysender]);


  useEffect(() => {
    console.log('room status', blocked_by_female_user, blocked_by_male_user);
    if (user?.gender === 'MALE' && blocked_by_male_user) {
      setBlockedByme(true);
      console.log('BlockedByme');
    }
    if (user?.gender === 'FEMALE' && blocked_by_female_user) {
      setBlockedByme(true);
      console.log('BlockedByme');
    }
    if (user?.gender === 'FEMALE' && blocked_by_male_user) {
      setBlockedBysender(true);
      console.log('BlockedBysender');
    }
    if (user?.gender === 'MALE' && blocked_by_female_user) {
      setBlockedBysender(true);
      console.log('BlockedBysender');
    }
  }, []);

  useEffect(() => {
    socket.emit('joinRoom', roomId, user?._id);

    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });

    socket.on('previousMessages', (previousMessages: any) => {
      setMessages(previousMessages);
      setLoading(false);
    });

    socket.on('receiveMessage', (message: any) => {
      console.log('===>recieve message called');
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
          text: encryptText(text),
          sender: user?._id,
          female_user: female,
          male_user: male,
        };
        socket.emit('sendMessage', message);
        console.log('User count in the room:', userCount);
        if (messages.length <= 0) {
          if (user?.message_limit) {
            setUser({
              ...user,
              message_limit: user.message_limit - 1,
            });
          }
        }
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

  const openModal2 = () => {
    setModal2Visible(true);
  };

  const closeModal2 = () => {
    setModal2Visible(false);
  };
  const handleGesture = (event: any) => {
    if (event.nativeEvent.translationY > 100) {
      closeModal();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surfaceVariant }]}>
      <ChatHeader
        hadnlenavigate={hadnlenavigate}
        userDetails={userDetails}
        updatedAt={updatedAt}
        toggleMenu={openModal2}
        iconRef={null}
      />
      {/* <TouchableOpacity onPress={blockedByme ? unblockUser : blockUser} style={{ backgroundColor: "red", height: 100, width: 100 }}>
        {
          blockedByme ? (
            <Text>Unblock</Text>
          ) : (
            <Text>Block</Text>
          )
        }

      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToReport} style={{ backgroundColor: "red", height: 100, width: 100 }}>
        <Text>Report</Text>
      </TouchableOpacity> */}
      <FlatList
        data={messages}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingHorizontal: 10, backgroundColor: colors.surfaceVariant }}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
        renderItem={({ item, index }) => <Bubble message={item} userId={user?._id || ''} userCount={userCount} />}
        keyExtractor={(_, index) => index.toString()}
      />

      {blockedByme || blockedBysender ? null : (
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

      <Modal animationType="slide" transparent={true} visible={modal2Visible} onRequestClose={closeModal2}>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <View style={[styles.modalContainer]}>
            <View
              style={[
                styles.bottomSheet,
                {
                  height: 200,
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                },
              ]}
            >
              <ChatReportModal
                userDetails={userDetails}
                blockAction={blockedByme ? unblockUser : blockUser}
                reportAction={handleNavigateToReport}
                blockedBysender={blockedByme ? null : blockedBysender}
                blockStatus={blockedByme ? (
                  "Unblock"
                ) : (
                  " Block"
                )} />
            </View>
          </View>
        </PanGestureHandler>
      </Modal>
    </SafeAreaView>
  );
};

export default PersonalChatPage;
