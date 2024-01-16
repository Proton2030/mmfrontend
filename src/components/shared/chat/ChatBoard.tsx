import { Chat, MessageType, defaultTheme } from '@flyerhq/react-native-chat-ui'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Image, Linking, Modal, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Appbar, Card, Paragraph, Title, Button, Avatar } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import io from 'socket.io-client';
import { socket, url } from '../../../config/config'
import AuthContext from '../../../contexts/authContext/authContext'
import { api } from '../../../utils/api'
import { globalStyles } from '../../../globalStyles/GlobalStyles'
import { getTimeAgo } from '../../../utils/commonFunction/lastSeen'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import { initiatePayment } from '../../../utils/commonFunction/paymentPage'

const Stack = createStackNavigator();

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.floor(Math.random() * 16)
        const v = c === 'x' ? r : (r % 4) + 8
        return v.toString(16)
    })
}

const renderEmptyState = () => <Text style={{}}>Hey</Text>;

const ChatBoard = () => {

    const { user, setUser } = useContext(AuthContext);
    const [messages, setMessages] = useState<MessageType.Any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [useronline, setUseronline] = useState<boolean>(false)
    const route = useRoute<any>();
    const { profile_image, status, name, roomId, userId, updatedAt } = route.params;
    const sender = { id: user?._id || "" };
    const [genderPayload, setGenderPayload] = useState<any>({
        male_user: "",
        female_user: ""
    });
    const navigation = useNavigation();

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
        if (messages.length === 0 && user?.message_limit === 0) {
            setModalVisible(true);
        } else {
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

    const handlePaymentUpdate = async () => {
        // await initiatePayment();
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
                    colors: { ...defaultTheme.colors, primary: "#E71B73", inputBackground: "#ffdefb", inputText: "black" }
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
                                    <Text>Low Price</Text>
                                    <Text>500৳</Text>
                                </View>

                                <Button onPress={handlePaymentUpdate}>Choose</Button>

                            </Card>

                            <Card style={styles.subscriptionCard}>
                                <View style={{ padding: 5, display: 'flex' }}><Avatar.Icon icon="star" size={20} />
                                    <Text>Mideum Package</Text>
                                    <Text>1000৳</Text>
                                </View>

                                <Button>Choose</Button>

                            </Card>

                            <Card style={styles.subscriptionCard}>
                                <View style={{ padding: 5, display: 'flex' }}><Avatar.Icon icon="star" size={20} />
                                    <Text>High Package</Text>
                                    <Text>2000৳</Text>
                                </View>

                                <Button>Choose</Button>

                            </Card>
                        </View>

                        {/* Special Buy Card */}
                        <Card style={styles.specialBuyCard}>
                            <Card.Title title="Special Offer" subtitle="Only 150/-   Only for this time!" left={(props) => <Avatar.Icon {...props} icon="sale" />} />

                            <Card.Content>
                                <Paragraph>Unlock all features for a limited time</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.buyButton}>
                                    Buy Now
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
        padding: 5
    },
    subscriptionCard: {
        flex: 1,
        marginRight: 10,
    },
    specialBuyCard: {
        marginVertical: 20,
    },
    buyButton: {
        marginTop: 10,
    },
});

export default ChatBoard