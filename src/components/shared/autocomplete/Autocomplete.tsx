// Autocomplete.tsx
import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';



const Autocomplete = ({ options, onSelect, inputValue, setInputValue }: any) => {
    const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);


    const filterOptions = (text: string): string[] => {
        const filteredOptions = options.filter((option: string) =>
            option.toLowerCase().includes(text.toLowerCase())
        );
        return filteredOptions.slice(0, 4);
    };

    return (
        <ScrollView>
            <TextInput
                value={inputValue}
                placeholder="Where do you live?"
                onChangeText={(text) => {
                    setInputValue(text);
                    setShowAutocomplete(text.length > 0);
                }}
                style={styles.input}
            />
            {showAutocomplete && (
                <ScrollView style={styles.autocompleteContainer}>
                    {filterOptions(inputValue).map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setInputValue(option);
                                onSelect(option);
                                setShowAutocomplete(false);
                            }}
                            style={styles.autocompleteItem}
                        >
                            <Text style={{ fontSize: 17 }}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 0.7,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
        fontSize: 15,
        borderRadius: 10
    },
    autocompleteContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 3,
        borderRadius: 5,
        maxHeight: 180,
    },
    autocompleteItem: {
        padding: 7.5,
        borderBottomWidth: 1,
        borderColor: '#e6e6e6',
        borderRadius: 5,
        marginVertical: 3
    },
});

export default Autocomplete;
