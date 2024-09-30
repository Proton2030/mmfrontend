import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 'react-native-paper';
import UiContext from '../../../../../contexts/uiContext/UIContext';
import { formatKeys } from '../../../../../utils/commonFunction/formatKeys';

const ProfileDetailsCard = ({ title, key }: any) => {
    const { colors } = useTheme();
    const {
        ui: { language, theme },
    } = useContext(UiContext);
    console.log(key)
    return (
        <View style={{
            backgroundColor: theme !== "DARK" ? "#e6e6e6" : colors.backdrop, height: 50, width: 110,
            borderRadius: 10, paddingHorizontal: 10, gap: 4, justifyContent: 'center'
        }}>
            <Text style={{ color: colors.tertiary, fontSize: 12 }}>
                {key.id === 'state' ? (
                    <Text style={{}}>District</Text>
                ) : (
                    <Text style={{}}>{formatKeys(key.id, language)}</Text>
                )}
            </Text>
            <Text style={{ color: theme === "DARK" ? "white" : colors.tertiary, fontWeight: "500" }}>
                {title}
            </Text>
        </View>
    )
}

export default ProfileDetailsCard