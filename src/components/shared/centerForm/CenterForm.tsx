import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper';
import { ICenterFormProps } from '../../../@types/props/CenterFormProps.types';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CenterForm = ({ fieldList, handleChangeText }: ICenterFormProps) => {
    return (
        <ScrollView style={globalStyles.innerContainer}>
            {
                fieldList.map((field, index) => {
                    return (
                        <View key={index}>
                            {
                                field.type === "TEXT" ?
                                    <TextInput
                                        style={globalStyles.roundedInputBox}
                                        mode="outlined"
                                        id={field.id}
                                        label={field.label}
                                        placeholder={field.placeHolder}
                                        onChangeText={(text) => handleChangeText(field.id, field.type, text)}
                                        theme={{
                                            colors: {
                                                primary: '#E71B73'
                                            },
                                            roundness: 10
                                        }}
                                    /> : null
                            }
                            {
                                field.type === "NUMBER" ?
                                    <TextInput
                                        style={globalStyles.roundedInputBox}
                                        mode="outlined"
                                        keyboardType='numeric'
                                        id={field.id}
                                        label={field.label}
                                        onChangeText={(text) => handleChangeText(field.id, field.type, text)}
                                        placeholder={field.placeHolder}
                                        theme={{
                                            colors: {
                                                primary: '#E71B73'
                                            },
                                            roundness: 10
                                        }}
                                    /> : null
                            }
                            {
                                field.type === "PASSWORD" ?
                                    <TextInput
                                        style={globalStyles.roundedInputBox}
                                        mode="outlined"
                                        secureTextEntry
                                        id={field.id}
                                        label={field.label}
                                        onChangeText={(text) => handleChangeText(field.id, field.type, text)}
                                        placeholder={field.placeHolder}
                                        theme={{
                                            colors: {
                                                primary: '#E71B73'
                                            },
                                            roundness: 10
                                        }}
                                    /> : null
                            }
                            {
                                field.type === "SELECT" ?
                                    <>
                                        {/* Label above the dropdown */}
                                        <Text style={globalStyles.label}>{field.label}</Text>
                                        <SelectDropdown
                                            defaultButtonText={field.label}
                                            buttonStyle={globalStyles.selectField}
                                            searchPlaceHolder={field.placeHolder}
                                            buttonTextStyle={globalStyles.selectText}
                                            dropdownIconPosition='right'
                                            renderDropdownIcon={() => <Icon name='chevron-down' />}
                                            data={field.options || []}
                                            onSelect={(text) => handleChangeText(field.id, field.type, text)}
                                        />
                                    </>
                                    : null
                            }
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

export default CenterForm;