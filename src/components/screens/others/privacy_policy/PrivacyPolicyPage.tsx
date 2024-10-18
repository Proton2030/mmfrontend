import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRIVACY_POLICY_URL } from '../../../../config/config';

export default function Example() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Appbar.Header style={{ backgroundColor: colors.secondary, paddingLeft: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={colors.primary} style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: '500', fontSize: 23, color: colors.primary }}>Privacy and Policy</Text>
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <WebView source={{ uri: PRIVACY_POLICY_URL }} style={{ flex: 1 }} />
      </ScrollView>
    </View>
  );
}
