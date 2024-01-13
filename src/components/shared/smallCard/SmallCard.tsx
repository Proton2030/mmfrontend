import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { Card } from 'react-native-paper'
import { globalStyles } from '../../../globalStyles/GlobalStyles'
import { TMenuProps } from '../../../@types/props/MenuProps.types'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../../../contexts/authContext/authContext'
import CustomDialog from '../customDialog/CustomDialog'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SmallCard = ({ icon, text }: TMenuProps) => {
    const navigation = useNavigation<any>();
    const { user, setUser } = useContext(AuthContext);
    const [visible, setVisible] = useState<boolean>(false);
    const handleRouteMyProfile = () => {
        navigation.navigate("UserDetails", {
            userDetails: user,
            editable: false
        })
    }
    const handleRouteTerms = () => {
        navigation.navigate("Terms")
    }
    const handleRoutePrivacy = () => {
        navigation.navigate("Privacy")
    }
    const handleLogOut = () => {
        AsyncStorage.clear();
        setUser(null);
        setVisible(false);
    }
    const handleClick = () => {
        switch (text) {
            case "Logout":
                setVisible(true);
                return;
            case "My Profile":
                handleRouteMyProfile();
                return;
            case "Terms and Condition":
                handleRouteTerms();
                return;
            case "Privacy Policy":
                handleRoutePrivacy();
                return;
        }
    }
    return (
        <>
            <Card style={globalStyles.menuCard} onPress={handleClick}>
                <Card.Content>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: 10
                        }}>
                            <Icon name={icon} size={20} color="#E71B73" />
                            <Text style={globalStyles.menucardText}>{text}</Text>
                        </View>
                        <Icon name="arrow-right" size={20} color="#E71B73" />
                    </View>
                </Card.Content>
            </Card>
            <CustomDialog title={"Are You Confirm to Logout ?"} leftLabel={"Cancel"} rightLabel={"Logout"} body={""} visible={visible} hideDialog={() => { setVisible(false) }} handleRightButtonClick={handleLogOut} />
        </>
    )
}

export default SmallCard