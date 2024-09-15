import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { ICenterFormProps } from '../../../@types/props/CenterFormProps.types';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CenterForm = ({ fieldList, handleChangeText, object }: ICenterFormProps) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false); // State to track password visibility
  const { colors } = useTheme();
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <ScrollView style={globalStyles.innerContainer}>
      {fieldList.map((field, index) => {
        {
          if (object[field.id] === null) console.log('----->field', field.label);
        }
        return (
          <View key={index}>
            {field.type === 'TEXT' ? (
              <TextInput
                textColor={colors.tertiary}
                style={globalStyles.roundedInputBox}
                mode="outlined"
                id={field.id}
                label={field.label}
                defaultValue={object[field.id] || ''}
                placeholder={field.placeHolder}
                value={object[field.id] ? object[field.id].toString() : ''}
                maxLength={field.maxLength || 250}
                onChangeText={(text) => handleChangeText(field.id, field.type, text)}
                theme={{
                  colors: {
                    primary: '#E71B73',
                  },
                  roundness: 10,
                }}
              />
            ) : null}
            {field.type === 'NUMBER' ? (
              <TextInput
                textColor={colors.tertiary}
                style={globalStyles.roundedInputBox}
                mode="outlined"
                keyboardType="numeric"
                id={field.id}
                maxLength={field.maxLength || 12}
                label={field.label}
                value={object[field.id] ? object[field.id].toString() : ''}
                onChangeText={(text) => handleChangeText(field.id, field.type, text)}
                placeholder={field.placeHolder}
                theme={{
                  colors: {
                    primary: '#E71B73',
                  },
                  roundness: 10,
                }}
              />
            ) : null}
            {field.type === 'PASSWORD' ? (
              <TextInput
                textColor={colors.tertiary}
                style={globalStyles.roundedInputBox}
                mode="outlined"
                secureTextEntry={!isPasswordVisible}
                id={field.id}
                label={field.label}
                defaultValue={object[field.id] || ''.toString()}
                onChangeText={(text) => handleChangeText(field.id, field.type, text)}
                placeholder={field.placeHolder}
                theme={{
                  colors: {
                    primary: '#E71B73',
                  },
                  roundness: 10,
                }}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? 'eye-off' : 'eye'}
                    style={{ marginTop: 15 }}
                    onPress={togglePasswordVisibility}
                  />
                }
              />
            ) : null}
            {field.type === 'SELECT' ? (
              <>
                {/* Label above the dropdown */}
                <Text style={{ color: colors.tertiary }}>{field.label}</Text>
                <SelectDropdown
                  defaultButtonText={
                    object[field.id] !== ''
                      ? typeof object[field.id] === 'boolean'
                        ? object[field.id]
                          ? 'YES'
                          : 'NO'
                        : object[field.id]
                      : field.label
                  }
                  buttonStyle={globalStyles.selectField}
                  searchPlaceHolder={field.placeHolder}
                  buttonTextStyle={globalStyles.selectText}
                  dropdownIconPosition="right"
                  renderDropdownIcon={() => <Icon name="chevron-down" />}
                  data={field.options || []}
                  onSelect={(text) => handleChangeText(field.id, field.type, text)}
                />
              </>
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default CenterForm;
