import { Chat, MessageType, defaultTheme } from '@flyerhq/react-native-chat-ui'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Image, Linking, Modal, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Appbar, Card, Paragraph, Title, Button, Avatar, useTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { socket, url } from '../../../config/config'
import AuthContext from '../../../contexts/authContext/authContext'
import { api } from '../../../utils/api'
import { globalStyles } from '../../../globalStyles/GlobalStyles'
import { getTimeAgo } from '../../../utils/commonFunction/lastSeen'

import { initiatePayment } from '../../../utils/commonFunction/paymentPage'
import { PAYMENT_PACKAGE_LIST } from '../../../constants/packages/paymentPackage'
import PaymentModal from '../paymentModal/PaymentModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ChatMenu } from './ChateMenu'


const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.floor(Math.random() * 16)
        const v = c === 'x' ? r : (r % 4) + 8
        return v.toString(16)
    })
}

const renderEmptyState = () => <Text style={{}}>Hey</Text>;

const ChatBoard = () => {
    const navigation = useNavigation<any>()
    const { user, setUser } = useContext(AuthContext);
    const [messages, setMessages] = useState<MessageType.Any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const route = useRoute<any>();
    const { userDetails, roomId, updatedAt } = route.params;
    const sender = { id: user?._id || "" };
    const [genderPayload, setGenderPayload] = useState<any>({
        male_user: "",
        female_user: ""
    });
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);


    const handleGenderPayload = useCallback(() => {
        if (user) {
            if (user.gender === "MALE") {
                setGenderPayload(Object.assign({}, genderPayload, { male_user: user._id, female_user: userDetails._id }))
            }
            else {
                setGenderPayload(Object.assign({}, genderPayload, { male_user: userDetails._id, female_user: user._id }))
            }
        }
    }, [user])

    const getPreviousChat = useCallback(async () => {
        const filter = {
            roomId: roomId
        }
        const chats = await api.chat.getChat(filter);
        const extractedMessages = chats.map((chat: { message: any }) => chat.message);
        setMessages(extractedMessages);
    }, [roomId])

    const addMessage = async (message: MessageType.Any) => {
        socket.emit('sendMessage', { ...genderPayload, roomId: roomId, message: message }, async (response: { status: string; error: any }) => {
            if (response.status === 'success') {
                // setMessages(prevMessages => [message, ...prevMessages]);
                console.log("msg len", messages.length);
                if (messages.length === 1) {
                    const filter = {
                        userObjectId: message.author.id
                    }
                    const response = await api.userDetails.getUserInfo(filter);
                    console.log("----->msg1 limit", response.message_limit);
                    setUser(response);
                }
            } else {
                // Handle error
                console.error('Failed to send message:', response.error);
            }
        });
    }


    const handleSendPress = async (message: MessageType.PartialText) => {
        // console.log("message", user?.message_limit);
        if (messages.length === 0) {
            if (user) {
                if (user.message_limit <= 0) {
                    const textMessage: MessageType.Text = {
                        author: sender,
                        createdAt: Date.now(),
                        id: sender.id + uuidv4(),
                        text: message.text,
                        type: 'text',
                        status: 'delivered'
                    }
                    const tranId = await AsyncStorage.getItem("@tran_id");
                    const msgLmt = await AsyncStorage.getItem("@msg_lmt");

                    if (tranId && msgLmt) {
                        try {
                            const userInstance = await api.payment.updateUserMessageLimit({
                                userObjectId: user._id,
                                message_limit: Number(msgLmt),
                                tran_id: tranId
                            });

                            AsyncStorage.removeItem("@tran_id");
                            AsyncStorage.removeItem("@msg_lmt");

                            if (userInstance.message_limit === 0) {
                                setModalVisible(true);
                            }
                            else {
                                setUser(userInstance)
                                addMessage(textMessage);
                                console.log("called-----|1|");
                                socket.emit('messageSeen', { roomId: roomId, messageId: textMessage.id, userId: sender.id });
                            }
                        } catch (error) {
                            console.log(error);
                            setModalVisible(true);
                        }
                    }
                    else {
                        setModalVisible(true);
                    }
                }
                else {
                    const textMessage: MessageType.Text = {
                        author: sender,
                        createdAt: Date.now(),
                        id: sender.id + uuidv4(),
                        text: message.text,
                        type: 'text',
                        status: 'delivered'
                    }
                    addMessage(textMessage);
                    console.log("called-----|2|");
                    socket.emit('messageSeen', { roomId: roomId, messageId: textMessage.id, userId: sender.id });
                    const updatedUser = { ...user, message_limit: user.message_limit - 1 };
                    setUser(updatedUser);
                }
            }
        }
        else {
            const textMessage: MessageType.Text = {
                author: sender,
                createdAt: Date.now(),
                id: sender.id + uuidv4(),
                text: message.text,
                type: 'text',
                status: 'delivered'
            }
            addMessage(textMessage);
            console.log("called-----|3|");
            socket.emit('messageSeen', { roomId: roomId, messageId: textMessage.id, userId: sender.id });
        }
    }

    const handlePaymentUpdate = async (package_number: number,) => {
        const tran_id = uuidv4().toString();
        await AsyncStorage.setItem("@tran_id", tran_id);
        await AsyncStorage.setItem("@msg_lmt", String(PAYMENT_PACKAGE_LIST[package_number].message_limit));
        const url = await initiatePayment(user, PAYMENT_PACKAGE_LIST[package_number], tran_id);
        if (url) {
            navigation.navigate("Payment",
                {
                    url: url,
                    tranId: tran_id,
                    message_limit: PAYMENT_PACKAGE_LIST[package_number].message_limit,
                    messages: messages
                }
            )
            setModalVisible(false);
        }
    }

    const handleGoBack = () => {
        // Navigate back to the previous screen
        navigation.goBack();
    };

    const handleRouteTouserDetails = () => {
        navigation.navigate('UserDetails', {
            userDetails: userDetails,
            editable: false,
            updatedAt: userDetails?.updatedAt
        })
    }

    // const handleSeen = () =>{
    //     set
    // }

    useEffect(() => {
        handleGenderPayload();
    }, [handleGenderPayload])

    useEffect(() => {
        getPreviousChat();
    }, [getPreviousChat])

    useEffect(() => {
        if (roomId !== "") {
            socket.emit('join', roomId);

            socket.on('receiveMessage', async (newMessage) => {
                setMessages(prevMessages => [newMessage, ...prevMessages]);
            });

            socket.on('messageSeen', async (seenMessage) => {
                const tempMessage = messages;
                tempMessage[tempMessage.length - 1].status = "seen";
                console.log("seen works===>", tempMessage[tempMessage.length - 1]);
                setMessages(tempMessage);
                console.log(`Message ID ${seenMessage.messageId} seen by user ${seenMessage.userId}`);
            });

            // Handle the event when a new user joins
            socket.on('newUserJoined', () => {
                // Emit an event to mark all messages as seen
                socket.emit('markAllMessagesAsSeen', { roomId: roomId });
            });
        }

        return () => {
            socket.off('receiveMessage');
            socket.off('messageSeen');
            socket.off('newUserJoined');
        };
    }, [roomId]);


    return (
        // Remove this provider if already registered elsewhere
        // or you have React Navigation set up
        <SafeAreaProvider>
            <Appbar.Header style={{
                backgroundColor: '#fff5f9', shadowColor: '#000000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
            }}>
                <Appbar.BackAction onPress={handleGoBack} />
                <View >
                    <TouchableOpacity onPress={handleRouteTouserDetails}>
                        <Avatar.Image size={40} source={{ uri: userDetails.profile_image_url }} />
                        {
                            userDetails.status === "ACTIVE" ?
                                <View style={globalStyles.onlineDot} /> :
                                <View style={globalStyles.offlineDot} />
                        }
                    </TouchableOpacity>
                </View>

                <View >
                    <Text style={{ fontSize: 18, textAlign: 'left', marginLeft: 7 }}>{userDetails.full_name?.split(' ')[0]}</Text>
                    <Text style={{ fontSize: 10, textAlign: 'left', marginLeft: 10 }}>
                        {userDetails.status === "ACTIVE" ? "(Online)" : `Offline ${getTimeAgo(new Date().getTime() - new Date(updatedAt).getTime())}`}
                    </Text>
                </View>

                <Appbar.Content title={``} titleStyle={{ fontSize: 18, textAlign: 'left', marginLeft: 7 }} />

                {/* <Appbar.Action icon="dots-vertical" onPress={openMenu} /> */}
                <ChatMenu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
                    options={[
                        { title: 'Block', onPress: () => console.log('Option 1 selected'),icon:"block-helper" },
                        { title: 'Report', onPress: () => console.log('Option 2 selected'),icon:"flag" }
                    ]}
                    style={{ backgroundColor: '#fff5f9' }} 
                />

            </Appbar.Header>
            <Chat
                theme={{
                    ...defaultTheme,
                    colors: { ...defaultTheme.colors, primary: "#E71B73", inputBackground: "#ffdefb", inputText: "rgb(0, 0, 0)" },
                }}
                locale='en'
                emptyState={renderEmptyState}
                messages={messages}
                onSendPress={handleSendPress}
                user={sender}
            />
            <PaymentModal modalVisible={modalVisible} setModalVisible={setModalVisible} styles={styles} handlePaymentUpdate={handlePaymentUpdate} name={userDetails.full_name} />
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    subscriptionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    subscriptionCard: {
        flex: 1,
        marginRight: 10,
        height: 170,
        marginLeft: 6

    },
    specialBuyCard: {
        marginVertical: 20,

    },
    buyButton: {
        marginTop: 10,
    },
});

export default ChatBoard