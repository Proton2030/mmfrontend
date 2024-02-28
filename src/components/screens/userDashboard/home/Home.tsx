import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl, Text, Modal, ScrollView } from 'react-native';
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
import Slider from '@react-native-community/slider';
import MultiSlider from '@react-native-community/slider';
import { handelVibrate } from '../../../../utils/commonFunction/systemvibration';
import axios from 'axios'; // Import axios
import { getFilterList } from '../../../../utils/api/filter/filter';
import { MessageSeenCountContext } from '../../../../contexts/messageSeenContext/MessageSeenCountContextProvider';

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

    const handleSliderChange = (value: any) => {
        setSliderValue(Math.round(value));
    };

    const handleRefreshFilters = () => {
        setMaritalStatus('');
        setHasSalah('');
        setHasSawm('');
        setFilterModalVisible(false);
    };

    const getAgeRange = () => {
        if (sliderValue <= 40) {
            return `0 to ${sliderValue}`;
        } else {
            return `0 to 80`;
        }
    };
    const flatListRef = useRef<any>(null);
    const handleScrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
            setTopIcon(false)
        }
    };

    const showFilterModal = () => {
        setFilterModalVisible(true);
    };

    const hideFilterModal = async () => {

        console.log("-------->filter api");
        try {
            const params = {
                marital_status: maritalStatus,
                salah: hasSalah,
                sawum: hasSawm
            };
            const response = await api.filter.getFilterList(params);
            setSuggestedUser(response);
            // setLoading(true);
            setFilterModalVisible(false);
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
            handelVibrate();
            await api.userChoice.addChoice(payload);
        } catch (err) {
            console.log(err);
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
            try {
                const response = await axios.get('/search-filter', { params: filter }); // Use axios to send the request
                setSuggestedUser(response.data.users); // Assuming the response has users array
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
        console.log("-------------->MEssage seen count", messageSeenCount)
    }
    useEffect(() => {
        getSuggestionUser();
    }, []);

    useEffect(() => {
        if (refreshing) {
            setRefreshing(false);
        }
    }, [refreshing]);

    useEffect(() => {
        handlegGetUnseenMessageCount();
    }, [handlegGetUnseenMessageCount]);

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
                <Appbar.Action icon="filter" onPress={showFilterModal} />

                <Portal>
                    <Modal visible={filterModalVisible} onRequestClose={hideFilterModal} transparent>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '90%', height: '50%' }}>
                                <ScrollView>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 25, color: '#E71B73', fontWeight: 'bold', marginBottom: 10 }}>Filter Options</Text>
                                        <View style={{ flexDirection: 'row', gap: 2 }}>

                                            <IconButton
                                                icon="refresh"
                                                iconColor='white'
                                                size={20}
                                                style={{ borderRadius: 20, backgroundColor: "#E71B73", }}
                                                onPress={handleRefreshFilters} // Add onPress handler for refreshing
                                            />

                                            <IconButton
                                                icon="magnify"
                                                size={20}
                                                iconColor='white'
                                                onPress={hideFilterModal}
                                                style={{ borderRadius: 20, backgroundColor: "#E71B73", }}
                                            />
                                        </View>

                                    </View>

                                    {/* Marital Status */}
                                    <Text style={{ color: "#E71B73", fontWeight: "700", fontSize: 15, marginLeft: 5, marginTop: 5 }}>Marital Status</Text>
                                    <Checkbox.Item label="Married" status={maritalStatus.includes("MARRIED") ? 'checked' : 'unchecked'} onPress={() => setMaritalStatus("MARRIED")} />
                                    <Checkbox.Item label="Divorced" status={maritalStatus.includes("DIVORCED") ? 'checked' : 'unchecked'} onPress={() => setMaritalStatus("DIVORCED")} />
                                    <Checkbox.Item label="Unmarried" status={maritalStatus.includes("UNMARRIED") ? 'checked' : 'unchecked'} onPress={() => setMaritalStatus("UNMARRIED")} />
                                    <Checkbox.Item label="Partner Death" status={maritalStatus.includes("PARTNER DEATH") ? 'checked' : 'unchecked'} onPress={() => setMaritalStatus("PARTNER DEATH")} />


                                    {/* Salah */}
                                    <Text style={{ color: "#E71B73", fontWeight: "700", fontSize: 15, marginLeft: 5 }}>Has Salah</Text>
                                    <Checkbox.Item label="Yes" status={hasSalah.includes("YES") ? 'checked' : 'unchecked'} onPress={() => setHasSalah("YES")} />
                                    <Checkbox.Item label="No" status={hasSalah.includes("NO") ? 'checked' : 'unchecked'} onPress={() => setHasSalah("NO")} />

                                    {/* Sawm */}
                                    <Text style={{ color: "#E71B73", fontWeight: "700", fontSize: 15, marginLeft: 5 }}>Has Sawm</Text>
                                    <Checkbox.Item label="Yes" status={hasSawm.includes("YES") ? 'checked' : 'unchecked'} onPress={() => setHasSawm("YES")} />
                                    <Checkbox.Item label="No" status={hasSawm.includes("NO") ? 'checked' : 'unchecked'} onPress={() => setHasSawm("NO")} />

                                    <Text style={{ color: "#E71B73", fontWeight: "700", fontSize: 15, marginLeft: 5 }}>Age</Text>
                                    <Text style={{ color: "#E71B73", fontWeight: "700", fontSize: 15, marginLeft: 5, marginTop: 5 }}>Selected Age Range: {getAgeRange()}</Text>
                                    <MultiSlider
                                        style={{ width: 200, height: 40 }}
                                        minimumValue={0}
                                        maximumValue={80}
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="#000000"
                                        value={Math.round(sliderValue)}
                                        onValueChange={handleSliderChange}
                                    />
                                    {/* <Button mode="contained" onPress={applyFilters} style={{ marginTop: 20 }}>Apply Filters</Button> */}

                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </Portal>
                <View>
                    {
                        messageSeenCount ?
                            <Badge
                                visible={true}
                                size={16}
                                style={{ position: 'absolute', top: 5, right: 5 }}
                            >
                                {messageSeenCount}
                            </Badge>
                            : null
                    }

                    <Appbar.Action icon="chat-outline" onPress={routeToChatList} />
                </View>
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
                        renderItem={({ item }) => <UserCard addChoice={addChoice} userDetails={item} mode="NORMAL" />}
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
