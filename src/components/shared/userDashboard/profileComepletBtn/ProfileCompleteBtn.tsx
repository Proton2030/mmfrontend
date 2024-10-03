import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../../../contexts/authContext/authContext';
import { USER_INFO_FOUR, USER_INFO_THREE_part2 } from '../../../../constants/forms/UserInformation';
import { useTheme } from 'react-native-paper';

const ProfileCompleteBtn = () => {
    const { user } = useContext<any>(AuthContext);
    const navigation = useNavigation<any>();
    const { colors } = useTheme();

    // Check which fields from USER_INFO_THREE_part2 are missing
    const isReligiousInfoIncomplete = USER_INFO_THREE_part2.some(
        field => !user?.[field.id]
    );

    // Check which fields from USER_INFO_FOUR are missing
    const isFamilyInfoIncomplete = USER_INFO_FOUR.some(
        field => !user?.[field.id]
    );

    // Handle navigation for religious info
    const handleReligiousInfoNavigate = () => {
        navigation.navigate('UserInfo', {
            screen: 'UserInfo3_part2',
            params: {
                editable: true,
            },
        });
    };

    // Handle navigation for family info
    const handleFamilyInfoNavigate = () => {
        navigation.navigate('UserInfo', {
            screen: 'UserInfo4',
            params: {
                editable: true,
            },
        });
    };

    const handleNavigate = () => {
        if (isReligiousInfoIncomplete) {
            handleReligiousInfoNavigate();
        } else if (isFamilyInfoIncomplete) {
            handleFamilyInfoNavigate();
        } else {
            console.log('All sections are complete');
        }
    };

    return (

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleNavigate}>
            <Text style={styles.buttonText}>Complete Your Profile</Text>
        </TouchableOpacity>
    );
};

export default ProfileCompleteBtn;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
