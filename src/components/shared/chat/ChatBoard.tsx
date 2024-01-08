import { Chat, MessageType, defaultTheme } from '@flyerhq/react-native-chat-ui'
import React, { useState } from 'react'
import { Image, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Appbar } from 'react-native-paper'
import { logo } from '../../../assets'
import { useRoute } from '@react-navigation/native'

// For the testing purposes, you should probably use https://github.com/uuidjs/uuid
const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.floor(Math.random() * 16)
        const v = c === 'x' ? r : (r % 4) + 8
        return v.toString(16)
    })
}

const renderEmptyState = () => <Text style={{}}>Hey</Text>;

const ChatBoard = () => {
    const [messages, setMessages] = useState<MessageType.Any[]>([]);
    const route = useRoute<any>();
    const { profile_image, name } = route.params;
    const user = { id: '06c33e8b-e835-4736-80f4-63f44b66666c' }

    const addMessage = (message: MessageType.Any) => {
        setMessages([message, ...messages])
    }

    const handleSendPress = (message: MessageType.PartialText) => {
        const textMessage: MessageType.Text = {
            author: user,
            createdAt: Date.now(),
            id: uuidv4(),
            text: message.text,
            type: 'text',
        }
        addMessage(textMessage)
    }

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
                    colors: { ...defaultTheme.colors, primary: "#E71B73", inputBackground: "#011433" }
                }}
                locale='en'
                emptyState={renderEmptyState}
                messages={messages}
                onSendPress={handleSendPress}
                user={user}
            />
        </SafeAreaProvider>
    )
}

export default ChatBoard