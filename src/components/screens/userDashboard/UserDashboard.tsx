import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Appbar, BottomNavigation, Button, Searchbar, Text } from 'react-native-paper';
import Home from './home/Home';
import Choice from './choice/myChoice/MyChoice';
import Matches from './matches/Matches';
import Chats from './chats/Chats';
import More from './more/More';
import { Image, View } from 'react-native';
import { logo } from '../../../assets';
import ChoiceNavigators from '../../navigators/choiceNavigators/ChoiceNavigators';
import Location from './location/Location';

const UserDashboard = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'choice', title: 'Choice', focusedIcon: 'album' },
        { key: 'match', title: 'Matches', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
        { key: 'location', title: 'Location', focusedIcon: 'map-marker', unfocusedIcon: 'map-marker' },
        { key: 'more', title: 'More', focusedIcon: 'menu', unfocusedIcon: 'menu' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        choice: ChoiceNavigators,
        match: Matches,
        location: Location,
        more: More
    });

    return (
        <>
            <Appbar.Header style={{
                backgroundColor: '#fff5f9', shadowColor: '#000000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
            }}>
                <Image source={logo} style={{ width: 40, height: 40, resizeMode: "contain", borderRadius: 20, marginRight: 10 }} />
                <Appbar.Content title="Muslim Matrimony" />
                <Appbar.Action icon="magnify" />
                <Appbar.Action icon="chat-outline" />
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