import { ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { formatKeys } from '../../../utils/commonFunction/formatKeys';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';

const UserDetails = () => {
    const route = useRoute<any>();
    const { userDetails } = route.params;
    const windowWidth = Dimensions.get("window").width;

    return (
        <View style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: userDetails.profile_image_url, // replace with the user's actual avatar URL
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>{userDetails.full_name}</Title>
                        <Caption style={styles.caption}>@johndoe</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Paragraph style={styles.paragraph}>Email: johndoe@example.com</Paragraph>
                </View>
                <View style={styles.row}>
                    <Paragraph style={styles.paragraph}>Phone: +1 123 456 7890</Paragraph>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, { borderRightColor: '#dddddd', borderRightWidth: 1 }]}>
                    <Title>140</Title>
                    <Caption>Posts</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title>200</Title>
                    <Caption>Followers</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                {
                    Object.keys(userDetails).map((key, index) => {
                        if (key === 'password' || key === "profile_image_url" || key === "_id" || key === "ACTIVE" || key === "email" || key === "mobile" || key === "full_name") {
                            return null;
                        }
                        return (
                            <View key={index} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                <Text>{formatKeys(key)}</Text>
                                <Text>{userDetails[key]}</Text>
                            </View>
                        );
                    })
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 80,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    drawerSection: {
        marginTop: 15,
    },
});

export default UserDetails;