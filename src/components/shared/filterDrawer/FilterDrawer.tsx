import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { COLORS, SIZES } from '../../../constants/theme';
import { Card, IconButton, useTheme } from 'react-native-paper';
import { ThemeColor } from '../../../constants/theme/themeColor';
import DualRange from '../dualRange/DualRange';

const FilterDrawer = ({ navigation, closeDrawer, applyFilters }: any) => {
  const { colors } = useTheme();
  const [location, setLocation] = useState('');
  const [maritalStatus, setMaritalStatus] = useState<any>(null);
  const [hasSalah, setHasSalah] = useState<any>(null);
  const [hasSawm, setHasSawm] = useState<any>(null);

  const handleRefreshFilters = () => {
    setMaritalStatus(null);
    setHasSalah(null);
    setHasSawm(null);
  };

  const applyFilter = () => {
    applyFilters({ location, maritalStatus, hasSalah, hasSawm });
    closeDrawer();
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 42, backgroundColor: '#f8f8f8', paddingHorizontal: 5 }}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>&nbsp;Filter User</Text>

          <View style={styles.headerAction} />

          <View style={styles.headerAction}>
            <TouchableOpacity onPress={handleRefreshFilters}>
              <Icon color="gray" name="reload-circle-sharp" size={35} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={globalStyles.container}>
        <View style={globalStyles.item}>
          <Text
            style={{
              color: colors.tertiary,
              fontWeight: 'bold',
              fontSize: SIZES.h3,
              marginVertical: 5,
              marginLeft: 10,
            }}
          >
            District
          </Text>
          <View style={globalStyles.shadowView}>
            <Icon color="gray" name="search" size={23} />
            <TextInput value={location} placeholder="Where do you live?" style={{}} onChangeText={setLocation} />
          </View>
        </View>
        <View style={globalStyles.item}>
          <Text
            style={{
              color: colors.tertiary,
              fontWeight: 'bold',
              fontSize: SIZES.h3,
              marginVertical: 5,
              marginLeft: 10,
            }}
          >
            Marital Status
          </Text>
          <View style={globalStyles.row}>
            <TouchableOpacity
              onPress={() => setMaritalStatus((prevState: string) => (prevState === 'MARRIED' ? null : 'MARRIED'))}
              style={[
                globalStyles.category,
                { shadowColor: maritalStatus === 'MARRIED' ? COLORS.primary : COLORS.title },
              ]}
            >
              <Text style={[globalStyles.subtitle, { color: maritalStatus === 'MARRIED' ? COLORS.primary : 'gray' }]}>
                Married
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setMaritalStatus((prevState: string) => (prevState === 'UNMARRIED' ? null : 'UNMARRIED'))}
              style={[
                globalStyles.category,
                { shadowColor: maritalStatus === 'UNMARRIED' ? COLORS.primary : COLORS.title },
              ]}
            >
              <Text style={[globalStyles.subtitle, { color: maritalStatus === 'UNMARRIED' ? COLORS.primary : 'gray' }]}>
                Unarried
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setMaritalStatus((prevState: string) => (prevState === 'DIVORCED' ? null : 'DIVORCED'))}
              style={[
                globalStyles.category,
                { shadowColor: maritalStatus === 'DIVORCED' ? COLORS.primary : COLORS.title },
              ]}
            >
              <Text style={[globalStyles.subtitle, { color: maritalStatus === 'DIVORCED' ? COLORS.primary : 'gray' }]}>
                Divorced
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setMaritalStatus((prevState: string) => (prevState === 'PARTNER DEATH' ? null : 'PARTNER DEATH'))
              }
              style={[
                globalStyles.category,
                { shadowColor: maritalStatus === 'PARTNER DEATH' ? COLORS.primary : COLORS.title },
              ]}
            >
              <Text
                style={[globalStyles.subtitle, { color: maritalStatus === 'PARTNER DEATH' ? COLORS.primary : 'gray' }]}
              >
                Partner Death
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={globalStyles.item}>
          <Text style={{ color: colors.tertiary, fontWeight: 'bold', fontSize: SIZES.h3, marginVertical: 5 }}>
            FILTER
          </Text>
          <TouchableOpacity
            onPress={() => setHasSalah((prevState: string) => (prevState === 'YES' ? null : 'YES'))}
            style={globalStyles.filter}
          >
            <Text style={globalStyles.text}>Salah</Text>
            {hasSalah === 'YES' ? (
              <MaterialIcons name="radio-button-checked" size={20} color={COLORS.primary} />
            ) : (
              <MaterialIcons name="radio-button-unchecked" size={20} color={COLORS.grey} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setHasSawm((prevState: string) => (prevState === 'YES' ? null : 'YES'));
            }}
            style={globalStyles.filter}
          >
            <Text style={globalStyles.text}>Sawm</Text>
            {hasSawm === 'YES' ? (
              <MaterialIcons name="radio-button-checked" size={20} color={COLORS.primary} />
            ) : (
              <MaterialIcons name="radio-button-unchecked" size={20} color={COLORS.grey} />
            )}
          </TouchableOpacity>

          <Text style={{ color: colors.tertiary, fontWeight: 'bold', fontSize: SIZES.h3, marginVertical: 5 }}>AGE</Text>
          <DualRange />
        </View>
        <TouchableOpacity style={globalStyles.button} onPress={applyFilter}>
          <Text style={globalStyles.buttonTxt}>Apply Filters</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingTop: 40,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '500',
    color: '#1d1d1d',
  },
  /** Empty */
  empty: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    marginTop: 12,
  },
  emptyDescription: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: '#8c9197',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  /** Fake */
  fake: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  fakeCircle: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    backgroundColor: '#e8e9ed',
    marginRight: 16,
  },
  fakeLine: {
    width: 200,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#e8e9ed',
    marginBottom: 8,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    marginTop: 'auto',
    marginHorizontal: 24,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});

export default FilterDrawer;
