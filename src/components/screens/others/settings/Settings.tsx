import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { List, Avatar, Title, Caption, Divider, Appbar, useTheme, Card } from 'react-native-paper';
import AuthContext from '../../../../contexts/authContext/authContext';
import SmallCard from '../../../shared/smallCard/SmallCard';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';

const SettingsPage = ({ navigation }: any) => {
  const { colors } = useTheme();
  const { user } = useContext(AuthContext);
  const handlePress = (option: string) => {
    console.log('Selected option:', option);
    navigation.navigate(option);
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Appbar.Header style={{ backgroundColor: colors.secondary, paddingLeft: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={colors.primary} style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: '800', fontSize: 23, color: colors.onSurface }}>Settings</Text>
      </Appbar.Header>
      <ScrollView style={styles.scrollContainer}>
        <List.Section style={styles.listSection}>
          <TouchableOpacity onPress={() => handlePress('ResetPassord')}>
            <Card style={globalStyles.menuCard} onPress={() => handlePress('ResetPassord')}>
              <Card.Content>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: 10,
                    }}
                  >
                    <Icon2 name="lock" size={20} color="#E71B73" />
                    <Text style={globalStyles.menucardText}>Change Password</Text>
                  </View>
                  <Icon2 name="arrow-right" size={20} color="#E71B73" />
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <SmallCard text={'Block User'} icon={'account-lock'} route={'My Profile'} />
          <SmallCard text={'Delete Account'} icon={'account-remove'} route={'My Profile'} />
          <SmallCard text={'Change App Theme'} icon={'theme-light-dark'} route={'My Profile'} />
          <SmallCard text={'Change App language'} icon={'language-fortran'} route={'My Profile'} />
        </List.Section>
      </ScrollView>
    </View>
  );
};

{
}
const styles = StyleSheet.create({
  scrollContainer: {
    paddingLeft: 20,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 10,
  },
  caption: {
    fontSize: 14,
    marginTop: 4,
  },
  listSection: {
    marginTop: 20,
    paddingRight: 15,
  },
});

export default SettingsPage;
