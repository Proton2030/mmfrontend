import { View, Text, Image, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import CenterForm from '../../../shared/centerForm/CenterForm'
import { IField } from '../../../../@types/types/FieldTypes.types'
import { LOGIN_SCREEN } from '../../../../constants/forms/Login'
import { Button } from 'react-native-paper'
import { globalStyles } from '../../../../globalStyles/GlobalStyles'
import { loginStyle } from './LoginStyles'
import { logo } from '../../../../assets'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { IUserCredential } from '../../../../@types/types/userCredential.types'
import { api } from '../../../../utils/api'
import AuthContext from '../../../../contexts/authContext/authContext'
import SnackbarAlert from '../../../shared/snackbarAlert/SnackbarAlert'
import { storeData } from '../../../../utils/commonFunction/storeData'

const windowWidth = Dimensions.get('window').width;


const Login = () => {
    const navigation = useNavigation<any>();
    const { setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [userCredential, setUserCredentail] = useState<IUserCredential>({
        userId: "",
        password: ""
    })
    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const handleSignUpButtonClick = () => {
        navigation.navigate('Confirm', { screen: 'confirm' });
    };

    const routeUserDashboard = CommonActions.reset({
        index: 0,
        routes: [{ name: 'UserDashboard' }], // Replace with your desired screen name
    });

    const handleChangeText = useCallback((field: string, type: string, text: string) => {
        setUserCredentail(Object.assign({}, userCredential, { [field]: text }))
    }, [userCredential]);

    // const storeData = async (key, value) => {
    //     try {
    //       await AsyncStorage.setItem(key, value);
    //       console.log('Data stored successfully!');
    //     } catch (error) {
    //       console.error('Error storing data:', error);
    //     }
    //   };

    const handleLoginButtonClick = useCallback(async () => {
        try {
            setLoading(true);
            const userResponse = await api.auth.login(userCredential);
            setUser(userResponse);
            if (userResponse) {
                setLoading(false);
                if (!userResponse.full_name || !userResponse.age || !userResponse.state) {
                    navigation.navigate('UserInfo', { screen: 'peronsal-details' })
                }
                else if (!userResponse.partner_education) {
                    navigation.navigate('UserInfo', { screen: 'partner-details' })
                }
                else if (userResponse.profile_image_url === "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg") {
                    navigation.navigate("changeImage")
                }
                else {
                    navigation.dispatch(routeUserDashboard);
                    const jsonUser = JSON.stringify(userResponse);
                    storeData("@user", jsonUser);
                }
            }
        }
        catch (err) {
            setLoading(false);
            onToggleSnackBar();
        }

    }, [userCredential]);


    return (
        <>
            <ScrollView style={globalStyles.parent} contentContainerStyle={globalStyles.parentScrollContainer}>
                <View style={styles.viewBox}>
                    <Image style={styles.image} source={logo} />
                    <Text style={globalStyles.headingText}>Muslim Matrimony</Text>
                </View>
                <View style={globalStyles.childContainer}>
                    <CenterForm handleChangeText={handleChangeText} fieldList={LOGIN_SCREEN} object={userCredential} />
                    <Text style={loginStyle.forgetPass}>Forgotten Password ?</Text>
                    <Button mode='contained' loading={loading} style={globalStyles.pinkButton} onPress={handleLoginButtonClick}>LogIn</Button>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 30 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    <View>
                        <Text style={{ width: 80, textAlign: 'center', color: 'black' }}>New User ?</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                </View>
                <View style={globalStyles.childContainer}>
                    <Button mode='outlined' style={globalStyles.lightPinkButton} theme={{ colors: { primary: '#E71B73' } }} onPress={handleSignUpButtonClick} >Sign Up</Button>
                </View>
            </ScrollView>
            <SnackbarAlert message='Wrong Credential' onDismissSnackBar={onDismissSnackBar} visible={visible} key={0} />
        </>
    )
}
export default Login

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