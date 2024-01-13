import { ScrollView, Image, Dimensions, Animated, Easing } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { formatKeys } from '../../../utils/commonFunction/formatKeys';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch, IconButton } from 'react-native-paper';
import { USER_INFO_FIVE, USER_INFO_FOUR, USER_INFO_ONE, USER_INFO_THREE, USER_INFO_TWO } from '../../../constants/forms/UserInformation';
import { PARTNER_INFO_ONE, PARTNER_INFO_THREE, PARTNER_INFO_TWO } from '../../../constants/forms/PartnerInformation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const UserDetails = () => {
    const route = useRoute<any>();
    const { userDetails, editable } = route.params;
    const fadeAnim = new Animated.Value(0);
    const navigation = useNavigation();

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: userDetails.profile_image_url,
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>{userDetails.full_name}</Title>
                        <Text style={{ color: "#E71B73", fontSize: 16 }}>{userDetails.age} Years</Text>
                        <Text style={{ color: "#E71B73", fontSize: 16 }}>Lives in {userDetails.state || "N/A"}</Text>
                        <Text style={{ color: "#E71B73", fontSize: 16 }}>{userDetails.status === "ACTIVE" ? "online" : "offline"}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Paragraph style={styles.paragraph}>{userDetails.marital_status}</Paragraph>
                </View>
            </View>


            <ScrollView style={styles.menuWrapper}>
                <View style={{ marginBottom: 16 }}>
                    <View style={globalStyles.iconText}>
                        <Text style={[globalStyles.mediumText, { marginBottom: 18, color: "#E71B73" }]}>User Information</Text>
                        <IconButton icon="pencil-outline" onPress={() => { }} />
                    </View>
                    {USER_INFO_ONE.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                {
                                    key.id === "age" ?
                                        <Text style={styles.infoValue}>{userDetails[key.id]} years</Text> :
                                        key.id === "height" ?
                                            <Text style={styles.infoValue}>{userDetails[key.id]} feet</Text> :
                                            key.id === "weight" ?
                                                <Text style={styles.infoValue}>{userDetails[key.id]} kg</Text> :
                                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                                }

                            </View>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 16 }}>
                    <View style={globalStyles.iconText}>
                        <Text style={[globalStyles.mediumText, { marginBottom: 18, color: "#E71B73" }]}>Job Information</Text>
                        <IconButton icon="pencil-outline" onPress={() => { }} />
                    </View>
                    {USER_INFO_TWO.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                            </View>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={[globalStyles.mediumText, { marginBottom: 18, color: "#E71B73" }]}>Education Information</Text>
                    {USER_INFO_THREE.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                            </View>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={[globalStyles.mediumText, { marginBottom: 18, color: "#E71B73" }]}>Religious Information</Text>
                    {USER_INFO_FOUR.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                            </View>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text style={[globalStyles.mediumText, { marginBottom: 18, color: "#E71B73" }]}>Family Information</Text>
                    {USER_INFO_FIVE.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                            </View>
                        );
                    })}
                </View>



                <View style={{ marginBottom: 16 }}>
                    <View style={globalStyles.iconText}>
                        <Text style={[globalStyles.mediumText, { marginBottom: 18, color: "#E71B73" }]}>Partner Information</Text>
                        <IconButton icon="pencil-outline" onPress={() => { }} />
                    </View>
                    {PARTNER_INFO_ONE.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                {
                                    key.id === "age" ?
                                        <Text style={styles.infoValue}>{userDetails[key.id]} years</Text> :
                                        key.id === "height" ?
                                            <Text style={styles.infoValue}>{userDetails[key.id]} feet</Text> :
                                            key.id === "weight" ?
                                                <Text style={styles.infoValue}>{userDetails[key.id]} kg</Text> :
                                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                                }

                            </View>
                        );
                    })}
                    <View style={globalStyles.iconText}>
                        <Text style={[globalStyles.mediumText, { marginBottom: 18, color: "#E71B73" }]}>Religious Information</Text>
                        <IconButton icon="pencil-outline" onPress={() => { }} />
                    </View>
                    {PARTNER_INFO_TWO.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                {
                                    key.id === "age" ?
                                        <Text style={styles.infoValue}>{userDetails[key.id]} years</Text> :
                                        key.id === "height" ?
                                            <Text style={styles.infoValue}>{userDetails[key.id]} feet</Text> :
                                            key.id === "weight" ?
                                                <Text style={styles.infoValue}>{userDetails[key.id]} kg</Text> :
                                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                                }

                            </View>
                        );
                    })}
                    {PARTNER_INFO_THREE.map((key, index) => {
                        return (
                            <View key={index} style={styles.infoItem}>
                                <Text style={styles.infoLabel}>{formatKeys(key.id)}</Text>
                                {
                                    key.id === "age" ?
                                        <Text style={styles.infoValue}>{userDetails[key.id]} years</Text> :
                                        key.id === "height" ?
                                            <Text style={styles.infoValue}>{userDetails[key.id]} feet</Text> :
                                            key.id === "weight" ?
                                                <Text style={styles.infoValue}>{userDetails[key.id]} kg</Text> :
                                                <Text style={styles.infoValue}>{userDetails[key.id]}</Text>
                                }

                            </View>
                        );
                    })}
                </View>
            </ScrollView>

        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    userInfoSection: {
        paddingLeft: 20,
        backgroundColor: '#fde8f1',
        paddingBottom: 8
    },
    title: {
        fontSize: 24,
        marginTop: 15,
        fontWeight: 'bold',
        color: '#E71B73',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#E71B73',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
        color: '#E71B73',
    },
    infoBoxWrapper: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#ecf0f1',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    infoBox: {
        alignItems: 'center',
    },
    menuWrapper: {
        marginTop: 10,
        padding: 20,
    },
    infoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#333',
    },
    infoValue: {
        color: '#555',
    },
});

export default UserDetails;