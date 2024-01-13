import { View, Text, ScrollView, KeyboardAvoidingView, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { color, education, family, hello, imam, job, location, logo, muslimLove, weight } from '../../../assets';
import { Button } from 'react-native-paper';
import CenterForm from '../../shared/centerForm/CenterForm';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { api } from '../../../utils/api';
import AuthContext from '../../../contexts/authContext/authContext';
import { IUserPartnerInfo } from '../../../@types/types/userPartnerInfo';
import { PARTNER_INFO_ONE, PARTNER_INFO_THREE, PARTNER_INFO_TWO } from '../../../constants/forms/PartnerInformation';
import SnackbarAlert from '../../shared/snackbarAlert/SnackbarAlert';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PartnerInformation = () => {
    const { user, setUser } = useContext(AuthContext);
    const [screen, setScreen] = useState<number>(0);
    const [partnerInfo, setPartnerInfo] = useState<any>({
        partner_min_age: 0,
        partner_max_age: 0,
        partner_bodyColor: "",
        partner_coutry: "BANGLADESH",
        partner_education: "",
        partner_hajab_maintain: 0,
        partner_min_height: 0,
        partner_max_height: 0,
        partner_islamic_education: "",
        partner_marital_status: "",
        partner_religious: true,
        partner_salah: "",
        partner_state: "",
        partner_min_weight: 0,
        partner_max_weight: 0,

        partner_age: "",
        partner_weight: "",
        partner_height: "",

    })
    const navigation = useNavigation<any>();

    const [visible, setVisible] = React.useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const handleBackScreen = () => {
        if (screen > 0) {
            setScreen(prev => --prev);
        }
    }

    console.log("first", partnerInfo);

    const handleChangeText = useCallback((field: string, type: string, text: string) => {
        if (type === "NUMBER") {
            setPartnerInfo(Object.assign({}, partnerInfo, { [field]: Number(text) }))
        }
        else if (field === "partner_age") {
            const ageRange = text.split("-");
            console.log("age", ageRange[1]);
            setPartnerInfo(Object.assign({}, partnerInfo, { [field]: text, "partner_min_age": Number(ageRange[0]), "partner_max_age": Number(ageRange[1]) }))
        }
        else if (field === "partner_weight") {
            const weightRange = text.split("-");
            console.log("weightRange", weightRange);
            setPartnerInfo(Object.assign({}, partnerInfo, { [field]: text, "partner_min_weight": Number(weightRange[0]), "partner_max_weight": Number(weightRange[1]) }))
        }
        else if (field === "partner_height") {
            const heightRange = text.split("-");
            setPartnerInfo(Object.assign({}, partnerInfo, { [field]: text, "partner_min_height": Number(heightRange[0]), "partner_max_height": Number(heightRange[1]) }))
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
        ],
    });

    const handleCompleteButtonClick = useCallback(async () => {
        if (user) {
            delete partnerInfo.partner_age;
            delete partnerInfo.partner_weight;
            delete partnerInfo.partner_height;
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
            if (screen === 0) {
                if (
                    partnerInfo.partner_age === "" ||
                    partnerInfo.partner_marital_status === "" ||
                    partnerInfo.partner_state === "" ||
                    partnerInfo.partner_height === "" ||
                    partnerInfo.partner_weight === "" ||
                    partnerInfo.partner_bodyColor === ""
                ) {
                    setVisible(true);
                    return;
                }

            }
            if (screen === 1) {
                if (
                    partnerInfo.partner_education === "" ||
                    partnerInfo.partner_islamic_education === ""
                ) {
                    setVisible(true);
                    return;
                }

            }
            if (screen === 2) {
                if (
                    partnerInfo.partner_salah === "" ||
                    partnerInfo.partner_hajab_maintain === 0
                ) {
                    setVisible(true);
                    return;
                }
            }
            setScreen(prev => ++prev);
        }
        if (screen == 2) {
            if (
                partnerInfo.partner_salah === "" ||
                partnerInfo.partner_religious === false
            ) {
                return;
            }
            handleCompleteButtonClick();
        }
    }
    return (
        <>

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
                        <CenterForm object={partnerInfo} handleChangeText={handleChangeText} fieldList={PARTNER_INFO_ONE} /> : null
                    }
                    {screen === 1 ?
                        <CenterForm object={partnerInfo} handleChangeText={handleChangeText} fieldList={PARTNER_INFO_TWO} /> : null
                    }
                    {screen === 2 ?
                        <CenterForm object={partnerInfo} handleChangeText={handleChangeText} fieldList={PARTNER_INFO_THREE} /> : null
                    }

                    <Button mode='contained' style={[globalStyles.pinkButton, { marginBottom: 18 }]} onPress={handleChangeScreen}>Next</Button>
                    {
                        screen !== 0 ?
                            <Button mode='outlined' style={globalStyles.lightPinkButton} onPress={handleBackScreen}>Back</Button> : null
                    }
                </View>
            </ScrollView>
            <SnackbarAlert message='Fill the form' onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />

        </>
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