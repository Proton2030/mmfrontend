import { NativeSyntheticEvent, NativeScrollEvent, FlatList } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChoiceMatchCard from '../../../../shared/choiceMatchCard/ChoiceMatchCard'
import { api } from '../../../../../utils/api'
import AuthContext from '../../../../../contexts/authContext/authContext'

const MyChoice: React.FC<any> = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [choiceList, setChoiceList] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);

    const getChoiceUser = useCallback(async () => {
        if (user) {
            const filter = {
                page: page,
                first_user_profile_object_id: user._id,
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
    }, [user, page, navigation]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentPosition: number = event.nativeEvent.contentOffset.y;
        if (currentPosition > page * 100) {
            setPage(prev => prev + 1);
        }
    };
    useEffect(() => {
        getChoiceUser();
    }, [getChoiceUser]);
    return (
        <SafeAreaView style={{ padding: 10 }}>
            <FlatList
                onScroll={handleScroll}
                scrollEventThrottle={16}
                data={choiceList}
                renderItem={({ item }) => <ChoiceMatchCard status='MY-CHOICE' name={item.choice_user_details.full_name} state={item.choice_user_details.state} />} // Assuming addChoice is defined
                keyExtractor={user => user._id!} // Assuming email is a unique identifier
            />
        </SafeAreaView>
    )
}

export default MyChoice