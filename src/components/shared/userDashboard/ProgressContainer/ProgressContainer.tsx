import React, { useContext } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import AuthContext from '../../../../contexts/authContext/authContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProgressContainer = () => {
  const { user } = useContext<any>(AuthContext);
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  // List of user fields from IUserInfo interface
  const userFields = [
    'full_name', 'gender', 'age', 'marital_status', 'state', 'height', 'weight',
    'body_color', 'occupation', 'work_place', 'monthly_income', 'education', 'islamic_education',
    'salah', 'sawum', 'fathers_name', 'fathers_occupation', 'mothers_name', 'mothers_occupation',
    'no_of_brothers', 'no_of_sisters', 'financial_condition', 'status', 'profile_image_url'
  ];

  // Calculate percentage of profile completeness
  const filledFields = userFields.filter(field => user?.[field]);
  const unfilledFields = userFields.filter(field => !user?.[field]);
  const totalFields = userFields.length;
  const completionPercentage = Math.round((filledFields.length / totalFields) * 100);

  // Log unfilled fields
  // console.log('Unfilled fields:', unfilledFields);

  const handleRouteMyProfile = () => {
    navigation.navigate('UserDetails', {
      userDetails: user,
      editable: true,
    });
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Image alt="" source={{ uri: user?.profile_image_url || " " }} style={styles.avatar} />

      <View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.primary }}>{user?.full_name}</Text>
          {
            user?.is_verified ?
              <MaterialIcons name="verified" color={"rgb(29, 155, 240)"} size={20} />
              : null

          }
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderRadius: 8,
            paddingHorizontal: 4,
          }}
          onPress={handleRouteMyProfile}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: colors.tertiary,
            }}
          >
            {completionPercentage === 100
              ? 'View Profile'
              : `${completionPercentage}% Profile Complete`}
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
