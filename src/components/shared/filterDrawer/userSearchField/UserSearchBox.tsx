import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBox = ({ username, setUsername }: any) => {
  const { colors } = useTheme();
  return (
    <View style={{ width: '100%' }}>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, { color: colors.scrim }]}
          placeholder="Search Name"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={'gray'}
        />
        <Icon name="account-search" size={24} color={colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 15,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default SearchBox;
