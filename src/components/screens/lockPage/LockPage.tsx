import React from 'react'
import { View, Image, Text } from 'react-native'
import { COLORS } from '../../../constants/theme'
import ProfileCompleteBtn from '../../shared/userDashboard/profileComepletBtn/ProfileCompleteBtn'

const LockPage = () => {
    return (
        <>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: "auto", marginBottom: "auto" }}>
                <Image style={{ height: 200, width: 200 }} source={{ uri: "https://threedio-prod-var-cdn.icons8.com/au/preview_sets/previews/D9JzPJxKFaI0a_9Y.webp" }} />
                <Text style={{ color: COLORS.primary, fontWeight: "600", fontSize: 25 }}>
                    OOps! your profile details
                </Text>
                <Text style={{ color: COLORS.primary, fontWeight: "600", fontSize: 25, marginBottom: 20 }}>
                    are not completed
                </Text>
                <ProfileCompleteBtn />
            </View>
        </>
    )
}

export default LockPage