import React, { useContext } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import AuthContext from '../../../../contexts/authContext/authContext';
import { useNavigation } from '@react-navigation/native';
import { Card, useTheme } from 'react-native-paper';

const ProgressContainer = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const handleRouteMyProfile = () => {
    navigation.navigate('UserDetails', {
      userDetails: user,
      editable: true,
    });
  };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Image alt="" source={{ uri: user?.profile_image_url }} style={styles.avatar} />

      <View>
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary }}>{user?.full_name}</Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderRadius: 8,
            paddingHorizontal: 4,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: colors.tertiary,
            }}
          >
            View Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProgressContainer;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
    backgroundColor: '#fde8f1',
    marginTop: 5,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.grey,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 9999,
  },
});
