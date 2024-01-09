import { View, ScrollView, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { globalStyles } from '../../../globalStyles/GlobalStyles';
import { formatKeys } from '../../../utils/commonFunction/formatKeys';

const UserDetails = () => {
    const route = useRoute<any>();
    const { userDetails } = route.params;
    const windowWidth = Dimensions.get("window").width;
    return (
        <ScrollView style={globalStyles.parent} contentContainerStyle={globalStyles.parentScrollContainer}>
            <View style={{ marginBottom: 20 }}>
                <Image source={{ uri: userDetails.profile_image_url }} style={{ width: windowWidth / 2, height: windowWidth / 2, borderRadius: windowWidth / 4 }} />
                <Text style={[globalStyles.headingText, { marginTop: 15 }]}>{userDetails.full_name}</Text>
            </View>
            {
                Object.keys(userDetails).map((key, index) => {
                    // Skip rendering the password field
                    if (key === 'password' || key === "profile_image_url" || key === "_id" || key === "ACTIVE" || key === "email" || key === "mobile" || key === "full_name") {
                        return null;  // Return null to skip rendering this field
                    }
                    return (
                        <View key={index} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                            <Text>{formatKeys(key)}</Text>
                            <Text>{userDetails[key]}</Text>
                        </View>
                    );
                })
            }


        </ScrollView >
    )
}

export default UserDetails