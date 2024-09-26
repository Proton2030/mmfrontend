import {
  View,
  Text,
  ScrollView,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl,
  Animated,
} from 'react-native';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Appbar, Button, IconButton, List, Tooltip, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../../contexts/authContext/authContext';
import { api } from '../../../../../utils/api';
import UserCard from '../../../../shared/userCard/UserCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { IUserDetails } from '../../../../../@types/types/userDEtails.types';
import { addChoice } from '../../../../../utils/api/userChoice/addUserChoice';
import { handleVibrate } from '../../../../../utils/commonFunction/systemvibration';

const MyChoice = () => {
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);
  const { colors } = useTheme();
  const [choiceList, setChoiceList] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState<boolean>(true);
  const [topIcon, setTopIcon] = useState<boolean>(false);

  const flatListRef = useRef<any>(null);
  // const handleUnchoice = async (choiceId: string) => {
  //     const response = await api.userChoice.unChoice(choiceId);
  //     if (response && user) {
  //         const updatedList = choiceList.filter(choice => choice._id !== choiceId);
  //         // Set the updated list to the state (assuming you're using React useState hook)
  //         setChoiceList(updatedList);
  //     }
  // }

  const handleScrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      setTopIcon(false);
    }
  };

  const getChoiceUserApi = async () => {
    if (user) {
      const filter = {
        page: page,
        first_user_profile_object_id: user._id,
        status: 'CHOICE',
      };
      try {
        const userlist = await api.userChoice.getChoice(filter);
        setChoiceList((prevUserList) => prevUserList.concat(userlist));
        setRefreshing(false);
        setLoading(false);
      } catch (err) {
        setRefreshing(false);
        console.log(err);
      }
    }
  };

  const getChoiceUser = useCallback(async () => {
    getChoiceUserApi();
  }, [user, page]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentPosition: number = event.nativeEvent.contentOffset.y;
    if (currentPosition > 0) {
      setTopIcon(true);
    } else {
      setTopIcon(false);
    }
    if (currentPosition > page * 500) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setChoiceList([]);
    setPage(1);
    getChoiceUserApi();
  };
  const handleEmptyListAnimation = () => (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <Text style={{ marginTop: 10, fontSize: 20 }}>you have not chosed anyone yet!</Text>
    </View>
  );

  const routeToChatList = () => {
    navigation.navigate('Chat-List');
  };
  const routeToNotificationList = () => {
    navigation.navigate('Notification');
  };

  const addChoice = useCallback(async (sender_id: string, reciver_id: string) => {
    const payload = {
      senderId: sender_id,
      recieverId: reciver_id,
    };
    console.log('-------->payload', payload);
    try {
      await api.userChoice.addChoice(payload);
    } catch (err) {
      console.log(err);
    } finally {
      handleVibrate();
    }
  }, []);

  useEffect(() => {
    console.log('jji', choiceList);
    getChoiceUser();
  }, [getChoiceUser]);

  useEffect(() => {
    // Fade-in animation when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView>
      {/* <Appbar.Header
        style={{
          backgroundColor: colors.secondary,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}
      >
        <Appbar.Content
          title="Muslim Matrimony"
          titleStyle={{ color: colors.primary, fontFamily: 'cursive', fontSize: 24, fontWeight: 'bold' }}
        />
        <Appbar.Action icon="chat-outline" onPress={routeToChatList} />
        <Appbar.Action icon="bell-outline" onPress={routeToNotificationList} />
      </Appbar.Header> */}
      {loading ? (
        <ActivityIndicator size="large" color="#E71B73" style={{ marginTop: 20 }} />
      ) : (
        <>
          {choiceList.length > 0 ? (
            <>
              <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                data={choiceList}
                renderItem={({ item }) => (
                  <UserCard addChoice={addChoice} userDetails={item.choice_user_details} mode="CHOICE" />
                )} // Assuming addChoice is defined
                keyExtractor={(user, index) => `${index}`}
              />
              {topIcon ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 16,
                    backgroundColor: '#E71B73',
                    padding: 0,
                    borderRadius: 50,
                  }}
                >
                  <Tooltip title="Selected Camera">
                    <IconButton icon="arrow-up" size={30} iconColor="white" onPress={handleScrollToTop} />
                  </Tooltip>
                </View>
              ) : null}
            </>
          ) : (
            handleEmptyListAnimation()
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default MyChoice;
