import React, { useMemo } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../../constants/theme';

const SelectFieldBottomSheet = ({
  isVisible,
  onClose,
  options,
  onOptionSelect,
  groupField,
  language,
  setSelectItem,
}: any) => {
  const { colors } = useTheme();
  console.log('==>called bottom sheet');

  const renderedOptions = useMemo(() => {
    return options.map((option: any, index: any) => (
      <TouchableOpacity
        key={index}
        style={[styles.optionButton, { borderBottomColor: colors.backdrop }]}
        onPress={() => {
          onOptionSelect({
            groupField, // Pass the entire groupField object
            type: groupField.type, // Pass the type
            text: option.value ? option.value : option, // Pass the selected option value
          });
          setSelectItem(option?.label);
          onClose(); // Close the bottom sheet after selecting an option
        }}
      >
        <View style={styles.optionContent}>
          <FontAwesome5 name={option?.icon?.name} size={22} color={COLORS.primary} style={styles.icon} />
          {option?.label ? (
            <Text style={[styles.optionText, { color: colors.primary }]}>
              {language === 'BENGALI' ? option?.label?.BENGALI : option?.label?.ENGLISH}
            </Text>
          ) : (
            <Text style={[styles.optionText, { color: colors.primary }]}>{option}</Text>
          )}
        </View>
      </TouchableOpacity>
    ));
  }, [options, colors.backdrop, colors.primary, groupField, language, onOptionSelect, onClose, setSelectItem]);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose} // Handles closing the modal when user taps outside or back button is pressed
    >
      <View style={styles.overlay}>
        <View style={[styles.bottomSheetContainer, { backgroundColor: colors.surfaceVariant }]}>
          {language === 'BENGALI' ? (
            <Text style={[styles.optionText, { color: colors.primary, marginVertical: 20, fontSize: 25 }]}>
              আপনার {groupField?.placeHolder?.BENGALI} বেছে নিন
            </Text>
          ) : (
            <Text style={[styles.optionText, { color: colors.primary, marginVertical: 20, fontSize: 25 }]}>
              Choose your {groupField?.placeHolder?.ENGLISH}
            </Text>
          )}

          <ScrollView>{renderedOptions}</ScrollView>
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
    </Modal>
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
