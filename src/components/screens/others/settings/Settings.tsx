import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { List, Avatar, Title, Caption, Divider, Appbar } from 'react-native-paper';

const SettingsPage = ({ navigation }: any) => {
    const handlePress = (option: string) => {
        console.log('Selected option:', option);
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Settings" />
            </Appbar.Header>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.header}>
                    <Avatar.Image
                        source={{ uri: 'https://placekitten.com/100/100' }} // Replace with your user's avatar URL
                        size={80}
                    />
                    <Title style={styles.title}>Tuhin Thakur</Title>
                    <Caption style={styles.caption}>email@example.com</Caption>
                </View>

                <Divider />

                <List.Section style={styles.listSection}>
                    <TouchableOpacity onPress={() => handlePress('Reset Password')}>
                        <List.Item
                            title="Reset Password"
                            left={() => <List.Icon icon="lock-reset" />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handlePress('Reset Email')}>
                        <List.Item
                            title="Reset Email"
                            left={() => <List.Icon icon="email-edit-outline" />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handlePress('Delete Account')}>
                        <List.Item
                            title="Delete Account"
                            left={() => <List.Icon icon="account-remove" />}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handlePress('Block User')}>
                        <List.Item
                            title="Block User"
                            left={() => <List.Icon icon="account-lock" />}
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
