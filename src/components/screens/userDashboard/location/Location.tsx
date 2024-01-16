import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl } from 'react-native';
import { Button, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../contexts/authContext/authContext';
import { api } from '../../../../utils/api';
import UserCard from '../../../shared/userCard/UserCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { IUserDetails } from '../../../../@types/types/userDEtails.types';

const Location = () => {
    const { user } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [suggestedUser, setSuggestedUser] = useState<IUserDetails[]>([]);
    const [selectedPage, setSelectedPage] = useState<Map<number, number>>(new Map());
    const [loading, setLoading] = useState<boolean>(true);

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
                page: page,
                limit: 5,
                gender: user.gender,
                state: user.state
            }
            try {
                const userlist = await api.userDetails.getLocationSuggestionUser(filter);
                setSuggestedUser(prevUserList => prevUserList.concat(userlist));
                setRefreshing(false);
                setLoading(false);
            }
            catch (err) {
                console.log(err)
                setRefreshing(false);
            }
        }
    }
    const handleEmptyListAnimation = () => (
        <View style={{ alignItems: 'center', marginTop: 50 }}>

            <Text style={{ marginTop: 10, fontSize: 20 }}>No user available in your location</Text>
        </View>
    );
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


    useEffect(() => {
        getSuggestionUser();
    }, [getSuggestionUser]);

    return (
        <SafeAreaView>
            {
                (loading) ?
                    null
                    :
                    <>
                        {suggestedUser?.length > 0 ? (
                            <FlatList
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                                onScroll={handleScroll}
                                scrollEventThrottle={16}
                                data={suggestedUser}
                                renderItem={({ item }) => <UserCard addChoice={addChoice} userDetails={item} />}
                                keyExtractor={user => user._id!}
                            />

                        ) : (

                            handleEmptyListAnimation()

                        )}</>
            }

        </SafeAreaView>
    )
}

export default Location;
