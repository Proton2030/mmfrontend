import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import { Card, useTheme } from 'react-native-paper';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { TMenuProps } from '../../../@types/props/MenuProps.types';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../contexts/authContext/authContext';
import CustomDialog from '../customDialog/CustomDialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UiContext from '../../../contexts/uiContext/UIContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SmallCard = ({ icon, text, route }: TMenuProps) => {
  const navigation = useNavigation<any>();
  const { user, setUser } = useContext(AuthContext);
  const { ui } = useContext(UiContext);
  const { colors } = useTheme();
  const [visible, setVisible] = useState<boolean>(false);
  const handleRouteMyProfile = () => {
    navigation.navigate('UserDetails', {
      userDetails: user,
      editable: true,
    });
  };
  const handleRouteTerms = () => {
    navigation.navigate('Terms');
  };
  const handleRoutePaymentHistory = () => {
    navigation.navigate('paymentHistory');
  };
  const handleRoutePrivacy = () => {
    navigation.navigate('Privacy');
  };
  const handleRouteSupport = () => {
    navigation.navigate('Support');
  };
  const handleRouteAboutus = () => {
    navigation.navigate('About Us');
  };
  const handleRouteSettings = () => {
    navigation.navigate('Settings');
  };
  const handleLogOut = () => {
    AsyncStorage.clear();
    setUser(null);
    setVisible(false);
  };
  const handleClick = () => {
    switch (route) {
      case 'Logout':
        setVisible(true);
        return;
      case 'My Profile':
        handleRouteMyProfile();
        return;
      case 'Terms and Condition':
        handleRouteTerms();
        return;
      case 'Privacy Policy':
        handleRoutePrivacy();
        return;
      case 'Privacy Policy':
        handleRoutePrivacy();
        return;
      case 'Settings':
        handleRouteSettings();
        return;
      case 'Help and Support':
        handleRouteSupport();
        return;
      case 'paymentHistory':
        handleRoutePaymentHistory();
        return;
    }
  };
  return (
    <>
      <Card
        contentStyle={{ backgroundColor: colors.surface, borderRadius: 12 }}
        style={globalStyles.menuCard}
        onPress={handleClick}
      >
        <Card.Content>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 2,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
              }}
            >
              <Icon name={icon} size={18} color="#E71B73" />
              <Text style={{ color: colors.scrim }}>{text}</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={18} color={colors.primary} />
          </View>
        </Card.Content>
      </Card>
      <CustomDialog
        title={'Are You Confirm to Logout ?'}
        leftLabel={'Cancel'}
        rightLabel={'Logout'}
        body={''}
        visible={visible}
        hideDialog={() => {
          setVisible(false);
        }}
        handleRightButtonClick={handleLogOut}
      />
    </>
  );
};

export default SmallCard;
