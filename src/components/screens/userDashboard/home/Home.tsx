import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../contexts/authContext/authContext';
import { api } from '../../../../utils/api';
import UserCard from '../../../shared/userCard/UserCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IUserDetails } from '../../../../@types/types/userDEtails.types';
import ProfileImage from '../../profileImage/ProfileImage';

const Home = ({ isSearch, setIsSearch }: { isSearch: boolean, setIsSearch: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { user } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [suggestedUser, setSuggestedUser] = useState<IUserDetails[]>([]);
    const addChoice = useCallback(async (sender_id: string, reciver_id: string) => {
        const payload = {
            senderId: sender_id,
            recieverId: reciver_id
        }
        const response = await api.userChoice.addChoice(payload);
    }, [])

    const getSuggestionUserApi = async () => {
        console.log("calling api", page)
        if (user) {
            const filter = {
                gender: user.gender,
                page: page,
                limit: 5
            }
            try {
                const userlist = await api.userDetails.getAllSuggestionUser(filter);
                setSuggestedUser(prevUserList => prevUserList.concat(userlist));
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
        console.log(" ------>>calling api");
        setLoading(true);
        getSuggestionUserApi();
    }, [user, page]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentPosition: number = event.nativeEvent.contentOffset.y;
        if (currentPosition > page * 1000) {

            setPage(prev => prev + 1);
        }
    };

    const handleClear = () => {
        handleRefresh();
        setSearchQuery("");
        setIsSearch(false);
    }

    const handleRefresh = () => {
        setRefreshing(true);
        setSuggestedUser([]);
        setPage(1);
        getSuggestionUserApi();
    };

    const handleSearh = async () => {
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

    useEffect(() => {
        getSuggestionUser();
    }, [getSuggestionUser]);

    return (
        <SafeAreaView>
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
                            onSubmitEditing={handleSearh}
                            blurOnSubmit={true}
                        />
                    </View> : null
            }
            {loading ? (
                <ActivityIndicator size="large" color="#E71B73" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    data={suggestedUser}
                    renderItem={({ item }) => <UserCard addChoice={addChoice} userDetails={item} />}
                    keyExtractor={user => user._id!}
                />
            )}
        </SafeAreaView>

    )
}

export default Home;
