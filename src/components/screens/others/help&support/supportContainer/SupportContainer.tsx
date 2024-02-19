import { View, Text, Linking } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../../../globalStyles/GlobalStyles'
import InlineCard from '../../../../shared/inlineCard/InlineCard'

const SupportContainer = () => {
    const handleCall = (value: string) => {
        const phoneNumberWithPrefix = `tel:${value}`;
        // Use Linking to open the phone app with the provided phone number
        Linking.openURL(phoneNumberWithPrefix)
            .catch(err => console.error('Error opening phone app:', err));
    }
    const handleEmailButtonPress = (email: string) => {
        // Replace with the recipient's email address
        const subject = 'Subject of the email'; // Replace with your desired subject
        const body = 'Body of the email'; // Replace with your desired email body

        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(mailtoUrl)
            .then(() => console.log('Email opened'))
            .catch((error) => console.error('Error opening email:', error));
    };

    return (
        <View style={globalStyles.childContainer}>
            <InlineCard icon='phone-call' titleKey='Phone 1' onClick={handleCall} value='+8801234567890' />
            <InlineCard icon='phone-call' titleKey='Phone 2' onClick={handleCall} value='+8801234567890' />
            <InlineCard icon='mail' titleKey='Email' onClick={handleEmailButtonPress} value='example@example.com' />
        </View>
    )
}

export default SupportContainer