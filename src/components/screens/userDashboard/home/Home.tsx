import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl } from 'react-native';
import { Appbar, Button, IconButton, Searchbar, Tooltip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../contexts/authContext/authContext';
import { api } from '../../../../utils/api';
import UserCard from '../../../shared/userCard/UserCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IUserDetails } from '../../../../@types/types/userDEtails.types';
import { shuffleArray } from '../../../../utils/commonFunction/suffleArray';
import _ from 'lodash';
import SmallLoader from '../../../shared/smallLoader/SmallLoader';

const Home = () => {
    const navigation = useNavigation<any>();
    const { user } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSearch, setIsSearch] = React.useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [suggestedUser, setSuggestedUser] = useState<IUserDetails[]>([]);
    const [topIcon, setTopIcon] = useState<boolean>(false);

    const flatListRef = useRef<any>(null);

    const handleScrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
            setTopIcon(false)
        }
    };

    const addChoice = useCallback(async (sender_id: string, reciver_id: string) => {
        const payload = {
            senderId: sender_id,
            recieverId: reciver_id
        }
        console.log("-------->payload", payload);
        const response = await api.userChoice.addChoice(payload);
    }, [])

    const getSuggestionUserApi = async (mode: string) => {
        console.log("calling api2", page)
        if (user) {
            const filter = {
                gender: user.gender,
                page: page,
                limit: 5
            }
            try {
                const userlist = await api.userDetails.getAllSuggestionUser(filter);
                if (mode === "REFRESH") {
                    setSuggestedUser([]);
                    setSuggestedUser(shuffleArray(userlist));
                }
                else {
                    setSuggestedUser(prevUserList => prevUserList.concat(userlist));
                }
                setRefreshing(false);
                setLoading(false);
            }
            catch (err) {
                console.log(err)
                setRefreshing(false);
                // setLoading(false);
            }
        }
    }

    // const handleUnchoice = async (choiceId: string) => {
    //     const response = await api.userChoice.unChoice(choiceId);
    //     console.log("called")
    // }
    const getSuggestionUser = useCallback(async () => {
        getSuggestionUserApi("FRESH");
    }, [user, page]);

    const debouncedFetchData = _.debounce(() => {
        getSuggestionUserApi("SCROLL");
    }, 500);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentPosition: number = event.nativeEvent.contentOffset.y;
        if (currentPosition > 0) {
            setTopIcon(true)
        }
        else {
            setTopIcon(false);
        }
        if (currentPosition > page * 1000) {
            setPage(prev => prev + 1);
            debouncedFetchData();
        }
    };

    const handleClear = () => {
        setSearchQuery("");
        setIsSearch(false);
        setSuggestedUser([]);
        getSuggestionUser();
    }

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setPage(1);
        let suggestTempList = shuffleArray(suggestedUser);
        setSuggestedUser(suggestTempList);
    }, [suggestedUser]);

    const handleSearch = async () => {
        if (user) {
            const filter = {
                gender: user.gender,
                name: searchQuery
            }
            const response = await api.userDetails.searchUser(filter);
            setSuggestedUser(response);
            setLoading(false);
        }
    }

    const routeToChatList = () => {
        navigation.navigate("Chat-List");
    }
    const routeToNotificationList = () => {
        navigation.navigate("Notification");
    }

    const handleSearchBar = () => {
        setIsSearch(!isSearch);
    }

    useEffect(() => {
        getSuggestionUser();
    }, []);

    useEffect(() => {
        if (refreshing) {
            setRefreshing(false);
        }
    }, [refreshing]);

    return (
        <SafeAreaView>
            <Appbar.Header style={{
                backgroundColor: '#fde8f1', shadowColor: '#000000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
            }}>
                <Appbar.Content title="Muslim Matrimony" titleStyle={{ color: "#E71B73", fontFamily: "cursive", fontSize: 24, fontWeight: 'bold' }} />
                <Appbar.Action icon="magnify" onPress={handleSearchBar} />
                <Appbar.Action icon="chat-outline" onPress={routeToChatList} />
                <Appbar.Action icon="bell-outline" onPress={routeToNotificationList} />
            </Appbar.Header>
            {
                isSearch ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Searchbar
                            style={{
                                flex: 1,
                                margin: 10,
                                backgroundColor: "#fff5f9",
                            }}
                            elevation={3}
                            placeholder="Search User"
                            onChangeText={(query) => { setSearchQuery(query) }}
                            onClearIconPress={handleClear}
                            value={searchQuery}
                            onSubmitEditing={handleSearch}
                        />
                    </View> : null
            }
            {loading ? (
                <ActivityIndicator size="large" color="#E71B73" style={{ marginTop: 20 }} />
            ) : (
                <>
                    <FlatList
                        ref={flatListRef}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                        onScroll={handleScroll}
                        scrollEventThrottle={50}
                        data={suggestedUser}
                        renderItem={({ item }) => <UserCard addChoice={addChoice} userDetails={item} />}
                        keyExtractor={(user, index) => `${index}`}
                        ListFooterComponent={SmallLoader}
                    />
                    {
                        topIcon ?
                            <View style={{ position: 'absolute', bottom: 80, right: 16, backgroundColor: '#E71B73', padding: 0, borderRadius: 50 }}>
                                <Tooltip title="Selected Camera">
                                    <IconButton icon="arrow-up" size={30} iconColor='white' onPress={handleScrollToTop} />
                                </Tooltip>
                            </View> : null
                    }
                </>
            )}
        </SafeAreaView>

    )
}

export default Home;
