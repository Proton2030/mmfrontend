import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Appbar, BottomNavigation, Button, Searchbar, Text } from 'react-native-paper';
import Home from './home/Home';
import Matches from './matches/Matches';
import More from './more/More';
import Location from './location/Location';
import MyChoice from './choice/myChoice/MyChoice';


const UserDashboard = () => {
    const [index, setIndex] = React.useState(0);
    const [isSearch, setIsSearch] = React.useState<boolean>(false);
    const navigation = useNavigation<any>();
    const handleSearch = () => {
        setIsSearch(!isSearch);
    }
    const [routes] = React.useState([
        { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'choice', title: 'Choice', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
        { key: 'match', title: 'Matches', focusedIcon: 'plus-circle', unfocusedIcon: 'plus-circle-outline' },
        { key: 'location', title: 'Location', focusedIcon: 'map-marker', unfocusedIcon: 'map-marker' },
        { key: 'more', title: 'More', focusedIcon: 'menu', unfocusedIcon: 'menu' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: () => <Home isSearch={isSearch} setIsSearch={setIsSearch} />,
        choice: MyChoice,
        match: Matches,
        location: Location,
        more: More
    });

    const routeToChatList = () => {
        navigation.navigate("Chat-List");
    }
    const routeToNotificationList = () => {
        navigation.navigate("Notification");
    }

    return (
        <>
            <Appbar.Header style={{
                backgroundColor: '#fde8f1', shadowColor: '#000000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
            }}>
                <Appbar.Content title="Muslim Matrimony" titleStyle={{ color: "#E71B73", fontFamily: "cursive", fontSize: 24, fontWeight: 'bold' }} />
                <Appbar.Action icon="magnify" onPress={handleSearch} />
                <Appbar.Action icon="chat-outline" onPress={routeToChatList} />
                <Appbar.Action icon="bell-outline" onPress={routeToNotificationList} />
            </Appbar.Header>

            <BottomNavigation
                navigationState={{ index, routes }}
                activeColor="#E71B73"
                barStyle={{ backgroundColor: "#fff5f9" }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </>
    );
};

export default UserDashboard;