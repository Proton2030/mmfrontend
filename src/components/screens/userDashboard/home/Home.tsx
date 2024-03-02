import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl, Text, Modal, ScrollView, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { Appbar, Badge, Button, Checkbox, IconButton, Portal, Searchbar, Tooltip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../contexts/authContext/authContext';
import { api } from '../../../../utils/api';
import UserCard from '../../../shared/userCard/UserCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IUserDetails } from '../../../../@types/types/userDEtails.types';
import { shuffleArray } from '../../../../utils/commonFunction/suffleArray';
import _ from 'lodash';
import SmallLoader from '../../../shared/smallLoader/SmallLoader';
import { handelVibrate } from '../../../../utils/commonFunction/systemvibration';
import axios from 'axios'; // Import axios
import { MessageSeenCountContext } from '../../../../contexts/messageSeenContext/MessageSeenCountContextProvider';
import FilterDrawer from '../../../shared/filterDrawer/FilterDrawer';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';

const Home = () => {

    const navigation = useNavigation<any>();
    const { user } = useContext(AuthContext);
    const { setMessageSeenCount } = useContext(MessageSeenCountContext);
    const { messageSeenCount } = useContext(MessageSeenCountContext);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [suggestedUser, setSuggestedUser] = useState<IUserDetails[]>([]);
    const [topIcon, setTopIcon] = useState<boolean>(false);
    const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
    const [maritalStatus, setMaritalStatus] = useState<string>("");
    const [hasSalah, setHasSalah] = useState<string>("");
    const [hasSawm, setHasSawm] = useState<string>("");
    const [sliderValue, setSliderValue] = useState<number>(80);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        if (drawerVisible) {
            setTimeout(() => {
                setShowOverlay(true);
            }, 500);
        } else {
            setShowOverlay(false);
        }
    }, [drawerVisible]);

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
        Animated.timing(animation, {
            toValue: drawerVisible ? 0 : 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    };

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [300, 0],
    });

    const flatListRef = useRef<any>(null);
    const handleScrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
            setTopIcon(false)
        }
    };


    const hideFilterModal = async (filterOptions: { maritalStatus: any; hasSalah: any; hasSawm: any; }) => {
        const gender = (user?.gender === "MALE") ? "FEMALE" : "MALE";
        console.log(filterOptions)
        try {
            const params = {
                gender: gender,
                marital_status: filterOptions?.maritalStatus,
                salah: filterOptions?.hasSalah,
                sawum: filterOptions?.hasSawm
            };
            const response = await api.filter.getFilterList(params);
            setSuggestedUser(response);
            toggleDrawer()
        } catch (error) {
            console.error(error);
            // setLoading(false);
        }
    };


    const addChoice = useCallback(async (sender_id: string, reciver_id: string) => {
        const payload = {
            senderId: sender_id,
            recieverId: reciver_id
        }
        console.log("-------->payload", payload);
        try {
            await api.userChoice.addChoice(payload);
        } catch (err) {
            console.log(err);
        } finally {
            handelVibrate();
        }
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
    const getSuggestionUser = useCallback(async () => {
        getSuggestionUserApi("REFRESH");
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
        // setSuggestedUser([])
        // getSuggestionUserApi("REFRESH");
        getSuggestionUser();
        setFilterModalVisible(false)
    }
    const handleRefreshFilters = () => {
        setMaritalStatus('');
        setHasSalah('');
        setHasSawm('');
        setFilterModalVisible(false);
    };
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
            try {
                const response = await axios.get('/search-filter', { params: filter });
                setSuggestedUser(response.data.users);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    }

    const routeToChatList = () => {
        navigation.navigate("Chat-List");
    }
    const routeToNotificationList = () => {
        navigation.navigate("Notification");
    }

    const handlegGetUnseenMessageCount = useCallback(async () => {
        if (user) {
            const response = await api.chat.getUnseenMessageCount({ userObjectId: user._id });
            console.log(user._id);
            setMessageSeenCount(response);
            console.log("=====>unseen message count", response);
        }
    }, [user])

    const handleSearchBar = () => {
        setIsSearch(!isSearch);
    }
    const LogCount = () => {
        console.log("-------------->Message seen count", messageSeenCount)
    }
    useEffect(() => {
        getSuggestionUser();
    }, []);

    useEffect(() => {
        if (refreshing) {
            setRefreshing(false);
        }
    }, [refreshing]);
    const [active, setActive] = useState('');
    useEffect(() => {
        handlegGetUnseenMessageCount();
    }, [handlegGetUnseenMessageCount]);

    return (
        <>
            <View style={{ flex: 1 }}>
                <Appbar.Header
                    style={{
                        backgroundColor: '#fde8f1',
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                    }}>
                    <Appbar.Content
                        title="Muslim Matrimony"
                        titleStyle={{ color: "#E71B73", fontFamily: "cursive", fontSize: 24, fontWeight: 'bold' }} />
                    <TouchableOpacity onPress={toggleDrawer}>
                        <Appbar.Action icon="account-filter" size={26} />
                    </TouchableOpacity>
                    <Badge visible={messageSeenCount > 0} size={16} style={{ position: 'absolute', top: 5, right: 5 }}>
                        {messageSeenCount}
                    </Badge>
                    <Appbar.Action icon="chat-processing" onPress={routeToChatList} />
                    <Appbar.Action icon="bell" onPress={routeToNotificationList} />
                </Appbar.Header>

                {isSearch && (
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
                    </View>
                )}

                {loading ? (
                    <ActivityIndicator size="large" color="#E71B73" style={{ marginTop: 20 }} />
                ) : (
                    <FlatList
                        ref={flatListRef}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                        onScroll={handleScroll}
                        scrollEventThrottle={50}
                        data={suggestedUser}
                        renderItem={({ item }) => <UserCard addChoice={addChoice} userDetails={item} mode="NORMAL" />}
                        keyExtractor={(user, index) => `${index}`}
                        ListFooterComponent={SmallLoader}
                    />
                )}
                {topIcon && (
                    <View style={{ position: 'absolute', bottom: 80, right: 16, backgroundColor: '#E71B73', padding: 0, borderRadius: 50 }}>
                        <Tooltip title="Selected Camera">
                            <IconButton icon="arrow-up" size={30} iconColor='white' onPress={handleScrollToTop} />
                        </Tooltip>
                    </View>
                )}
            </View>

            {drawerVisible && <View style={globalStyles.overlay} />}
            <Animated.View style={{ position: 'absolute', top: 0, right: drawerVisible ? 0 : -80, width: '100%', height: '100%', transform: [{ translateX }], paddingLeft: 10 }}>
                <View style={{ backgroundColor: 'white', position: 'absolute', right: 0, width: '80%', height: '100%' }}>
                    <FilterDrawer toggleDrawer={toggleDrawer} applyFilters={hideFilterModal} />
                </View>
            </Animated.View>


        </>
    )
}

export default Home;

