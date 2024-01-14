// NotificationScreen.js
import React, { useRef, useEffect } from 'react';
import { View, FlatList, Animated } from 'react-native';
import { List, Divider, Appbar, Badge } from 'react-native-paper';

const notificationsData = [
    { id: '1', message: 'John liked your post', time: '10:30 AM', unread: true },
    { id: '2', message: 'Jane commented on your photo', time: '11:45 AM', unread: false },
];

const NotificationPage = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);
    const renderNotificationItem = ({ item }: any) => (
        <Animated.View style={{ opacity: fadeAnim }}>
            <List.Item
                title={item.message}
                description={`Notification details go here - ${item.time}`}
                left={(props) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <List.Icon
                            {...props}
                            icon="bell"
                            style={{ marginRight: 10 }}
                        />
                        {item.unread && <Badge size={8} style={{ backgroundColor: 'green', marginLeft: -8, marginTop: 6 }} />}
                    </View>
                )}
            />
        </Animated.View>
    );
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="Notifications" />
            </Appbar.Header>
            <FlatList
                data={notificationsData}
                keyExtractor={(item) => item.id}
                renderItem={renderNotificationItem}
                ItemSeparatorComponent={() => <Divider />}
            />
        </View>
    );
};

export default NotificationPage;
