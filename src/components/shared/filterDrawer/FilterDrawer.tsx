import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { globalStyles } from "../../../globalStyles/GlobalStyles";
import { COLORS } from "../../../constants/theme";
import { IconButton } from "react-native-paper";

const FilterDrawer = ({ navigation, toggleDrawer, applyFilters, }: any) => {
    const [location, setLocation] = useState("");
    const [maritalStatus, setMaritalStatus] = useState<any>(null);
    const [hasSalah, setHasSalah] = useState<any>(null);
    const [hasSawm, setHasSawm] = useState<any>(null);

    const handleRefreshFilters = () => {
        setMaritalStatus(null);
        setHasSalah(null);
        setHasSawm(null);

    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.headerFilter}>
                <View style={globalStyles.headerFilter}>
                    <Icon name="filter" size={24} color={COLORS.primary} />
                    <Text style={globalStyles.title && { fontSize: 30, paddingLeft: 5, color: COLORS.primary, fontWeight: '400' }}>Filter</Text>
                </View>
                <TouchableOpacity style={globalStyles.iconHeader}>
                    <IconButton icon={'reload'} onPress={handleRefreshFilters} />
                    <IconButton icon={'close'} onPress={toggleDrawer} />
                </TouchableOpacity>
            </View>
            <ScrollView style={globalStyles.container}>
                <View style={globalStyles.item}>
                    <Text style={globalStyles.title}>District</Text>
                    <TextInput
                        value={location}
                        placeholder="Where do you live?"
                        style={globalStyles.input}
                        onChangeText={setLocation}
                    />
                </View>
                <View style={globalStyles.item}>
                    <Text style={globalStyles.title}>Marital Status</Text>
                    <View style={globalStyles.row}>
                        <TouchableOpacity
                            onPress={() => setMaritalStatus(
                                (prevState: string) => (prevState === "MARRIED" ? null : "MARRIED")
                            )}
                            style={[globalStyles.category, { borderColor: maritalStatus === "MARRIED" ? COLORS.primary : COLORS.grey }]}
                        >
                            <Text style={[globalStyles.subtitle, { color: maritalStatus === "MARRIED" ? COLORS.primary : COLORS.grey }]}>Married</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setMaritalStatus(
                                (prevState: string) => (prevState === "UNMARRIED" ? null : "UNMARRIED")
                            )}
                            style={[globalStyles.category, { borderColor: maritalStatus === "UNMARRIED" ? COLORS.primary : COLORS.grey }]}
                        >
                            <Text style={[globalStyles.subtitle, { color: maritalStatus === "UNMARRIED" ? COLORS.primary : COLORS.grey }]}>Unarried</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setMaritalStatus(
                                (prevState: string) => (prevState === "DIVORCED" ? null : "DIVORCED")
                            )}
                            style={[globalStyles.category, { borderColor: maritalStatus === "DIVORCED" ? COLORS.primary : COLORS.grey }]}
                        >
                            <Text style={[globalStyles.subtitle, { color: maritalStatus === "DIVORCED" ? COLORS.primary : COLORS.grey }]}>Divorced</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setMaritalStatus(
                                (prevState: string) => (prevState === "PARTNER DEATH" ? null : "PARTNER DEATH")
                            )}
                            style={[globalStyles.category, { borderColor: maritalStatus === "PARTNER DEATH" ? COLORS.primary : COLORS.grey }]}
                        >
                            <Text style={[globalStyles.subtitle, { color: maritalStatus === "PARTNER DEATH" ? COLORS.primary : COLORS.grey }]}>Partner Death</Text>
                        </TouchableOpacity>

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
                    onPress={() => applyFilters({ location, maritalStatus, hasSalah, hasSawm })}
                >
                    <Text style={globalStyles.buttonTxt}>Apply Filters</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FilterDrawer;