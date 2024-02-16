import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Appbar, BottomNavigation, Button, Searchbar, Text } from 'react-native-paper';
import Home from './home/Home';
import More from './more/More';
import Location from './location/Location';
import MyChoice from './choice/myChoice/MyChoice';
import ActiveUser from './activeUser/ActiveUser';
import HelpAndSupport from '../others/help&support/HelpSupport';

const UserDashboard = () => {
    const navigation = useNavigation<any>(); // Get the navigation object
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'choice', title: 'Choice', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
        { key: 'activeUser', title: 'Online', focusedIcon: 'podcast', unfocusedIcon: 'podcast' },
        { key: 'location', title: 'Location', focusedIcon: 'map-marker', unfocusedIcon: 'map-marker' },
        { key: 'more', title: 'More', focusedIcon: 'menu', unfocusedIcon: 'menu' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HelpAndSupport,
        choice: MyChoice,
        activeUser: ActiveUser,
        location: Location,
        more: More
    });

    const handleIndexChange = (newIndex: React.SetStateAction<number>) => {
        if (index === 0 && newIndex === 0) {

            navigation.scrollToTop('home');
        }
        setIndex(newIndex);
    };

    return (
        <>
            <BottomNavigation
                sceneAnimationEnabled={true}
                sceneAnimationType='shifting'
                navigationState={{ index, routes }}
                activeColor="#E71B73"
                barStyle={{ backgroundColor: "#fde8f1", height: 62 }}
                onIndexChange={handleIndexChange}
                renderScene={renderScene}
            />
        </>
    );
};

export default UserDashboard;
