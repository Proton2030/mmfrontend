import { View, Text, ScrollView, KeyboardAvoidingView, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { color, education, family, hello, imam, job, location, logo, muslimLove, weight } from '../../../assets';
import { Button } from 'react-native-paper';
import CenterForm from '../../shared/centerForm/CenterForm';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { IUserInfo } from '../../../@types/types/userInfo.types';
import { api } from '../../../utils/api';
import AuthContext from '../../../contexts/authContext/authContext';
import { IUserPartnerInfo } from '../../../@types/types/userPartnerInfo';
import { PARTNER_INFO_ONE, PARTNER_INFO_THREE, PARTNER_INFO_TWO } from '../../../constants/forms/PartnerInformation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PartnerInformation = () => {
    const { user, setUser } = useContext(AuthContext);
    const [screen, setScreen] = useState<number>(0);
    const [partnerInfo, setPartnerInfo] = useState<IUserPartnerInfo>({
        partner_min_age: 18,
        partner_max_age: 10000,
        partner_bodyColor: "BLACK",
        partner_coutry: "BANGLADESH",
        partner_education: "",
        partner_hajab_maintain: 1,
        partner_min_height: 0,
        partner_max_height: 100,
        partner_islamic_education: "",
        partner_marital_status: "UNMARRIED",
        partner_religious: true,
        partner_salah: "",
        partner_state: "",
        partner_min_weight: 0,
        partner_max_weight: 1000
    })
    const navigation = useNavigation<any>();

    const handleChangeText = useCallback((field: string, type: string, text: string) => {
        console.log("text", text);
        if (type === "NUMBER") {
            setPartnerInfo(Object.assign({}, partnerInfo, { [field]: Number(text) }))
        }
        if (field === "partner_age") {
            const ageRange = text.split("-");
            console.log("age", ageRange[1]);
            setPartnerInfo(Object.assign({}, partnerInfo, { "partner_min_age": Number(ageRange[0]), "partner_max_age": Number(ageRange[1]) }))
        }
        else if (field === "partner_weight") {
            const weightRange = text.split("-");
            setPartnerInfo(Object.assign({}, partnerInfo, { "partner_min_weight": Number(weightRange[0]), "partner_max_weight": Number(weightRange[1]) }))
        }
        else if (field === "partner_height") {
            const heightRange = text.split("-");
            setPartnerInfo(Object.assign({}, partnerInfo, { "partner_min_height": Number(heightRange[0]), "partner_max_height": Number(heightRange[1]) }))
        }
        else if (field === "partner_hajab_maintain") {
            const value = text === "YES"
            setPartnerInfo(Object.assign({}, partnerInfo, { [field]: value }))
        }
        else {
            setPartnerInfo(Object.assign({}, partnerInfo, { [field]: text }))
        }
    }, [partnerInfo]);

    const routeUserDashboard = CommonActions.reset({
        index: 0,
        routes: [
            {
                name: 'UserDashboard'
            },
        ], // Replace with your desired screen name
    });

    const handleCompleteButtonClick = useCallback(async () => {
        if (user) {
            const payload = {
                userDetails: partnerInfo,
                userObjectId: user._id
            }
            const userInstance = await api.userDetails.updateUser(payload);
            if (userInstance) {
                setUser(userInstance);
                navigation.dispatch(routeUserDashboard);
            }
        }
    }, [user, partnerInfo])

    const handleChangeScreen = () => {
        if (screen < 2) {
            setScreen(prev => ++prev);
        }
        if (screen == 2) {
            handleCompleteButtonClick();
        }
    }
    return (
        <ScrollView style={globalStyles.parent} contentContainerStyle={globalStyles.parentScrollContainer}>
            <View style={styles.viewBox}>
                <Image style={styles.image} source={logo} />
            </View>
            <View style={globalStyles.childContainer}>
                {screen === 0 ?
                    <Text style={globalStyles.headingText}>Please Give Your Partner Information</Text> : null
                }
                {screen === 1 ?
                    <Text style={globalStyles.headingText}>Your Partner Educational Background</Text> : null
                }
                {screen === 2 ?
                    <Text style={globalStyles.headingText}>Your Partner Religious Information</Text> : null
                }
            </View>
            <View style={globalStyles.childContainer}>

                {screen === 0 ?
                    <CenterForm handleChangeText={handleChangeText} fieldList={PARTNER_INFO_ONE} /> : null
                }
                {screen === 1 ?
                    <CenterForm handleChangeText={handleChangeText} fieldList={PARTNER_INFO_TWO} /> : null
                }
                {screen === 2 ?
                    <CenterForm handleChangeText={handleChangeText} fieldList={PARTNER_INFO_THREE} /> : null
                }

                <Button mode='contained' style={globalStyles.pinkButton} onPress={handleChangeScreen}>Continue</Button>
            </View>
        </ScrollView>
    )
}

export default PartnerInformation

const styles = StyleSheet.create({
    image: {
        width: windowWidth / 4,
        height: windowWidth / 4, // Make the height equal to the width
        borderRadius: windowWidth / 8, // Set the border radius to half of the width or height to make the image round
        resizeMode: 'cover',
        marginBottom: 10 // Cover the whole View without distortion
    },
    viewBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    }
});