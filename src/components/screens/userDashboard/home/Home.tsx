import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl, Text, Modal, ScrollView } from 'react-native';
import { Appbar, Button, Checkbox, IconButton, Portal, Searchbar, Tooltip } from 'react-native-paper';
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
    const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
    const [maritalStatus, setMaritalStatus] = useState<string[]>([]);
    const [financialCondition, setFinancialCondition] = useState<string[]>([]);
    const [hasSalah, setHasSalah] = useState<boolean | null>(null);
    const [hasSawm, setHasSawm] = useState<boolean | null>(null);
    const [sliderValue, setSliderValue] = useState(80);

    const handleSliderChange = (value: any) => {
        setSliderValue(value);
    };

    const getAgeRange = () => {
        if (sliderValue <= 40) {
            return `0 to ${sliderValue}`;
        } else {
            return `0 to 70`;
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

    const hideFilterModal = () => {
        setFilterModalVisible(false);
    };

    const applyFilters = () => {

        hideFilterModal();
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
                <Appbar.Action icon="filter" onPress={showFilterModal} />

                <Portal>
                    <Modal visible={filterModalVisible} onRequestClose={hideFilterModal} transparent>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: '90%', height: '50%' }}>
                                <ScrollView>
                                    <Text style={{ fontSize: 25, color: 'red', fontWeight: 'bold', marginBottom: 10 }}>Filter Options</Text>

                                    {/* Marital Status */}
                                    <Text>Marital Status</Text>
                                    <Checkbox.Item label="Married" status={maritalStatus.includes("MARRIED") ? 'checked' : 'unchecked'} onPress={() => setMaritalStatus([...maritalStatus, "MARRIED"])} />
                                    <Checkbox.Item label="Unmarried" status={maritalStatus.includes("UNMARRIED") ? 'checked' : 'unchecked'} onPress={() => setMaritalStatus([...maritalStatus, "UNMARRIED"])} />
                                    <Checkbox.Item label="Divorced" status={maritalStatus.includes("DIVORCED") ? 'checked' : 'unchecked'} onPress={() => setMaritalStatus([...maritalStatus, "DIVORCED"])} />
                                    <Checkbox.Item label="Partner Death" status={maritalStatus.includes("PARTNER DEATH") ? 'checked' : 'unchecked'} onPress={() => setMaritalStatus([...maritalStatus, "PARTNER DEATH"])} />

                                    {/* Financial Condition */}
                                    <Text>Financial Condition</Text>
                                    <Checkbox.Item label="Low" status={financialCondition.includes("LOW") ? 'checked' : 'unchecked'} onPress={() => setFinancialCondition([...financialCondition, "LOW"])} />
                                    <Checkbox.Item label="Medium" status={financialCondition.includes("MEDIUM") ? 'checked' : 'unchecked'} onPress={() => setFinancialCondition([...financialCondition, "MEDIUM"])} />
                                    <Checkbox.Item label="High" status={financialCondition.includes("HIGH") ? 'checked' : 'unchecked'} onPress={() => setFinancialCondition([...financialCondition, "HIGH"])} />

                                    {/* Salah */}
                                    <Text>Has Salah</Text>
                                    <Checkbox.Item label="Yes" status={hasSalah === true ? 'checked' : 'unchecked'} onPress={() => setHasSalah(true)} />
                                    <Checkbox.Item label="No" status={hasSalah === false ? 'checked' : 'unchecked'} onPress={() => setHasSalah(false)} />

                                    {/* Sawm */}
                                    <Text>Has Sawm</Text>
                                    <Checkbox.Item label="Yes" status={hasSawm === true ? 'checked' : 'unchecked'} onPress={() => setHasSawm(true)} />
                                    <Checkbox.Item label="No" status={hasSawm === false ? 'checked' : 'unchecked'} onPress={() => setHasSawm(false)} />

                                    <Text>Age</Text>
                                    <Text>Selected Age Range: {getAgeRange()}</Text>
                                    <Slider
                                        style={{ width: 200, height: 40 }}
                                        minimumValue={0}
                                        maximumValue={1}
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="#000000"
                                    />
                                    <Button mode="contained" onPress={applyFilters} style={{ marginTop: 20 }}>Apply Filters</Button>
                                    <Button onPress={hideFilterModal} style={{ marginTop: 10 }}>Cancel</Button>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </Portal>
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