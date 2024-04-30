import React, { useContext } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import AuthContext from '../../../../contexts/authContext/authContext';

const ProgressContainer = () => {
  const { user } = useContext(AuthContext);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <TouchableOpacity
        onPress={() => {
          // handle onPress
        }}
      >
        <Image alt="" source={{ uri: user?.profile_image_url }} style={styles.avatar} />
      </TouchableOpacity>
      <View>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>{user?.full_name}</Text>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>View Profile</Text>
          </View>
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
    fontWeight: '600',
    color: COLORS.primary,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 9999,
  },
});
