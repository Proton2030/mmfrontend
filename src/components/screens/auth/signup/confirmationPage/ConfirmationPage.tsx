import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../../../globalStyles/GlobalStyles'
import { muslim } from '../../../../../assets'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const ConfirmationPage = () => {
    const navigation = useNavigation<any>();

    const handleGetStartedButtonClick = () => {
        navigation.navigate('Auth', { screen: 'signup' });
    };
    const handleNoMuslimButtonClick = () => {
        navigation.navigate('Auth', { screen: 'login' });
    };
    return (
        <View style={globalStyles.parentView}>
            <View style={globalStyles.childContainer}>
                <Image source={muslim} style={globalStyles.middleImage} />
                <Text style={globalStyles.headingText}>This app is only for Muslim.</Text>
            </View>
            <View style={globalStyles.childContainer}>
                <Text>Are You Sure to coninue ?</Text>
                <Button mode='contained' onPress={handleGetStartedButtonClick} style={[globalStyles.pinkButton, { marginBottom: 20 }]}>I am Muslim</Button>
                <Button mode='outlined' style={globalStyles.lightPinkButton} onPress={handleNoMuslimButtonClick}>No,I am not Muslim</Button>
            </View>
        </View>
    )
}

export default ConfirmationPage