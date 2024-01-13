import { View, Text, ScrollView, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Searchbar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../contexts/authContext/authContext';
import { api } from '../../../../utils/api';
import UserCard from '../../../shared/userCard/UserCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { IUserDetails } from '../../../../@types/types/userDEtails.types';
import SettingsPage from '../../others/settings/Settings';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [suggestedUser, setSuggestedUser] = useState<IUserDetails[]>([]);
    const [selectedPage, setSelectedPage] = useState<Map<number, number>>(new Map());
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
            }
            catch (err) {
                console.log(err)
                setRefreshing(false);
            }
        }
    }

    const getSuggestionUser = useCallback(async () => {
        console.log(" ------>>calling api");
        getSuggestionUserApi();
    }, [user, page]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentPosition: number = event.nativeEvent.contentOffset.y;
        if (currentPosition > page * 1000) {
            setPage(prev => prev + 1);
        }
    };

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
        }
    }

    useEffect(() => {
        getSuggestionUser();
    }, [getSuggestionUser]);

    return (
        // <SafeAreaView>
        //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //         <Searchbar
        //             style={{
        //                 flex: 1,
        //                 margin: 10,
        //                 backgroundColor: "#fff5f9",
        //             }}
        //             elevation={3}
        //             placeholder="Search User"
        //             onChangeText={(query) => { setSearchQuery(query) }}
        //             onClearIconPress={handleRefresh}
        //             value={searchQuery}
        //             onSubmitEditing={handleSearh}
        //             blurOnSubmit={true}
        //         />
        //     </View>
        //     <FlatList
        //         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        //         onScroll={handleScroll}
        //         scrollEventThrottle={16}
        //         data={suggestedUser}
        //         renderItem={({ item }) => <UserCard addChoice={addChoice} userDetails={item} />} // Assuming addChoice is defined
        //         keyExtractor={user => user._id!} // Assuming email is a unique identifier
        //     />
        // </SafeAreaView>
        <SettingsPage />
    )
}

export default Home