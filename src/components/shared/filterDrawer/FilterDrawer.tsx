import React, { useCallback, useState } from "react";
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { globalStyles } from "../../../globalStyles/GlobalStyles";
import { COLORS } from "../../../constants/theme";
import { IconButton } from "react-native-paper";
import { BODY_COLOR } from "../../../constants/color";
import { districts_of_bangladesh } from "../../../constants/bangladeshDistricts";
import Autocomplete from "../autocomplete/Autocomplete";
import { MARATAL_STATUS } from "../../../constants/maratialStatus";
import RangeSlider from 'rn-range-slider';

const FilterDrawer = ({ navigation, toggleDrawer, applyFilters, }: any) => {

    const [location, setLocation] = useState<any>(null);
    const [maritalStatus, setMaritalStatus] = useState<any>(null);
    const [hasSalah, setHasSalah] = useState<any>(null);
    const [hasSawm, setHasSawm] = useState<any>(null);
    const [body_color, setbody_color] = useState<any>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const handleRefreshFilters = () => {
        setMaritalStatus(null);
        setHasSalah(null);
        setHasSawm(null);
        setbody_color(null)
        setLocation(null)
        setInputValue('')
    };

    const handleSelectDistrict = (selectedDistrict: string) => {
        setLocation(
            (prevState: string) => (prevState === selectedDistrict ? null : selectedDistrict)
        )
    };

    return (
        <SafeAreaView style={globalStyles.container}>

            <View style={globalStyles.headerFilter}>
                <View style={globalStyles.headerFilter}>
                    <Icon2 name="filter" size={25} color={COLORS.primary} />
                    <Text style={globalStyles.title && { fontSize: 30, paddingLeft: 5, color: COLORS.primary, fontWeight: '400' }}>Filter</Text>
                </View>
                <TouchableOpacity style={globalStyles.iconHeader}>
                    <IconButton icon={'reload'} onPress={handleRefreshFilters} />
                    <IconButton icon={'close'} onPress={toggleDrawer} />
                </TouchableOpacity>
            </View>

            <ScrollView style={globalStyles.container && { marginTop: 1 }}>

                <View style={globalStyles.item}>
                    <Text style={globalStyles.title}>District</Text>
                    <Autocomplete
                        options={districts_of_bangladesh}
                        onSelect={handleSelectDistrict} inputValue={inputValue} setInputValue={setInputValue} />
                </View>

                <View style={globalStyles.item}>
                    <Text style={globalStyles.title}>Marital Status</Text>

                    <View style={globalStyles.row}>
                        {
                            MARATAL_STATUS.map((item) =>
                                <TouchableOpacity
                                    onPress={() => setMaritalStatus(
                                        (prevState: string) => (prevState === item ? null : item)
                                    )}
                                    style={[globalStyles.category, { borderColor: maritalStatus === item ? COLORS.primary : COLORS.grey }]}
                                >
                                    <Text style={[globalStyles.subtitle, { color: maritalStatus === item ? COLORS.primary : COLORS.grey }]}>{item.toLowerCase()}</Text>
                                </TouchableOpacity>
                            )}
                    </View>
                </View>

                <View style={globalStyles.item}>
                    <Text style={globalStyles.title}>Body Color</Text>
                    <View style={globalStyles.row}>
                        {
                            BODY_COLOR.map((item) =>
                                <TouchableOpacity
                                    onPress={() => setbody_color(
                                        (prevState: string) => (prevState === item ? null : item)
                                    )}
                                    style={[globalStyles.category, { borderColor: body_color === item ? COLORS.primary : COLORS.grey }]}
                                >
                                    <Text style={[globalStyles.subtitle, { color: body_color === item ? COLORS.primary : COLORS.grey }]}>{item}</Text>
                                </TouchableOpacity>
                            )}
                    </View>
                </View>

                <View style={globalStyles.item}>
                    <Text style={globalStyles.title}>FILTER</Text>
                    <View style={globalStyles.line} />
                    <TouchableOpacity
                        onPress={() => setHasSalah(
                            (prevState: string) => (prevState === "YES" ? null : "YES")
                        )}
                        style={globalStyles.rowFilter}
                    >
                        <Text style={globalStyles.text}>Has Salah</Text>
                        {hasSalah && <Icon name="check" size={20} color={COLORS.primary} />}
                    </TouchableOpacity>

                    <View style={globalStyles.line} />
                    <TouchableOpacity
                        onPress={() => {
                            setHasSawm((prevState: string) => (prevState === "YES" ? null : "YES"));
                        }}
                        style={globalStyles.rowFilter}
                    >
                        <Text style={globalStyles.text}>Has Sawm</Text>
                        {hasSawm === "YES" && <Icon name="check" size={20} color={COLORS.primary} />}
                    </TouchableOpacity>


                    <View style={globalStyles.line} />
                </View>
                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => applyFilters({ location, maritalStatus, hasSalah, hasSawm, body_color })}
                >
                    <Text style={globalStyles.buttonTxt}>Apply Filters</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FilterDrawer;
