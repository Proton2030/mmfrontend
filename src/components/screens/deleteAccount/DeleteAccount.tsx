import { SafeAreaView, TouchableOpacity, Text, View } from "react-native"
import { Appbar, useTheme } from "react-native-paper";
import AuthContext from "../../../contexts/authContext/authContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonButton from "../../shared/commonButton/CommonButton";
import { api } from "../../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeleteAccount = () => {
    const { colors } = useTheme();
    const { user, setUser } = useContext(AuthContext);
    const navigation = useNavigation<any>()


    const deleteAccount = async () => {
        try {
            const filter = {
                userId: user?._id,
            };
            const response = await api.userDetails.deleteUser(filter);
            console.log("first", response)
            AsyncStorage.clear();
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <Appbar.Header style={{ backgroundColor: colors.secondary, paddingLeft: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color={colors.primary} style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 23, color: colors.primary }}>
                        Delete Account
                    </Text>
                </Appbar.Header>
                <Text style={{ color: colors.primary, fontSize: 35, fontWeight: "400", marginTop: 40, marginLeft: 10 }}>
                    Delete your account
                </Text>
                <Text style={{ color: colors.tertiary, fontSize: 20, fontWeight: "400", marginTop: 10, marginLeft: 10, width: "90%" }}>
                    {user?.full_name} are you sure you want to delete your profile?
                    <Text style={{ color: colors.tertiary, fontSize: 20, fontWeight: "400", marginTop: 0, marginLeft: 10 }}>
                        &nbsp;Once you delete it your all data will be removed!
                    </Text>
                </Text>
                <View style={{ paddingHorizontal: 10, marginTop: 30 }}>
                    <CommonButton loading={false} handleAction={deleteAccount} text={"Yes"} />

                </View>
            </SafeAreaView>
        </>
    )
}

export default DeleteAccount