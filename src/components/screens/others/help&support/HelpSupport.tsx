import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Title, List } from 'react-native-paper';
import { EllipsizeProp } from 'react-native-paper/lib/typescript/types';

const HelpAndSupport = () => {
    const [loginExpanded, setLoginExpanded] = useState(false);
    const [signupExpanded, setSignupExpanded] = useState(false);
    const [resetPasswordExpanded, setResetPasswordExpanded] = useState(false);
    const [otpExpanded, setOtpExpanded] = useState(false);
    const [bioDataExpanded, setBioDataExpanded] = useState(false);
    const [fillBioDataExpanded, setFillBioDataExpanded] = useState(false);
    const [partnerExpectationsExpanded, setPartnerExpectationsExpanded] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>Help and Support</Title>

            <List.Section>
                {renderAccordionItem('How to login?', loginExpanded, setLoginExpanded, 'To log in, navigate to the login screen and enter your credentials.')}
                {renderAccordionItem('How to Free sign up?', signupExpanded, setSignupExpanded, 'To sign up for free, go to the sign-up screen and follow the registration process.')}
                {renderAccordionItem('How to reset password?', resetPasswordExpanded, setResetPasswordExpanded, 'To reset your password, go to the password reset screen and follow the instructions.')}
                {renderAccordionItem('How to get OTP on phone number?', otpExpanded, setOtpExpanded, 'To receive an OTP on your phone number, make sure your phone number is linked to your account, and follow the OTP retrieval process.')}
                {renderAccordionItem('What is bio-data?', bioDataExpanded, setBioDataExpanded, 'Bio-data refers to personal information and details about an individual, including name, age, address, etc.')}
                {renderAccordionItem('How to fill up bio data?', fillBioDataExpanded, setFillBioDataExpanded, 'To fill up your bio-data, go to the profile or settings screen and update your personal information.')}
                {renderAccordionItem('What is partner expectations?', partnerExpectationsExpanded, setPartnerExpectationsExpanded, 'Partner expectations refer to the qualities and attributes you are looking for in a potential partner.')}
            </List.Section>
        </ScrollView>
    );
};

const renderAccordionItem = (title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, expanded: boolean | undefined, setExpanded: { (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (value: React.SetStateAction<boolean>): void; (arg0: boolean): void; }, description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | ((props: { selectable: boolean; ellipsizeMode: EllipsizeProp | undefined; color: string; fontSize: number; }) => React.ReactNode) | null | undefined) => {
    return (
        <List.Accordion
            title={title}
            expanded={expanded}
            onPress={() => setExpanded(!expanded)}
            style={styles.accordion}
        >
            <List.Item
                title={description}
                description=""
            />
        </List.Accordion>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    accordion: {
        marginBottom: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
});

export default HelpAndSupport;
