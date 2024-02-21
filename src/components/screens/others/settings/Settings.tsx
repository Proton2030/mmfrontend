import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { List, Avatar, Title, Caption, Divider, Appbar } from 'react-native-paper';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';

const SettingsPage = ({ navigation }: any) => {
    const handlePress = (option: string) => {
        console.log('Selected option:', option);
    };

    return (
        <View style={styles.container}>
            {/* <Appbar.Header>
                <Appbar.Content title="Settings" />
            </Appbar.Header> */}

            <ScrollView style={styles.scrollContainer}>
                {/* <View style={styles.header}>
                    <Avatar.Image
                        source={{ uri: 'https://placekitten.com/100/100' }} // Replace with your user's avatar URL
                        size={80}
                    />
                    <Title style={styles.title}>Tuhin Thakur</Title>
                    <Caption style={styles.caption}>email@example.com</Caption>
                </View>

                <Divider /> */}

                <List.Section style={styles.listSection}>
                    <TouchableOpacity onPress={() => handlePress('Reset Password')}>
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

                    {/* <TouchableOpacity onPress={() => handlePress('Block User')}>
                        <List.Item
                            title="Block User"
                            left={() => <List.Icon icon="account-lock" />}
                            
                        />
                    </TouchableOpacity> */}
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
