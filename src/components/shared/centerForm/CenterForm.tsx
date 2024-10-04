import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { ICenterFormProps } from '../../../@types/props/CenterFormProps.types';
import { globalStyles, windowWidth } from '../../../globalStyles/GlobalStyles';
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
          if ('id' in field && object[field.id] === null) console.log('----->field', field.label);
        }
        return (
          <View key={index}>
            {'group' in field && field.group.length > 0 ? (
              <View style={globalStyles.inlineFlex}>
                {field.group.map((groupField, index) => {
                  return (
                    <View key={index} style={globalStyles.inlineFlex}>
                      {'type' in groupField && groupField.type === 'TEXT' ? (
                        <TextInput
                          textColor={colors.scrim}
                          style={{ ...globalStyles.roundedInputBox, width: '97%' }}
                          mode="outlined"
                          id={groupField.id}
                          label={groupField.label}
                          defaultValue={object[groupField.id] || ''}
                          placeholder={groupField.placeHolder}
                          value={object[groupField.id] ? object[groupField.id].toString() : ''}
                          maxLength={groupField.maxLength || 250}
                          onChangeText={(text) => handleChangeText(groupField.id, groupField.type, text)}
                          theme={{
                            colors: {
                              primary: '#E71B73',
                            },
                            roundness: 10,
                          }}
                        />
                      ) : null}
                      {'type' in groupField && groupField.type === 'NUMBER' ? (
                        <TextInput
                          textColor={colors.scrim}
                          style={{ ...globalStyles.roundedInputBox, width: '97%', marginTop: 15 }}
                          mode="outlined"
                          keyboardType="numeric"
                          id={groupField.id}
                          maxLength={groupField.maxLength || 12}
                          label={groupField.label}
                          value={object[groupField.id] ? object[groupField.id].toString() : ''}
                          onChangeText={(text) => handleChangeText(groupField.id, groupField.type, text)}
                          placeholder={groupField.placeHolder}
                          theme={{
                            colors: {
                              primary: '#E71B73',
                            },
                            roundness: 10,
                          }}
                        />
                      ) : null}
                      {'type' in groupField && groupField.type === 'PASSWORD' ? (
                        <TextInput
                          textColor={colors.scrim}
                          style={{ ...globalStyles.roundedInputBox, width: '97%' }}
                          mode="outlined"
                          secureTextEntry={!isPasswordVisible}
                          id={groupField.id}
                          label={groupField.label}
                          defaultValue={object[groupField.id] || ''.toString()}
                          onChangeText={(text) => handleChangeText(groupField.id, groupField.type, text)}
                          placeholder={groupField.placeHolder}
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
                      {'type' in groupField && groupField.type === 'SELECT' ? (
                        <>
                          {/* Label above the dropdown */}
                          <View>
                            <Text style={{ color: colors.scrim }}>{groupField.label}</Text>
                            <SelectDropdown
                              defaultButtonText={
                                object[groupField.id] !== ''
                                  ? typeof object[groupField.id] === 'boolean'
                                    ? object[groupField.id]
                                      ? 'YES'
                                      : 'NO'
                                    : object[groupField.id]
                                  : groupField.label
                              }
                              buttonStyle={{
                                ...globalStyles.selectField,
                                backgroundColor: colors.background,
                                width: '97%',
                              }}
                              searchPlaceHolder={groupField.placeHolder}
                              buttonTextStyle={{
                                ...globalStyles.selectText,
                                color: colors.scrim, // Set the button text color to green
                              }}
                              dropdownIconPosition="right"
                              renderDropdownIcon={() => <Icon name="chevron-down" />}
                              data={groupField.options || []}
                              rowStyle={
                                {
                                  // backgroundColor: colors.background,
                                }
                              }
                              onSelect={(text) => handleChangeText(groupField.id, groupField.type, text)}
                            />
                          </View>
                        </>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            ) : null}
            {'type' in field && field.type === 'TEXT' ? (
              <TextInput
                textColor={colors.scrim}
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
            {'type' in field && field.type === 'NUMBER' ? (
              <TextInput
                textColor={colors.scrim}
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
            {'type' in field && field.type === 'PASSWORD' ? (
              <TextInput
                textColor={colors.scrim}
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
            {'type' in field && field.type === 'SELECT' ? (
              <>
                {/* Label above the dropdown */}
                <Text style={{ color: colors.scrim }}>{field.label}</Text>
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
                  buttonStyle={[globalStyles.selectField, { backgroundColor: colors.background }]}
                  searchPlaceHolder={field.placeHolder}
                  buttonTextStyle={{
                    ...globalStyles.selectText,
                    color: colors.scrim, // Set the button text color to green
                  }}
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
