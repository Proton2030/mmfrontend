import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { COLORS, SIZES } from '../../../constants/theme';
import { Button, useTheme } from 'react-native-paper';
import { districts_of_bangladesh } from '../../../constants/bangladeshDistricts';
import { useNavigation } from '@react-navigation/native';
import CustomDropdown from './districtSelect/CustomDropdown';
import SearchBox from './userSearchField/UserSearchBox';

const FilterDrawer = ({ closeDrawer, applyFilters }: any) => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [location, setLocation] = useState<string | null>(null);
  const [maritalStatus, setMaritalStatus] = useState<any>(null);
  const [hasSalah, setHasSalah] = useState<any>(null);
  const [hasSawm, setHasSawm] = useState<any>(null);
  const [minAge, setMinAge] = useState<number | null>(null);
  const [maxAge, setMaxAge] = useState<number | null>(null);
  const [username, setUserName] = useState<string | null>();

  const handleRefreshFilters = () => {
    setMaritalStatus(null);
    setHasSalah(null);
    setHasSawm(null);
    setMinAge(null);
    setMaxAge(null);
    setLocation(null);
    setUserName(null);
    applyFilters({
      location: null,
      maritalStatus: null,
      hasSalah: null,
      hasSawm: null,
      minAge: null,
      maxAge: null,
      full_name: null,
    });
    closeDrawer()
  };

  const applyFilter = () => {
    applyFilters({
      location,
      maritalStatus,
      hasSalah,
      hasSawm,
      minAge,
      maxAge,
      full_name: username,
    });
    closeDrawer();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: { preventDefault: () => void }) => {
      e.preventDefault(); // Prevent the screen from being removed
      console.log('clode drawer');
      unsubscribe();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 12,
        backgroundColor: colors.background,
        paddingHorizontal: 5,
      }}
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text
            style={{
              fontSize: 27,
              fontWeight: '500',
              color: colors.scrim,
            }}
          >
            &nbsp;Filter User
          </Text>

          <View style={styles.headerAction}>
            {/* <TouchableOpacity onPress={handleRefreshFilters}> */}
            <TouchableOpacity onPress={() => closeDrawer()}>
              <Icon color={colors.primary} name="close-circle-outline" size={30} />
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
            Search User
          </Text>
          <View style={[globalStyles.shadowView, { backgroundColor: colors.background }]}>
            <SearchBox username={username} setUsername={setUserName} />
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
            Search Location
          </Text>
          <View style={[globalStyles.shadowView, { backgroundColor: colors.background }]}>
            <CustomDropdown
              data={districts_of_bangladesh}
              onSelect={(selectedItem: any) => setLocation(selectedItem)}
            />
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
            Age Range
          </Text>
          <View style={globalStyles.row}>
            {[
              { label: '18-22', minAge: 17, maxAge: 22 },
              { label: '23-26', minAge: 23, maxAge: 26 },
              { label: '27-31', minAge: 27, maxAge: 31 },
              { label: '32-38', minAge: 32, maxAge: 38 },
              { label: '39-45', minAge: 39, maxAge: 45 },
              { label: 'age>45', minAge: 46, maxAge: 100 },
            ].map((ageRange, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setMinAge(ageRange.minAge);
                  setMaxAge(ageRange.maxAge);
                }}
                style={[
                  globalStyles.category,
                  {
                    shadowColor:
                      minAge === ageRange.minAge && maxAge === ageRange.maxAge ? COLORS.primary : COLORS.title,
                  },
                  {
                    backgroundColor:
                      minAge === ageRange.minAge && maxAge === ageRange.maxAge ? COLORS.primary : colors.surface,
                  },
                ]}
              >
                <Text
                  style={[
                    globalStyles.subtitle,
                    { color: minAge === ageRange.minAge && maxAge === ageRange.maxAge ? COLORS.white : 'gray' },
                  ]}
                >
                  {ageRange.label}
                </Text>
              </TouchableOpacity>
            ))}
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
                { backgroundColor: colors.surface },
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
                { backgroundColor: colors.surface },
              ]}
            >
              <Text style={[globalStyles.subtitle, { color: maritalStatus === 'UNMARRIED' ? COLORS.primary : 'gray' }]}>
                Unmarried
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setMaritalStatus((prevState: string) => (prevState === 'DIVORCED' ? null : 'DIVORCED'))}
              style={[
                globalStyles.category,
                { shadowColor: maritalStatus === 'DIVORCED' ? COLORS.primary : COLORS.title },
                { backgroundColor: colors.surface },
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
                { backgroundColor: colors.surface },
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

        {/* <View style={globalStyles.item}>
          <Text style={{ color: colors.tertiary, fontWeight: 'bold', fontSize: SIZES.h3, marginVertical: 5 }}>
            FILTER
          </Text>
          <TouchableOpacity
            onPress={() => setHasSalah((prevState: string) => (prevState === 'YES' ? null : 'YES'))}
            style={[globalStyles.filter, { backgroundColor: colors.surface }]}
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
            style={[globalStyles.filter, { backgroundColor: colors.surface }]}
          >
            <Text style={globalStyles.text}>Sawm</Text>
            {hasSawm === 'YES' ? (
              <MaterialIcons name="radio-button-checked" size={20} color={COLORS.primary} />
            ) : (
              <MaterialIcons name="radio-button-unchecked" size={20} color={COLORS.grey} />
            )}
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity style={globalStyles.button} onPress={applyFilter}>
          <Text style={globalStyles.buttonTxt}>Apply Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.button2, { backgroundColor: colors.secondary }]}
          onPress={handleRefreshFilters}>
          <Text style={[globalStyles.buttonTxt, { color: colors.primary }]}>Clear Filters</Text>
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
    // marginBottom: 12,
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
