import { View, Text, ScrollView, Image } from 'react-native';
import React, { useContext } from 'react';
import SmallCard from '../../../shared/smallCard/SmallCard';
import { MENU_OPTION } from '../../../../constants/MenuOption';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { Appbar, Avatar, Card, useTheme } from 'react-native-paper';
import AuthContext from '../../../../contexts/authContext/authContext';
import { useNavigation } from '@react-navigation/native';
import UiContext from '../../../../contexts/uiContext/UIContext';
import PointDashBoard from '../../../shared/userDashboard/PointDashBoard';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { storeData } from '../../../../utils/commonFunction/storeData';

const More = () => {
  const { colors } = useTheme();
  const { ui, setUi } = useContext(UiContext);

  const navigation = useNavigation<any>();
  const handleThemeChange = (theme: 'LIGHT' | 'DARK') => {
    console.log('coik');
    if (theme) {
      console.log(theme);
      setUi({ ...ui, theme });
      console.log('===>theme', ui.theme);
      const changetheme = JSON.stringify({ ...ui, theme });
      storeData('@ui', changetheme);
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginTop: 10,
          marginBottom: 6,
        }}
      >
        <Text style={{ fontWeight: '600', fontSize: 22, color: colors.scrim }}>Menu</Text>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          {ui.theme === 'DARK' ? (
            <TouchableOpacity
              style={{
                borderRadius: 12,
                marginHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                gap: 2,
              }}
              onPress={() => handleThemeChange('LIGHT')}
            >
              <FeatherIcon color={colors.scrim} name="sun" size={24} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                borderRadius: 12,
                marginHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                gap: 2,
              }}
              onPress={() => handleThemeChange('DARK')}
            >
              <FeatherIcon color={colors.scrim} name="moon" size={24} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              borderRadius: 12,
              marginHorizontal: 8,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              gap: 2,
            }}
            onPress={() => navigation.navigate('Settings')}
          >
            <FeatherIcon color={colors.scrim} name="settings" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <PointDashBoard />
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        {MENU_OPTION.map((menu, index) => {
          return <SmallCard icon={menu.icon} route={menu.route} text={menu.text[ui.language]} key={index} />;
        })}
      </View>
    </ScrollView>
  );
};

export default More;
