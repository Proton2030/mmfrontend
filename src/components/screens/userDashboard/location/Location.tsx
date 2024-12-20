import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl } from 'react-native';
import { ActivityIndicator, Appbar, Button, IconButton, List, Tooltip, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../contexts/authContext/authContext';
import { api } from '../../../../utils/api';
import UserCard from '../../../shared/userCard/UserCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { IUserDetails } from '../../../../@types/types/userDEtails.types';

const Location = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [suggestedUser, setSuggestedUser] = useState<IUserDetails[]>([]);
  const [selectedPage, setSelectedPage] = useState<Map<number, number>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [topIcon, setTopIcon] = useState<boolean>(false);

  const flatListRef = useRef<any>(null);

  const addChoice = useCallback(async (sender_id: string, reciver_id: string) => {
    const payload = {
      senderId: sender_id,
      recieverId: reciver_id,
    };
    const response = await api.userChoice.addChoice(payload);
  }, []);

  const handleScrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      setTopIcon(false);
    }
  };

  const getSuggestionUserApi = async () => {
    console.log('calling api', page);
    if (user) {
      const filter = {
        page: page,
        limit: 5,
        gender: user.gender,
        state: user.state,
      };
      try {
        const userlist = await api.userDetails.getLocationSuggestionUser(filter);
        setSuggestedUser((prevUserList) => prevUserList.concat(userlist));
        setRefreshing(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setRefreshing(false);
      }
    }
  };
  const handleEmptyListAnimation = () => (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <Text style={{ marginTop: 10, fontSize: 20 }}>No user available in your location</Text>
    </View>
  );
  const getSuggestionUser = useCallback(async () => {
    console.log(' ------>>calling api');
    getSuggestionUserApi();
  }, [user, page]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentPosition: number = event.nativeEvent.contentOffset.y;
    if (currentPosition > 0) {
      setTopIcon(true);
    } else {
      setTopIcon(false);
    }
    if (currentPosition > page * 1000) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSuggestedUser([]);
    setPage(1);
    getSuggestionUserApi();
  };

  const routeToChatList = () => {
    navigation.navigate('Chat-List');
  };
  const routeToNotificationList = () => {
    navigation.navigate('Notification');
  };

  useEffect(() => {
    getSuggestionUser();
  }, [getSuggestionUser]);

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size="large" color="#E71B73" style={{ marginTop: 20 }} />
      ) : (
        <>
          {suggestedUser?.length > 0 ? (
            <>
              <FlatList
                ref={flatListRef}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                data={suggestedUser}
                renderItem={({ item }) => <UserCard addChoice={addChoice} userDetails={item} mode="NORMAL" />}
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

export default Location;
