import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Appbar, Avatar, IconButton, useTheme } from 'react-native-paper';
import AuthContext from '../../../contexts/authContext/authContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImageZoom from 'react-native-image-pan-zoom';

const ProfileImage = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { colors } = useTheme();
  const { userid, username, imageURL }: any = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handlenavigateChangeProfilrImage = () => {
    navigation.navigate('changeImage');
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Appbar.Header style={{ backgroundColor: 'rose' }}>
        <Appbar.BackAction onPress={handleGoBack} />
        <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: -12 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', marginLeft: 5 }}>&nbsp;{username}</Text>
        </View>
        {user?._id == userid ? <Appbar.Action icon="pencil" onPress={handlenavigateChangeProfilrImage} /> : null}
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ImageZoom cropWidth={600} cropHeight={'100%'} imageWidth={300} imageHeight={300}>
          <Image source={{ uri: imageURL }} style={{ width: '100%', height: 400, resizeMode: 'cover' }} />
        </ImageZoom>
      </View>
    </View>
  );
};

// Export the UserProfile component
export default ProfileImage;
