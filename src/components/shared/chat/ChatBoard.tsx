import { Chat, MessageType, defaultTheme } from '@flyerhq/react-native-chat-ui'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Image, Linking, Modal, StyleSheet, Text, View } from 'react-native'
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
// import { initiatePayment } from '../../../utils/commonFunction/paymentPage'


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
    const [inputMessage, setInputMessage] = useState<MessageType.PartialText | null>(null);
    const route = useRoute<any>();
    const { profile_image, status, name, roomId, userId, updatedAt } = route.params;
    const sender = { id: user?._id || "" };
    const [genderPayload, setGenderPayload] = useState<any>({
        male_user: "",
        female_user: ""
    });

    const handleGenderPayload = useCallback(() => {
        if (user) {
            if (user.gender === "MALE") {
                setGenderPayload(Object.assign({}, genderPayload, { male_user: user._id, female_user: userId }))
            }
            else {
                setGenderPayload(Object.assign({}, genderPayload, { male_user: userId, female_user: user._id }))
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
        console.log("message", user?.message_limit);
        if (messages.length === 0) {
            if (user) {

                const filter = {
                    userObjectId: user._id
                }
                const response = await api.userDetails.getUserInfo(filter);
                setUser(response);
                if (response.message_limit <= 0) {
                    setInputMessage(message);
                    setModalVisible(true);
                }
                else {
                    const textMessage: MessageType.Text = {
                        author: sender,
                        createdAt: Date.now(),
                        id: sender.id + uuidv4(),
                        text: message.text,
                        type: 'text',
                    }
                    addMessage(textMessage);
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
            }
            addMessage(textMessage);
        }

    }

    const handlePaymentUpdate = async (Package_number: number,) => {
        const tran_id = uuidv4().toString();
        const url = await initiatePayment(user, PAYMENT_PACKAGE_LIST[Package_number], tran_id);
        if (url) {
            navigation.navigate("Payment",
                {
                    url: url,
                    tranId: tran_id,
                    message_limit: PAYMENT_PACKAGE_LIST[Package_number].message_limit
                }
            )
            setModalVisible(false);
        }
    }

    const handleGoBack = () => {
        // Navigate back to the previous screen
        navigation.goBack();
    };

    useEffect(() => {
        handleGenderPayload();
    }, [handleGenderPayload])

    useEffect(() => {
        getPreviousChat();
    }, [getPreviousChat])

    // useEffect(() => {
    //     if (user && user.message_limit === 1) {
    //         if (inputMessage) {
    //             handleSendPress(inputMessage);
    //         }
    //     }
    // }, []);

    console.log("----->msg lmt", user?.message_limit);

    useEffect(() => {
        if (roomId !== "") {

            socket.emit('join', roomId);  // Replace 'roomId' with a unique room ID or user ID.
            socket.on('receiveMessage', async (newMessage) => {
                setMessages(prevMessages => [newMessage, ...prevMessages]);
                // const filter = {
                //     userObjectId: newMessage.author.id
                // }
                // const response = await api.userDetails.getUserInfo(filter);
                // console.log("----->msg1 limit", response.message_limit);
                // setUser(response);
            });
        }
        return () => {
            socket.off('receiveMessage');
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
                    <Avatar.Image size={40} source={{ uri: profile_image }} />
                    {
                        status === "ACTIVE" ?
                            <View style={globalStyles.onlineDot} /> :
                            <View style={globalStyles.offlineDot} />
                    }

                </View>

                <View >
                    <Text style={{ fontSize: 18, textAlign: 'left', marginLeft: 7 }}>{name?.split(' ')[0]}</Text>
                    <Text style={{ fontSize: 10, textAlign: 'left', marginLeft: 10 }}>
                        {status === "ACTIVE" ? "(Online)" : `Offline ${getTimeAgo(new Date().getTime() - new Date(updatedAt).getTime())}`}
                    </Text>
                </View>


                <Appbar.Content title={``} titleStyle={{ fontSize: 18, textAlign: 'left', marginLeft: 7 }} />

                <Appbar.Action icon="dots-vertical" />
            </Appbar.Header>
            <Chat
                theme={{
                    ...defaultTheme,
                    colors: { ...defaultTheme.colors, primary: "#E71B73", inputBackground: "#ffdefb", inputText: "black" },
                }}
                locale='en'
                emptyState={renderEmptyState}
                messages={messages}
                onSendPress={handleSendPress}
                user={sender}
            />
            <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Title>Choose a Subscription</Title>
                        <View style={styles.subscriptionRow}>
                            <Card style={styles.subscriptionCard}>
                                <View style={{ padding: 5, display: 'flex' }}><Avatar.Icon icon="star" size={20} />
                                    <Text style={{ fontWeight: 'bold' }}>Low Package</Text>
                                </View>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>&nbsp;500৳</Text>
                                <Text style={{ fontSize: 12 }}>&nbsp;5 persons</Text>

                                <Button style={{ marginTop: 20 }} mode="contained" onPress={() => handlePaymentUpdate(0)}>pay</Button>

                            </Card>

                            <Card style={styles.subscriptionCard}>
                                <View style={{ padding: 5, display: 'flex' }}><Avatar.Icon icon="star" size={20} />
                                    <Text style={{ fontWeight: 'bold' }}>Medium Package</Text>

                                </View>

                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>&nbsp;1000৳</Text>
                                <Text style={{ fontSize: 12 }}>&nbsp;10 persons</Text>

                                <Button style={{ marginTop: 20 }} mode="contained" onPress={() => handlePaymentUpdate(0)}>pay</Button>


                            </Card>

                            <Card style={styles.subscriptionCard}>
                                <View style={{ padding: 5, display: 'flex' }}><Avatar.Icon icon="star" size={20} />
                                    <Text style={{ fontWeight: 'bold' }}>High Package</Text>

                                </View>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>&nbsp;2000৳</Text>
                                <Text style={{ fontSize: 12 }}>&nbsp;20 persons</Text>

                                <Button style={{ marginTop: 20 }} mode="contained" onPress={() => handlePaymentUpdate(0)}>pay</Button>

                            </Card>
                        </View>

                        {/* Special Buy Card */}
                        <Card style={styles.specialBuyCard}>
                            <Card.Title title="Special Offer" subtitle="Only 150৳-   " left={(props) => <Avatar.Icon {...props} icon="sale" />} />
                            <Card.Content>
                                <Paragraph> chat with {name?.split(' ')[0]}! &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button mode="contained" onPress={() => handlePaymentUpdate(3)} style={styles.buyButton}>
                                    Pay Now
                                </Button>
                            </Card.Actions>
                        </Card>
                        <Button onPress={() => setModalVisible(false)} >Close</Button>
                    </View>
                </View>
            </Modal>
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
        padding: 7,
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