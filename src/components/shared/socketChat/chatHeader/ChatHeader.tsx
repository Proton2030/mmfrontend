import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, findNodeHandle } from 'react-native';
import { useRoute } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';
import { styles } from '../styles';
import { globalStyles } from '../../../../globalStyles/GlobalStyles';
import { getTimeAgo } from '../../../../utils/commonFunction/lastSeen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatHeader = ({ hadnlenavigate, userDetails, updatedAt, toggleMenu, iconRef }: any) => {
    const route = useRoute<any>();
    const { colors } = useTheme();

    // State to control popover visibility


    return (
        <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.secondary }]}>
            <View style={styles.headerLeft}>
                <TouchableOpacity onPress={hadnlenavigate}>
                    <FeatherIcon name="arrow-left" size={24} color={colors.scrim} style={styles.backArrow} />
                </TouchableOpacity>
                {userDetails?.profile_image_url ? (
                    <View>
                        <Image
                            alt=""
                            resizeMode="cover"
                            source={{ uri: userDetails?.profile_image_url }}
                            style={styles.cardImg}
                        />
                        {userDetails.status === 'ACTIVE' ? (
                            <View style={globalStyles.onlineDot} />
                        ) : (
                            <View style={globalStyles.offlineDot} />
                        )}
                    </View>
                ) : (
                    <View style={[styles.cardImg, styles.cardAvatar]} />
                )}
                <View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 2 }}>
                        <Text style={[styles.userName, { color: colors.scrim }]}> {userDetails.full_name?.split(' ')[0]}</Text>
                        {userDetails.is_verified ? <MaterialIcons name="verified" size={20} color={"rgb(29, 155, 240)"}
                            style={{ marginTop: 1 }} /> : null}

                    </View>
                    <Text style={{ fontSize: 10, textAlign: 'left', marginLeft: 10, color: 'gray', alignItems: 'flex-end' }}>
                        {userDetails.status === 'ACTIVE'
                            ? '(Online)'
                            : `Offline ${getTimeAgo(new Date().getTime() - new Date(updatedAt).getTime())}`}
                    </Text>
                </View>



            </View>

            {/* Three dots menu */}
            <TouchableOpacity ref={iconRef} onPress={toggleMenu}>
                <FeatherIcon name="more-vertical" size={24} color={colors.scrim} />
            </TouchableOpacity>

            {/* Popover menu */}

        </View>
    );
};

export default ChatHeader;
