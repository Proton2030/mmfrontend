import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { ICenterFormProps } from '../../../@types/props/CenterFormProps.types';
import { globalStyles, windowWidth } from '../../../globalStyles/GlobalStyles';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UiContext from '../../../contexts/uiContext/UIContext';
import { selectLanguage } from '../../../utils/commonFunction/languageSelect';
import { SelectField } from '../selectField/SelectField';
import SelectFieldBottomSheet from '../selectFieldButtomSheet/SelectFieldButtomSheet';

const CenterForm = ({ fieldList, handleChangeText, object }: ICenterFormProps) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false); // State to track password visibility
  const {
    ui: { language },
  } = useContext(UiContext);
  const { colors } = useTheme();
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedFieldOptions, setSelectedFieldOptions] = useState([]);
  const [selectGroupfield, setSelectGroupfield] = useState([]);
  const [selectItem, setSelectItem] = useState(null);

  const openBottomSheet = (options: any, group: any) => {
    setSelectedFieldOptions(options); // Set the options for the clicked field
    setSelectGroupfield(group)
    setBottomSheetVisible(true); // Show the bottom sheet
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false); // Hide the bottom sheet
  };
  const handleChoseOption = ({ groupField, type, text }: any) => {
    console.log("handle choose===>", groupField.id, type, text);
    handleChangeText(groupField.id, groupField.type, text)
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
                {field.group.map((groupField: any, index) => {
                  return (
                    <View key={index} style={globalStyles.inlineFlex}>
                      {'type' in groupField && groupField.type === 'TEXT' ? (
                        <TextInput
                          textColor={colors.scrim}
                          style={{ ...globalStyles.roundedInputBox, width: '97%' }}
                          mode="outlined"
                          id={groupField.id}
                          label={selectLanguage(groupField.label, language)}
                          defaultValue={object[groupField.id] || ''}
                          placeholder={selectLanguage(groupField.placeHolder, language)}
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
                          label={selectLanguage(groupField.label, language)}
                          value={object[groupField.id] ? object[groupField.id].toString() : ''}
                          onChangeText={(text) => handleChangeText(groupField.id, groupField.type, text)}
                          placeholder={selectLanguage(groupField.placeHolder, language)}
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
                          label={selectLanguage(groupField.label, language)}
                          defaultValue={object[groupField.id] || ''.toString()}
                          onChangeText={(text) => handleChangeText(groupField.id, groupField.type, text)}
                          placeholder={selectLanguage(groupField.placeHolder, language)}
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
                          <View>
                            <TouchableOpacity
                              style={{ height: 50, width: 190 }}
                              onPress={() => openBottomSheet(groupField.options, groupField)} // Pass the specific options of the clicked field
                            // activeOpacity={0.7} // Optional: control the touch opacity effect
                            >
                              <View pointerEvents="none">
                                <TextInput
                                  textColor={colors.scrim}
                                  style={{ ...globalStyles.roundedInputBox, width: '97%' }}
                                  mode="outlined"
                                  label={selectLanguage(groupField.label, language)}
                                  id={groupField.id}
                                  editable={false} // Disable direct text input
                                  defaultValue={object[groupField.id] || ''.toString()}
                                  value={object[groupField.id] || ''.toString()} // Display placeholder or selected value
                                />
                              </View>
                            </TouchableOpacity>

                            {/* Pass the dynamically set options to the bottom sheet */}
                            <SelectFieldBottomSheet
                              isVisible={isBottomSheetVisible}
                              onClose={closeBottomSheet}
                              options={selectedFieldOptions} // Dynamically pass the options
                              onOptionSelect={handleChoseOption}
                              groupField={selectGroupfield}
                              language={language}
                              setSelectItem={setSelectItem}
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
                label={selectLanguage(field.label, language)}
                defaultValue={object[field.id] || ''}
                placeholder={selectLanguage(field.placeHolder, language)}
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
                label={selectLanguage(field.label, language)}
                value={object[field.id] ? object[field.id].toString() : ''}
                onChangeText={(text) => handleChangeText(field.id, field.type, text)}
                placeholder={selectLanguage(field.placeHolder, language)}
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
                label={selectLanguage(field.label, language)}
                defaultValue={object[field.id] || ''.toString()}
                onChangeText={(text) => handleChangeText(field.id, field.type, text)}
                placeholder={selectLanguage(field.placeHolder, language)}
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

                <View>
                  <TouchableOpacity
                    style={{ height: 50, width: 190, marginTop: 15 }}
                    onPress={() => openBottomSheet(field.options, field)} // Pass the specific options of the clicked field
                    activeOpacity={0.7} // Optional: control the touch opacity effect
                  >
                    <View pointerEvents="none" style={{ marginBottom: 15 }}>
                      <TextInput
                        textColor={colors.scrim}
                        style={{ ...globalStyles.roundedInputBox, width: '197%', }}
                        mode="outlined"
                        label={selectLanguage(field.label, language)}
                        id={field.id}
                        editable={false} // Disable direct text input
                        defaultValue={object[field.id] || ''.toString()}
                        value={object[field.id] || ''.toString()} // Display placeholder or selected value
                      />
                    </View>
                  </TouchableOpacity>

                  {/* Pass the dynamically set options to the bottom sheet */}
                  <SelectFieldBottomSheet
                    isVisible={isBottomSheetVisible}
                    onClose={closeBottomSheet}
                    options={selectedFieldOptions} // Dynamically pass the options
                    onOptionSelect={handleChoseOption}
                    groupField={selectGroupfield}
                    language={language}
                    setSelectItem={setSelectItem}
                  />
                </View>
              </>
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default CenterForm;
