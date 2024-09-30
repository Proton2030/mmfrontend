import { useContext, useState, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomNavigation, useTheme } from 'react-native-paper';
import Home from './home/Home';
import More from './more/More';
import Location from './location/Location';
import MyChoice from './choice/myChoice/MyChoice';
import ActiveUser from './activeUser/ActiveUser';
import { SafeAreaView, StatusBar, View } from 'react-native';
import UiContext from '../../../contexts/uiContext/UIContext';
import AuthContext from '../../../contexts/authContext/authContext';
import CustomizeAppBar from '../../shared/customizeAppbar/CustomizeAppBar';
import { useFocusEffect } from '@react-navigation/native';

const UserDashboard = () => {
  const { ui } = useContext(UiContext);
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const [index, setIndex] = useState<number>(0);

  const { user } = useContext(AuthContext);
  const [routes] = useState(() => {
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

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (index !== 0) {
          setIndex(0);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [index]),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {ui?.theme === 'DARK' ? (
        <StatusBar backgroundColor={index === 0 ? 'black' : colors.secondary} barStyle={'light-content'} />
      ) : (
        <StatusBar backgroundColor={colors.secondary} barStyle={'dark-content'} />
      )}

      {index !== 0 ? <CustomizeAppBar /> : null}
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
