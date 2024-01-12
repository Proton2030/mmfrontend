// // import { NativeSyntheticEvent, NativeScrollEvent, FlatList, RefreshControl } from 'react-native'
// // import React, { useCallback, useContext, useEffect, useState } from 'react'
// // import { SafeAreaView } from 'react-native-safe-area-context'
// // import ChoiceMatchCard from '../../../../shared/choiceMatchCard/ChoiceMatchCard'
// // import { api } from '../../../../../utils/api'
// // import AuthContext from '../../../../../contexts/authContext/authContext'

// // export const MyChoice: React.FC<any> = ({ navigation }) => {
// //     const { user } = useContext(AuthContext);
// //     const [choiceList, setChoiceList] = useState<any[]>([]);
// //     const [page, setPage] = useState<number>(1);
// //     const [refreshing, setRefreshing] = useState<boolean>(false);

// //     const handleUnchoice = async (choiceId: string) => {
// //         const response = await api.userChoice.unChoice(choiceId);
// //         if (response && user) {
// //             const updatedList = choiceList.filter(choice => choice._id !== choiceId);
// //             // Set the updated list to the state (assuming you're using React useState hook)
// //             setChoiceList(updatedList);
// //         }
// //     }

// //     const getChoiceUserApi = async () => {
// //         if (user) {
// //             console.log("called");
// //             const filter = {
// //                 page: page,
// //                 first_user_profile_object_id: user._id,
// //                 status: "CHOICE"
// //             }
// //             try {
// //                 const userlist = await api.userChoice.getChoice(filter);
// //                 setChoiceList(prevUserList => prevUserList.concat(userlist));
// //                 setRefreshing(false);
// //             }
// //             catch (err) {
// //                 setRefreshing(false);
// //                 console.log(err)
// //             }
// //         }
// //     }

// //     const getChoiceUser = useCallback(async () => {
// //         getChoiceUserApi();
// //     }, [user, page]);

// //     const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
// //         const currentPosition: number = event.nativeEvent.contentOffset.y;
// //         if (currentPosition > page * 100) {
// //             setPage(prev => prev + 1);
// //         }
// //     };

// //     const handleRefresh = () => {
// //         setRefreshing(true);
// //         setChoiceList([]);
// //         setPage(1);
// //         getChoiceUserApi();
// //     };

// //     useEffect(() => {
// //         getChoiceUser();
// //     }, [getChoiceUser]);
// //     return (
// //         <SafeAreaView style={{ padding: 10 }}>
// //             <FlatList
// //                 onScroll={handleScroll}
// //                 refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
// //                 scrollEventThrottle={16}
// //                 data={choiceList}
// //                 renderItem={({ item }) => <ChoiceMatchCard status='MY-CHOICE' choiceMatchId={item._id} name={item.choice_user_details.full_name} state={item.choice_user_details.state} handleUnchoice={handleUnchoice} />} // Assuming addChoice is defined
// //                 keyExtractor={user => user._id!} // Assuming email is a unique identifier
// //             />
// //         </SafeAreaView>
// //     )
// // }

// // export default MyChoice

import { View, Text, ScrollView, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../../contexts/authContext/authContext';
import { api } from '../../../../../utils/api';
import UserCard from '../../../../shared/userCard/UserCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { IUserDetails } from '../../../../../@types/types/userDEtails.types';
import { addChoice } from '../../../../../utils/api/userChoice/addUserChoice';

const MyChoice = () => {
    const { user } = useContext(AuthContext);
    const [choiceList, setChoiceList] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const handleUnchoice = async (choiceId: string) => {
        const response = await api.userChoice.unChoice(choiceId);
        if (response && user) {
            const updatedList = choiceList.filter(choice => choice._id !== choiceId);
            // Set the updated list to the state (assuming you're using React useState hook)
            setChoiceList(updatedList);
        }
    }

    const getChoiceUserApi = async () => {
        if (user) {
            const filter = {
                page: page,
                first_user_profile_object_id: user._id,
                status: "CHOICE"
            }
            try {
                const userlist = await api.userChoice.getChoice(filter);
                setChoiceList(prevUserList => prevUserList.concat(userlist));
                setRefreshing(false);
            }
            catch (err) {
                setRefreshing(false);
                console.log(err)
            }
        }
    }

    const getChoiceUser = useCallback(async () => {
        getChoiceUserApi();
    }, [user, page]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentPosition: number = event.nativeEvent.contentOffset.y;
        if (currentPosition > page * 500) {
            setPage(prev => prev + 1);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setChoiceList([]);
        setPage(1);
        getChoiceUserApi();
    };

    useEffect(() => {
        getChoiceUser();
    }, [getChoiceUser]);
    return (
        <SafeAreaView>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                data={choiceList}
                renderItem={({ item }) => <UserCard addChoice={addChoice} userDetails={item.choice_user_details} />} // Assuming addChoice is defined
                keyExtractor={user => user._id!}
            />
        </SafeAreaView>
    )
}

export default MyChoice
