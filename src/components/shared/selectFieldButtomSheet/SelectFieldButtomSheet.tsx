import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../../constants/theme';
import UiContext from '../../../contexts/uiContext/UIContext';

const SelectFieldBottomSheet = ({ onClose, groupField, options = [], setSelectItem, onOptionSelect }: any) => {
  const { colors } = useTheme();
  const {
    ui: { language },
  } = useContext(UiContext);

  return (
    <View style={[styles.overlay]}>
      <View style={[styles.bottomSheetContainer, { backgroundColor: colors.surfaceVariant }]}>
        <Text style={[styles.optionText, { color: colors.primary, marginVertical: 20, fontSize: 25 }]}>
          {language === 'BENGALI'
            ? `আপনার ${groupField?.placeHolder?.BENGALI} বেছে নিন`
            : `Choose your ${groupField?.placeHolder?.ENGLISH}`}
        </Text>

        <FlatList
          data={Array.isArray(options) ? options : []} // Ensure data is always an array
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, { borderBottomColor: colors.backdrop }]}
              onPress={() => {
                onOptionSelect({
                  groupField,
                  type: groupField.type,
                  text: item.value ?? item,
                });
                setSelectItem(item?.label ?? item); // Handle missing label
                onClose();
              }}
            >
              <View style={styles.optionContent}>
                {item?.icon?.name && (
                  <FontAwesome5 name={item.icon.name} size={22} color={COLORS.primary} style={styles.icon} />
                )}
                <Text style={[styles.optionText, { color: colors.primary }]}>
                  {language === 'BENGALI' ? item?.label?.BENGALI : item?.label?.ENGLISH ?? item}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => `${item?.value ?? index}`} // Unique key
        />

        <Button
          onPress={onClose}
          mode="contained"
          style={styles.closeButton}
          contentStyle={{ paddingVertical: 5 }}
          textColor="white"
        >
          Close
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
    justifyContent: 'flex-end', // Aligns the bottom sheet at the bottom
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 19,
    color: '#333',
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: 400, // Limits the height of the bottom sheet
  },
  optionButton: {
    padding: 12,
    borderBottomWidth: 1,
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: '#E71B73', // Adjust the color to match your theme
  },
});

export default SelectFieldBottomSheet;
