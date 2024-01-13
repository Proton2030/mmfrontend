import { Chat, MessageType, defaultTheme } from '@flyerhq/react-native-chat-ui'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Image, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import io from 'socket.io-client';
import { socket, url } from '../../../config/config'
import AuthContext from '../../../contexts/authContext/authContext'
import { api } from '../../../utils/api'


const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.floor(Math.random() * 16)
        const v = c === 'x' ? r : (r % 4) + 8
        return v.toString(16)
    })
}

const renderEmptyState = () => <Text style={{}}>Hey</Text>;

const ChatBoard = () => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState<MessageType.Any[]>([]);
    const route = useRoute<any>();
    const { profile_image, name, roomId, userId } = route.params;
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

    const addMessage = (message: MessageType.Any) => {
        console.log("call add") // Replace with the room ID you want to send a message to.
        socket.emit('sendMessage', { ...genderPayload, roomId: roomId, message: message }, (response: { status: string; error: any }) => {
            if (response.status === 'success') {
                setMessages(prevMessages => [message, ...prevMessages]);
            } else {
                // Handle error
                console.error('Failed to send message:', response.error);
            }
        });
    }

    const handleSendPress = (message: MessageType.PartialText) => {
        const textMessage: MessageType.Text = {
            author: sender,
            createdAt: Date.now(),
            id: sender.id + uuidv4(),
            text: message.text,
            type: 'text',
        }
        addMessage(textMessage)
    }

    useEffect(() => {
        handleGenderPayload();
    }, [handleGenderPayload])

    useEffect(() => {
        getPreviousChat();
    }, [getPreviousChat])

    useEffect(() => {
        if (roomId !== "") {
            socket.emit('join', roomId);  // Replace 'roomId' with a unique room ID or user ID.
            socket.on('receiveMessage', (newMessage) => {
                setMessages(prevMessages => [newMessage, ...prevMessages]);
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
                <Image source={{ uri: profile_image }} style={{ width: 40, height: 40, resizeMode: "contain", borderRadius: 20, marginRight: 10 }} />
                <Appbar.Content title={name} titleStyle={{ fontSize: 18 }} />
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
        </SafeAreaProvider>
    )
}

export default ChatBoard