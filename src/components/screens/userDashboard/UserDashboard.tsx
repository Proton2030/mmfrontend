import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Appbar, BottomNavigation, Button, Searchbar, Text, useTheme } from 'react-native-paper';
import Home from './home/Home';
import More from './more/More';
import Location from './location/Location';
import MyChoice from './choice/myChoice/MyChoice';
import ActiveUser from './activeUser/ActiveUser';
import HelpAndSupport from '../others/help&support/HelpSupport';
import Drawer from '../../shared/filterDrawer/FilterDrawer';
import { SafeAreaView, StatusBar, View } from 'react-native';
import UiContext from '../../../contexts/uiContext/UIContext';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../../contexts/authContext/authContext';
import CustomizeAppBar from '../../shared/customizeAppbar/CustomizeAppBar';

const UserDashboard = () => {
  const { ui } = useContext(UiContext);

  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [index, setIndex] = React.useState(0);

  const { user } = useContext(AuthContext);

  const [routes] = React.useState(() => {
    const baseRoutes = [{ key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' }];

    // Check if user details are present based on IUserInfo
    if (
      user &&
      user.full_name &&
      user.gender &&
      user.age !== undefined &&
      user.marital_status &&
      user.state &&
      user.height !== undefined &&
      user.weight !== undefined &&
      user.body_color
    ) {
      baseRoutes.push(
        { key: 'choice', title: 'Choice', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
        { key: 'activeUser', title: 'Online', focusedIcon: 'podcast', unfocusedIcon: 'podcast' },
        { key: 'location', title: 'Location', focusedIcon: 'map-marker', unfocusedIcon: 'map-marker' },
      );
    }

    baseRoutes.push({ key: 'more', title: 'More', focusedIcon: 'menu', unfocusedIcon: 'menu' });

    return baseRoutes;
  });
  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    choice: MyChoice,
    activeUser: ActiveUser,
    location: Location,
    more: More,
  });

  const handleIndexChange = (newIndex: React.SetStateAction<number>) => {
    if (index === 0 && newIndex === 0) {
      navigation.scrollToTop('home');
    }
    setIndex(newIndex);
  };

  const routeToChatList = () => {
    navigation.navigate('Chat-List');
  };
  const routeToNotificationList = () => {
    navigation.navigate('Notification');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {ui?.theme === 'DARK' ? (
        <StatusBar backgroundColor={index === 0 ? 'black' : colors.secondary} barStyle={'light-content'} />
      ) : (
        <StatusBar backgroundColor={colors.secondary} barStyle={'dark-content'} />
      )}

      {index !== 0 ? (
        // <Appbar.Header
        //   style={{
        //     backgroundColor: colors.secondary,
        //     shadowColor: '#000000',
        //     shadowOffset: { width: 0, height: 8 },
        //     shadowOpacity: 0.8,
        //     shadowRadius: 20,
        //     borderBottomWidth: 0.5,
        //     borderBottomColor: colors.onSurfaceDisabled,
        //     elevation: 4,
        //   }}
        // >
        //   <Appbar.Content
        //     title="Muslim Matrimony"
        //     titleStyle={{ color: colors.primary, fontFamily: 'cursive', fontSize: 24, fontWeight: 'bold' }}
        //   />

        //   <View style={{ flexDirection: 'row', gap: 8, paddingRight: 10 }}>
        //     <TouchableOpacity onPress={routeToNotificationList}>
        //       <Ionicons name="notifications-outline" size={28} color={colors.primary} />
        //     </TouchableOpacity>
        //     <TouchableOpacity onPress={routeToChatList}>
        //       <Ionicons name="chatbubble-ellipses-outline" size={28} color={colors.primary} />
        //     </TouchableOpacity>
        //   </View>
        // </Appbar.Header>
        <CustomizeAppBar />
      ) : null}
      <BottomNavigation
        sceneAnimationEnabled={true}
        sceneAnimationType="shifting"
        navigationState={{ index, routes }}
        activeColor="#E71B73"
        barStyle={{
          backgroundColor: ui.theme === 'DARK' ? 'black' : colors.background,
          height: 70,
          borderTopColor: ui?.theme === 'DARK' ? colors.surface : colors.onSurfaceDisabled,
          borderTopWidth: 0.5,
        }}
        onIndexChange={handleIndexChange}
        renderScene={renderScene}
      />
    </SafeAreaView>
  );
};

export default UserDashboard;
