import { View, Text, ScrollView, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../contexts/authContext/authContext';
import { api } from '../../../../utils/api';
import UserCard from '../../../shared/userCard/UserCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { IUserDetails } from '../../../../@types/types/userDEtails.types';

const Home = () => {
    const { user } = useContext(AuthContext);
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
    const getSuggestionUser = useCallback(async () => {
        if (user) {
            const filter = {
                userObjectId: user._id,
                page: page,
                limit: 5
            }
            try {
                const userlist = await api.userDetails.getSuggestionUser(filter);
                setSuggestedUser(prevUserList => prevUserList.concat(userlist));
            }
            catch (err) {
                console.log(err)
            }
        }
    }, [user, page]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentPosition: number = event.nativeEvent.contentOffset.y;
        if (currentPosition > page * 1000) {
            setPage(prev => prev + 1);
        }
    };


    useEffect(() => {
        getSuggestionUser();
    }, [getSuggestionUser]);

    return (
        <SafeAreaView>
            <FlatList
                onScroll={handleScroll}
                scrollEventThrottle={16}
                data={suggestedUser}
                renderItem={({ item }) => <UserCard addChoice={addChoice} userDetails={item} />} // Assuming addChoice is defined
                keyExtractor={user => user._id!} // Assuming email is a unique identifier
            />
        </SafeAreaView>
    )
}

export default Home