import { RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl,
  Text,
  Modal,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  DrawerLayoutAndroid,
  Image,
} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Badge,
  Button,
  Checkbox,
  IconButton,
  Portal,
  Searchbar,
  Tooltip,
  useTheme,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../contexts/authContext/authContext';
import { api } from '../../../../utils/api';
import UserCard from '../../../shared/userCard/UserCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IUserDetails } from '../../../../@types/types/userDEtails.types';
import { shuffleArray } from '../../../../utils/commonFunction/suffleArray';
import _ from 'lodash';
import SmallLoader from '../../../shared/smallLoader/SmallLoader';
import { handleVibrate } from '../../../../utils/commonFunction/systemvibration';
import axios from 'axios'; // Import axios
import { MessageSeenCountContext } from '../../../../contexts/messageSeenContext/MessageSeenCountContextProvider';
import FilterDrawer from '../../../shared/filterDrawer/FilterDrawer';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { DrawerLayout } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UiContext from '../../../../contexts/uiContext/UIContext';
import { fullLogo, logo, noR } from '../../../../assets';
import { BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { ui } = useContext(UiContext);
  const { user } = useContext(AuthContext);
  const { setMessageSeenCount } = useContext(MessageSeenCountContext);
  const { messageSeenCount } = useContext(MessageSeenCountContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [suggestedUser, setSuggestedUser] = useState<IUserDetails[]>([]);
  const [topIcon, setTopIcon] = useState<boolean>(false);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [maritalStatus, setMaritalStatus] = useState<string>('');
  const [hasSalah, setHasSalah] = useState<string>('');
  const [hasSawm, setHasSawm] = useState<string>('');
  const [sliderValue, setSliderValue] = useState<number>(80);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [showOverlay, setShowOverlay] = useState(false);
  const drawerRef = useRef<any>(null);

  useEffect(() => {
    if (drawerVisible) {
      setTimeout(() => {
        setShowOverlay(true);
      }, 500);
    } else {
      setShowOverlay(false);
    }
  }, [drawerVisible]);

  const toggleDrawer = () => {
    console.log('Toggle drawer function called');
    setDrawerVisible(!drawerVisible);
    Animated.timing(animation, {
      toValue: drawerVisible ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const flatListRef = useRef<any>(null);
  const handleScrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      setTopIcon(false);
    }
  };
  const handleBackPress = () => {
    if (drawerRef.current && typeof drawerRef.current.isDrawerOpen === 'function') {
      if (drawerRef.current.isDrawerOpen()) {
        drawerRef.current.closeDrawer();
        return true; // Prevent default back button behavior
      }
    }
    return false; // Otherwise, let the default behavior occur
  };

  // Add back button event listener on component mount
  useEffect(() => {
    // Add event listener

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    // Clean up event listener on unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);
  const hideFilterModal = async (filterOptions: {
    maritalStatus: any;
    hasSalah: any;
    hasSawm: any;
    location: any;
    minAge: number | null;
    maxAge: number | null;
  }) => {
    const gender = user?.gender === 'MALE' ? 'FEMALE' : 'MALE';
    console.log(filterOptions);
    try {
      // Combine minAge and maxAge into a single age range string

      const params = {
        minAge: filterOptions?.minAge,
        maxAge: filterOptions?.maxAge,
        gender: gender,
        marital_status: filterOptions?.maritalStatus,
        salah: filterOptions?.hasSalah,
        sawum: filterOptions?.hasSawm,
        state: filterOptions?.location,
      };

      // Perform the API call with the params
      const response = await api.filter.getFilterList(params);

      // Update suggested users based on the response
      setSuggestedUser(response);

      // Close the drawer
      toggleDrawer();
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const addChoice = useCallback(async (sender_id: string, reciver_id: string) => {
    const payload = {
      senderId: sender_id,
      recieverId: reciver_id,
    };
    console.log('-------->payload', payload);
    try {
      handleVibrate();
      await api.userChoice.addChoice(payload);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getSuggestionUserApi = async (mode: string) => {
    console.log('calling api2', page);
    if (user) {
      const filter = {
        gender: user.gender,
        page: page,
        limit: 5,
      };
      try {
        const userlist = await api.userDetails.getAllSuggestionUser(filter);
        if (mode === 'REFRESH') {
          setSuggestedUser([]);
          setSuggestedUser(shuffleArray(userlist));
        } else {
          setSuggestedUser((prevUserList) => prevUserList.concat(userlist));
        }
        setRefreshing(false);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setRefreshing(false);
        // setLoading(false);
      }
    }
  };
  const getSuggestionUser = useCallback(async () => {
    getSuggestionUserApi('REFRESH');
  }, [user, page]);

  const debouncedFetchData = _.debounce(() => {
    getSuggestionUserApi('SCROLL');
  }, 500);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentPosition: number = event.nativeEvent.contentOffset.y;
    if (currentPosition > 0) {
      setTopIcon(true);
    } else {
      setTopIcon(false);
    }
    if (currentPosition > page * 1000) {
      setPage((prev) => prev + 1);
      debouncedFetchData();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setIsSearch(false);
    // setSuggestedUser([])
    // getSuggestionUserApi("REFRESH");
    getSuggestionUser();
    setFilterModalVisible(false);
  };
  const handleRefreshFilters = () => {
    setMaritalStatus('');
    setHasSalah('');
    setHasSawm('');
    setFilterModalVisible(false);
  };
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    let suggestTempList = shuffleArray(suggestedUser);
    setSuggestedUser(suggestTempList);
  }, [suggestedUser]);

  const handleSearch = async () => {
    if (user) {
      const filter = {
        gender: user.gender,
        name: searchQuery,
      };
      try {
        const response = await axios.get('/search-filter', { params: filter });
        setSuggestedUser(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const routeToChatList = () => {
    navigation.navigate('Chat-List');
  };
  const routeToNotificationList = () => {
    navigation.navigate('Notification');
  };

  const handlegGetUnseenMessageCount = useCallback(async () => {
    if (user) {
      const response = await api.chat.getUnseenMessageCount({ userObjectId: user._id });
      console.log(user._id);
      setMessageSeenCount(response);
      console.log('=====>unseen message count', response);
    }
  }, [user]);

  const openDrawer = () => {
    if (drawerRef.current) {
      console.log('Opening drawer');
      drawerRef.current.openDrawer();
    } else {
      console.warn('Drawer reference is null. Unable to open drawer.');
    }
  };
  const closeDrawer = () => {
    if (drawerRef.current) {
      console.log('closing drawer');
      drawerRef.current.closeDrawer();
    } else {
      console.warn('Drawer reference is null. Unable to open drawer.');
    }
  };

  useEffect(() => {
    // Set a timeout to turn off loading after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3000 milliseconds = 3 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  const handleSearchBar = () => {
    setIsSearch(!isSearch);
  };
  const LogCount = () => {
    console.log('-------------->Message seen count', messageSeenCount);
  };
  useEffect(() => {
    getSuggestionUser();
  }, []);

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
    }
  }, [refreshing]);
  const [active, setActive] = useState('');
  useEffect(() => {
    handlegGetUnseenMessageCount();
  }, [handlegGetUnseenMessageCount]);

  return (
    <LinearGradient colors={['#fce8f1', '#ffffff', '#ffffff']} style={globalStyles.parentScrollContainer2}>
      <View style={{ flex: 1 }}>
        <DrawerLayout
          ref={drawerRef}
          drawerWidth={330}
          drawerPosition="right"
          drawerBackgroundColor={colors.background}
          renderNavigationView={() => (
            <FilterDrawer closeDrawer={closeDrawer} toggleDrawer={toggleDrawer} applyFilters={hideFilterModal} />
          )}
        >
          <Appbar.Header
            style={{
              backgroundColor: ui?.theme === 'DARK' ? colors.surface : 'transparent',
              borderBottomColor: colors.onSurfaceDisabled,
              borderTopColor: ui?.theme === 'DARK' ? colors.surface : colors.onSurfaceDisabled,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 10,
            }}
          >
            {/* <Appbar.Content
              title="Muslim Matrimony"
              titleStyle={{ color: colors.primary, fontFamily: 'cursive', fontSize: 24, fontWeight: 'bold' }}
            /> */}
            <View
              style={{
                alignItems: 'center',
                paddingLeft: 10,
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <Image
                style={{ height: 45, width: 45, borderRadius: 99, paddingLeft: 20 }}
                source={{
                  uri:
                    user?.profile_image_url ||
                    'https://media.istockphoto.com/id/1227172416/photo/portrait-of-brazilian-young-woman-looking-at-camera.jpg?s=612x612&w=is&k=20&c=ybXWtTOxPLBJ6_t2crLO7IuA29vjOg_RQxB3oFaGTRc=',
                }}
              />
              <View>
                <Text style={{ fontWeight: '600', color: colors.onBackground, fontSize: 18 }}>{user?.full_name}</Text>
                <Text style={{ fontWeight: '600', color: colors.tertiary, fontSize: 12 }}>Kolkata , West Bengal</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', gap: 8, paddingRight: 10 }}>
              <TouchableOpacity onPress={openDrawer}>
                <Ionicons name="filter-outline" size={28} color={colors.primary} />
              </TouchableOpacity>
              <Badge
                visible={messageSeenCount > 0}
                size={16}
                style={{ position: 'absolute', top: 0, right: 2, backgroundColor: colors.primary }}
              >
                {messageSeenCount}
              </Badge>
              <TouchableOpacity onPress={routeToNotificationList}>
                <Ionicons name="notifications-outline" size={26} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={routeToChatList}>
                <Ionicons name="chatbubble-ellipses-outline" size={26} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </Appbar.Header>
          {suggestedUser?.length === 0 && (
            <>
              <Image
                style={{
                  height: 350,
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 100,
                }}
                source={noR}
              />
              <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '600', color: colors.scrim }}>
                No result found
              </Text>
            </>
          )}
          {isSearch && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Searchbar
                style={{
                  flex: 1,
                  margin: 10,
                  backgroundColor: '#fff5f9',
                }}
                elevation={3}
                placeholder="Search User"
                onChangeText={(query) => {
                  setSearchQuery(query);
                }}
                onClearIconPress={handleClear}
                value={searchQuery}
                onSubmitEditing={handleSearch}
              />
            </View>
          )}
          {loading ? (
            <ActivityIndicator size="small" color="#E71B73" style={{ marginTop: 10 }} />
          ) : (
            <FlatList
              ref={flatListRef}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
              onScroll={handleScroll}
              scrollEventThrottle={50}
              data={suggestedUser}
              renderItem={({ item }) => <UserCard addChoice={addChoice} userDetails={item} mode="NORMAL" />}
              keyExtractor={(user, index) => `${index}`}
              ListFooterComponent={() => <>{loading ? <SmallLoader /> : null}</>}
            />
          )}
        </DrawerLayout>

        {topIcon && (
          <View
            style={{
              position: 'absolute',
              bottom: 80,
              right: 16,
              backgroundColor: '#E71B73',
              padding: 0,
              borderRadius: 50,
            }}
          >
            <Tooltip title="Selected Camera">
              <IconButton icon="arrow-up" size={30} iconColor="white" onPress={handleScrollToTop} />
            </Tooltip>
          </View>
        )}
      </View>

      {/* {drawerVisible && <View style={globalStyles.overlay} />}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          right: drawerVisible ? 0 : -80,
          width: '100%',
          height: '100%',
          transform: [{ translateX }],
          paddingLeft: 10,
        }}
      >
        <View style={{ backgroundColor: 'white', position: 'absolute', right: 0, width: '80%', height: '100%' }}>
          <FilterDrawer toggleDrawer={toggleDrawer} applyFilters={hideFilterModal} />
        </View>
      </Animated.View> */}
    </LinearGradient>
  );
};

export default Home;
