import React, { useContext, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { selectLanguage } from '../../../../../utils/commonFunction/languageSelect';
import { getTimeAgo } from '../../../../../utils/commonFunction/lastSeen';
import { OTHERS } from '../../../../../constants/texts/others/Others';
import { IconButton, Switch, useTheme } from 'react-native-paper';
import UiContext from '../../../../../contexts/uiContext/UIContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Change this if using another icon library
import { COLORS } from '../../../../../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../../../../contexts/authContext/authContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { api } from '../../../../../utils/api';

const ProfileImage = ({
  uri,
  userDetails,
  handleNavigateChat,
  handleNavigateProfileImage,
  handleAddChoice,
  choice,
}: any) => {
  const { colors } = useTheme();
  const {
    ui: { language, theme },
  } = useContext(UiContext);
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [isSwitchEnabled, setIsSwitchEnabled] = useState<boolean>(user?.private_status ?? false);

  console.log("stores staye", user?.private_status)
  const toggleSwitch = async () => {
    console.log("first")
    setIsSwitchEnabled(previousState => !previousState);
    setLoading(true)


    const payload = {
      userDetails: { private_status: !user?.private_status },
      userObjectId: user?._id
    };
    console.log(payload)
    try {
      const userInstance = await api.userDetails.updateUser(payload);
      if (userInstance) {
        setUser(userInstance);
      }

      // if (user) {
      //   setUser({
      //     ...user,
      //     account_private: !user?.account_private
      //   });
      // }

    } catch (error) {
      console.log(error);

    }
    finally {
      setLoading(false)
    }
  };


  return (
    <ImageBackground
      source={{ uri: userDetails?._id !== user?._id && userDetails?.private_status === true ? "https://cdn4.iconfinder.com/data/icons/gray-user-management/512/locked-512.png" : uri }} // Replace with your desired background image
      style={styles.header}
      imageStyle={styles.imageStyle}
    >
      {/* Overlay Linear Gradient */}
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} // Dark at top and bottom
        style={styles.gradientOverlay}
      />
      <View style={styles.profileInfo}>
        <View style={styles.userInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
            <Text style={styles.name}>{userDetails.full_name}</Text>
            {userDetails.is_verified ? (
              <MaterialIcons name="verified" size={24} color={'rgb(29, 155, 240)'} style={{ marginTop: 3 }} />
            ) : null}

            {userDetails?.gender === 'FEMALE' ? (
              <Ionicons name="female" size={22} color={COLORS.primary} style={{ marginTop: 3 }} />
            ) : (
              <Ionicons name="male" size={25} color={COLORS.primary} style={{ marginTop: 3 }} />
            )}
          </View>

          <Text style={styles.phone}>
            <FontAwesome5 name="location-arrow" size={15} color={COLORS.primary} />
            &nbsp;
            {selectLanguage(OTHERS.lives, language)} {userDetails.state || 'N/A'}
          </Text>
          {userDetails.status === 'ACTIVE' ? (
            <Text style={{ color: 'white', marginLeft: 5, marginTop: 3 }}>
              <Octicons name="dot-fill" size={15} color={'green'} />
              &nbsp; online
            </Text>
          ) : (
            <Text style={{ color: 'gray', marginLeft: 5, marginTop: 3 }}>
              <Octicons name="dot-fill" size={15} color={COLORS.primary} />
              &nbsp; Active {getTimeAgo(new Date().getTime() - new Date(userDetails.updatedAt).getTime())}
            </Text>
          )}
        </View>
      </View>
      {userDetails?._id === user?._id ? (
        <>
          <TouchableOpacity style={styles.editButton} onPress={handleNavigateProfileImage}>
            <Icon name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.privetSwitchContainer}>
            <Text style={{ color: "white" }}>
              Private Account
            </Text>
            {
              loading ?
                <ActivityIndicator size="small" color="#fff" />
                :
                <Switch
                  style={styles.privetSwitch} // Add your style here if needed
                  value={isSwitchEnabled}
                  onValueChange={toggleSwitch}
                  thumbColor={isSwitchEnabled ? "#fff" : "#f4f3f4"}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}

                />
            }


          </View>

        </>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={handleNavigateProfileImage}>
          <Icon name="eye" size={20} color="#fff" />
        </TouchableOpacity>
      )}

      {userDetails._id !== user?._id ? (
        <>
          <TouchableOpacity style={styles.msgButton}>
            <Ionicons name={choice ? 'heart' : 'heart-outline'} size={24} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateChat} style={styles.LikeButton}>
            <Ionicons name="chatbox-outline" size={24} color={'white'} />
          </TouchableOpacity>
        </>
      ) : (
        <View style={[styles.msgButton, { flexDirection: 'row', alignItems: 'center', gap: 5 }]}>
          <Icon name="eye" size={20} color="#fff" />
          <Text>{user?.view_count || 0} Views</Text>
          {/* </View> */}
        </View>
      )}
    </ImageBackground>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    height: 450,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 30,
    overflow: 'hidden',
    elevation: 15,
  },
  imageStyle: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject, // Make the gradient cover the entire ImageBackground
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userInfo: {
    marginTop: 30,
  },
  name: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  editButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 8,
  },
  privetSwitch: {

  },
  privetSwitchContainer: {
    position: 'absolute',
    top: 40,
    right: 70,
    paddingLeft: 18,
    paddingRight: 5,
    paddingVertical: 5,
    backgroundColor: 'black',
    borderRadius: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  msgButton: {
    position: 'absolute',
    bottom: 35,
    right: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 10,
  },
  LikeButton: {
    position: 'absolute',
    bottom: 35,
    right: 90,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 10,
  },
  accountOverview: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  option: {
    paddingTop: 25,
    paddingBottom: 10,
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 5,
    color: '#333',
  },
});
