import { View, Text, TouchableOpacity, Image } from 'react-native';
import { appBarStyles } from './CustomizeAppbarStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { fullLogo } from '../../../assets';

const CustomizeAppBar = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const routeToChatList = () => {
    navigation.navigate('Chat-List');
  };
  const routeToNotificationList = () => {
    navigation.navigate('Notification');
  };

  return (
    <View
      style={[appBarStyles.parent, { backgroundColor: colors.secondary, borderBottomColor: colors.onSurfaceDisabled }]}
    >
      <View style={appBarStyles.child}>
        <Image source={fullLogo} style={{ width: '50%', resizeMode: 'contain', height: 45 }} />
        <View style={{ flexDirection: 'row', gap: 8, paddingRight: 10 }}>
          <TouchableOpacity onPress={routeToNotificationList}>
            <Ionicons name="notifications-outline" size={28} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={routeToChatList}>
            <Ionicons name="chatbubble-ellipses-outline" size={28} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomizeAppBar;
