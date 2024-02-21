import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { List, Avatar, Title, Caption, Divider, Appbar } from 'react-native-paper';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const SettingsPage = () => {
    const handlePress = (option: string) => {
        console.log('Selected option:', option);
    };
    const navigation = useNavigation<any>();

    const handleRouteSettings=()=>{
        navigation.navigate("ResetPassword")
    }

    return (
        <View style={styles.container}>
            

            <ScrollView style={styles.scrollContainer}>
               

                <List.Section style={styles.listSection}>
                    <TouchableOpacity onPress={handleRouteSettings}>
                        <List.Item
                            title="Reset Password"
                            titleStyle={globalStyles.listtitle}
                            left={() => <List.Icon icon="lock-reset" />}
                            right={()=><List.Icon icon="chevron-right"   />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handlePress('Reset Email')}>
                        <List.Item
                            title="Reset Email"
                            titleStyle={globalStyles.listtitle}
                            left={() => <List.Icon icon="email-edit-outline" />}
                            right={()=><List.Icon icon="chevron-right"   />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handlePress('Reset Email')}>
                        <List.Item
                            title="Reset Phone Number"
                            titleStyle={globalStyles.listtitle}
                            left={() => <List.Icon icon="phone" />}
                            right={()=><List.Icon icon="chevron-right"   />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handlePress('Delete Account') }>
                        <List.Item
                            title="Delete Account"
                            titleStyle={{color:"red",fontWeight:"700"}}
                            left={() => <List.Icon icon="account-remove" color='red'   />}
                            right={()=><List.Icon icon="chevron-right"    />}
                            // style={globalStyles.DeleteButton}
                        />
                    </TouchableOpacity>

                </List.Section>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 10
    },
    scrollContainer: {
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
    },
});

export default SettingsPage;
