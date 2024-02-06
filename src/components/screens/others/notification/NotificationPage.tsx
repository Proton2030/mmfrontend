// NotificationScreen.js
import { useRef, useEffect, useContext, useState, useCallback } from 'react';
import { View, FlatList, Animated, Text } from 'react-native';
import { List, Divider, Appbar, Badge } from 'react-native-paper';
import AuthContext from '../../../../contexts/authContext/authContext';
import { api } from '../../../../utils/api';
import { useNavigation } from '@react-navigation/native';

const NotificationPage = () => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation<any>();
    const [notificationList, setNotificationList] = useState<any[]>([]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const handleGetNotification = useCallback(async () => {
        if (user) {
            const filter = {
                user_id: user._id
            }
            const result = await api.chat.getNotification(filter)
            setNotificationList(result);
        }
    }, [user]);

    const handleEmptyListAnimation = () => (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
            <List.Icon icon="bell" />
            <Text style={{ marginTop: 10 }}>No notification available</Text>
        </View>
    );
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000, //

            useNativeDriver: true,
        }).start();

    }, [fadeAnim]);


    useEffect(() => {
        handleGetNotification()
    }, [handleGetNotification]);

    const handleRouteChat = () => {
        navigation.navigate("UserDashboard", { screen: "Chat-List" })
    }

    const handleRouteChooseMe = () => {
        navigation.navigate("UserDashboard", { screen: "ChooseMe" })
    }

    const handleNavigate = (body: string) => {
        if (body.includes("Choose")) {
            handleRouteChooseMe();
        }
        else {
            handleRouteChat();
        }
    }
    const renderNotificationItem = ({ item }: any) => (
        <Animated.View style={{ opacity: fadeAnim }}>
            <List.Item
                title={item?.title}
                description={item?.text}
                onPress={() => { handleNavigate(item?.text) }}
                left={(props) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4, paddingLeft: 10 }}>
                        <List.Icon
                            {...props}
                            icon="bell"
                            style={{ marginRight: 10 }}
                        />
                        {true && <Badge size={8} style={{ backgroundColor: 'green', marginLeft: -8, marginTop: 6 }} />}
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
            {
                (notificationList.length > 0) ?
                    <FlatList
                        data={notificationList}
                        keyExtractor={(item) => item?._id}
                        renderItem={renderNotificationItem}
                        ItemSeparatorComponent={() => <Divider />}
                    />
                    :
                    handleEmptyListAnimation()
            }

        </View>
    );
};

export default NotificationPage;
