import React, { useContext } from 'react'
import { View, Text, Image, Animated, TouchableOpacity } from 'react-native'
import { List, useTheme } from 'react-native-paper';
import { api } from '../../../../utils/api';
import AuthContext from '../../../../contexts/authContext/authContext';

const BlockedAccount = ({ item, blockeduser, getBlockList }: any) => {
    const { user } = useContext(AuthContext);
    const { colors } = useTheme();

    const unBlockUser = async () => {
        getBlockList()

        try {
            const payload = {
                userId: user?._id,
                blockedto: blockeduser?._id,
                roomId: item.roomId,
                user_gender: user?.gender
            }
            const response = await api.block.unBlockUser(payload);
            console.log("response: ", response)
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Animated.View
            style={{
                backgroundColor: colors.surface,
                marginTop: 10,
                marginHorizontal: 10,
                borderRadius: 20,
                borderWidth: 0,
                borderColor: colors.secondary,
            }}
        >
            <List.Item
                title={blockeduser?.full_name}
                titleStyle={{
                    fontWeight: '900',
                }}
                description={
                    <>
                        <Text style={{ fontWeight: '400', fontSize: 10, color: colors.tertiary }}>
                            Blocked account
                        </Text>
                    </>
                }

                right={(props) => (
                    <TouchableOpacity
                        onPress={unBlockUser}
                        style={{
                            backgroundColor: colors.primary, paddingVertical: 10, paddingHorizontal: 10,
                            borderRadius: 5,
                            marginTop: "auto", marginBottom: "auto",
                            flexDirection: "row",
                            alignContent: "center"

                        }}>
                        <Text style={{ color: colors.background }}>
                            Unblock
                        </Text>
                    </TouchableOpacity>
                )}
                left={(props: any) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 4,
                            paddingLeft: 20,
                        }}
                    >
                        <Image
                            source={{ uri: blockeduser?.profile_image_url }}
                            style={{ height: 50, width: 50, borderRadius: 999 }}
                        />

                    </View>
                )}
            />
        </Animated.View>
    )
}

export default BlockedAccount