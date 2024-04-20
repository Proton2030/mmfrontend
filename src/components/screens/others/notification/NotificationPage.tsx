// NotificationScreen.js
import { useRef, useEffect, useContext, useState, useCallback } from 'react';
import { View, FlatList, Animated, Text, Image, TouchableOpacity } from 'react-native';
import { List, Divider, Appbar, Badge, useTheme } from 'react-native-paper';
import AuthContext from '../../../../contexts/authContext/authContext';
import { api } from '../../../../utils/api';
import { useNavigation } from '@react-navigation/native';
import NotificationCard from './Notificationcard';
import { getTimeAgo } from '../../../../utils/commonFunction/lastSeen';
import Icon from 'react-native-vector-icons/FontAwesome5';

const NotificationPage = () => {
  const { user } = useContext(AuthContext);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [notificationList, setNotificationList] = useState<any[]>([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const handleGetNotification = useCallback(async () => {
    if (user) {
      const filter = {
        user_id: user._id,
      };
      const result = await api.chat.getNotification(filter);
      console.log(result[0]);

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
    handleGetNotification();
  }, [handleGetNotification]);

  const handleRouteChat = () => {
    navigation.navigate('UserDashboard', { screen: 'Chat-List' });
  };

  const handleRouteChooseMe = () => {
    navigation.navigate('UserDashboard', { screen: 'ChooseMe' });
  };

  const handleNavigate = (body: string) => {
    if (body.includes('Choose')) {
      handleRouteChooseMe();
    } else {
      handleRouteChat();
    }
  };
  const renderNotificationItem = ({ item }: any) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        backgroundColor: colors.surface,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.secondary,
      }}
    >
      <List.Item
        title={item?.title}
        titleStyle={{
          fontWeight: '900',
        }}
        description={
          <>
            <Text style={{ fontWeight: '400', fontSize: 9, color: colors.tertiary }}>{item?.text}</Text>
          </>
        }
        onPress={() => {
          handleNavigate(item?.text);
        }}
        right={(props) => (
          <Text style={{ fontSize: 12, gap: 5, color: colors.tertiary }}>
            <Icon name="clock" size={10} color={colors.tertiary} />
            &nbsp;
            {getTimeAgo(new Date().getTime() - new Date(item.updatedAt).getTime())}
          </Text>
        )}
        left={(props) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 4,
              paddingLeft: 20,
            }}
          >
            <Image
              source={{ uri: 'https://img.icons8.com/?size=512&id=80611&format=png' }}
              style={{ height: 40, width: 40 }}
            />

            {true && <Badge size={8} style={{ backgroundColor: 'green', marginLeft: -8, marginTop: 6 }} />}
          </View>
        )}
      />
    </Animated.View>
  );
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: colors.secondary, paddingLeft: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={colors.primary} style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: '800', fontSize: 23, color: colors.onSurface }}>Notifications</Text>
      </Appbar.Header>
      {notificationList.length > 0 ? (
        <FlatList
          data={notificationList.reverse()}
          keyExtractor={(item) => item?._id}
          renderItem={renderNotificationItem}
        />
      ) : (
        // handleEmptyListAnimation()
        <NotificationCard />
      )}
    </View>
  );
};

export default NotificationPage;
