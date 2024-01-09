import { NativeSyntheticEvent, NativeScrollEvent, FlatList } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChoiceMatchCard from '../../../../shared/choiceMatchCard/ChoiceMatchCard'
import { api } from '../../../../../utils/api'
import AuthContext from '../../../../../contexts/authContext/authContext'

const ChooseMe = () => {
    const { user } = useContext(AuthContext);
    const [choiceList, setChoiceList] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);

    const getChooseMeUser = useCallback(async () => {
        if (user) {
            const filter = {
                page: page,
                choice_user_profile_object_id: user._id,
                status: "CHOICE"
            }
            try {
                const userlist = await api.userChoice.getChoice(filter);
                setChoiceList(prevUserList => prevUserList.concat(userlist));
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
        getChooseMeUser();
        return () => {
            console.log('Component will unmount');
            setChoiceList([]);
        };
    }, [getChooseMeUser]);
    return (
        <SafeAreaView style={{ padding: 10 }}>
            <FlatList
                onScroll={handleScroll}
                scrollEventThrottle={16}
                data={choiceList}
                renderItem={({ item }) => <ChoiceMatchCard status='CHOICE-ME' choiceMatchId={item._id} name={item.choice_user_details.full_name} state={item.choice_user_details.state} />} // Assuming addChoice is defined
                keyExtractor={user => user._id!} // Assuming email is a unique identifier
            />
        </SafeAreaView>
    )
}

export default ChooseMe