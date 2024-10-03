import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Adjust the icon import as needed

const CustomDropdown = ({ data, onSelect }: any) => {
  const { colors } = useTheme();

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSearch = (text: any) => {
    setSearchText(text);
    if (text.length > 0) {
      const filtered = data.filter((item: any) => item.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const handleSelect = (item: any) => {
    setSearchText(item);
    setIsDropdownVisible(false);
    onSelect(item);
  };

  return (
    <View style={{ width: '100%' }}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: colors.scrim }]}
          placeholder="Select District"
          value={searchText}
          onChangeText={handleSearch}
          onFocus={() => setIsDropdownVisible(true)}
          placeholderTextColor={'gray'}
        />
        <Icon name="search-location" size={20} color={colors.primary} />
      </View>

      {/* Dropdown list */}
      {isDropdownVisible && (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          style={[styles.dropdown]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.item, { borderBottomColor: colors.surface }]}
              onPress={() => handleSelect(item)}
            >
              <Text style={[styles.itemText, { color: colors.primary }]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 15,
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: colors.border, // Customize as per your theme
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  dropdown: {
    marginTop: 5,
    borderRadius: 20,

    maxHeight: 200, // limit the height of dropdown
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    // borderBottomColor: colors.border,
  },
  itemText: {
    fontSize: 13,
    color: 'black',
  },
});

export default CustomDropdown;
