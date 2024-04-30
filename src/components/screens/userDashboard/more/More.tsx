import { View, Text, ScrollView, Image } from 'react-native';
import React, { useContext } from 'react';
import SmallCard from '../../../shared/smallCard/SmallCard';
import { MENU_OPTION } from '../../../../constants/MenuOption';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import AuthContext from '../../../../contexts/authContext/authContext';
import { useNavigation } from '@react-navigation/native';
import UiContext from '../../../../contexts/uiContext/UIContext';
import PointDashBoard from '../../../shared/userDashboard/PointDashBoard';

const More = () => {
  const { colors } = useTheme();
  const {
    ui: { language },
  } = useContext(UiContext);
  const navigation = useNavigation<any>();
  const { user } = useContext(AuthContext);
  const routeToChatList = () => {
    navigation.navigate('Chat-List');
  };
  const routeToNotificationList = () => {
    navigation.navigate('Notification');
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <PointDashBoard />
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        {MENU_OPTION.map((menu, index) => {
          return <SmallCard icon={menu.icon} route={menu.route} text={menu.text[language]} key={index} />;
        })}
      </View>
    </ScrollView>
  );
};

export default More;
