
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Appbar, Avatar, IconButton } from 'react-native-paper';
import AuthContext from '../../../contexts/authContext/authContext';
import { useNavigation, useRoute } from '@react-navigation/native';


const ProfileImage = () => {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { userid, username, imageURL }: any = route.params;

    const handleGoBack = () => {
        navigation.goBack();
    };
    const handlenavigate = () => {
        navigation.navigate("editProfileImage")
    }
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={{ backgroundColor: "rose" }}>
                <Appbar.BackAction onPress={handleGoBack} />
                <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: -12 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', marginLeft: 5 }}>&nbsp;{username}</Text>
                </View>
                {
                    (user?._id == userid) ? <Appbar.Action icon="pencil" onPress={() =>} />
                        :
                        null
                }

            </Appbar.Header>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: imageURL }} style={{ width: 300, height: 300, resizeMode: 'cover' }} />
            </View>
        </View>
    );
};

// Export the UserProfile component
export default ProfileImage;
