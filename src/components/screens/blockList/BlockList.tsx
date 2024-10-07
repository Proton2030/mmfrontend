
import { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { EpmtyPage } from '../emptyPage/EmptyPage';
import { api } from '../../../utils/api';
import AuthContext from '../../../contexts/authContext/authContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BlockedAccount from './blcokedAccount/BlockedAccount';


export const BlockList = () => {
    const { colors } = useTheme();
    const { user } = useContext(AuthContext);
    const navigation = useNavigation<any>()
    const [blockList, setBlockList] = useState<any[]>([]);

    const getBlockList = async () => {
        try {
            const filter = {
                userId: user?._id,
            };
            const response = await api.block.getBlockList(filter);
            console.log("response: ", response)
            setBlockList(response);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getBlockList()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <Appbar.Header style={{ backgroundColor: colors.secondary, paddingLeft: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color={colors.primary} style={{ marginRight: 15 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: '500', fontSize: 23, color: colors.primary }}>
                    Blocked Accounts
                </Text>
            </Appbar.Header>
            <View style={styles.container}>
                <ScrollView style={{ paddingHorizontal: 10 }}>
                    {blockList.length > 0 ? (
                        blockList.map((item, index) => (
                            <BlockedAccount item={item} blockeduser={item?.blockedto} getBlockList={getBlockList} />
                        ))
                    ) : (
                        <EpmtyPage />
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingBottom: 24,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        paddingTop: 40,
    },
    /** Header */
    header: {
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    headerTop: {
        marginHorizontal: -6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    headerAction: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1d1d1d',
    },
    /** Empty */
    empty: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100,
    },
    emptyTitle: {
        fontSize: 19,
        fontWeight: '700',
        color: '#222',
        marginBottom: 8,
        marginTop: 12,
    },
    emptyDescription: {
        fontSize: 15,
        lineHeight: 22,
        fontWeight: '500',
        color: '#8c9197',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    /** Fake */
    fake: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    fakeCircle: {
        width: 44,
        height: 44,
        borderRadius: 9999,
        backgroundColor: '#e8e9ed',
        marginRight: 16,
    },
    fakeLine: {
        width: 200,
        height: 10,
        borderRadius: 4,
        backgroundColor: '#e8e9ed',
        marginBottom: 8,
    },
    /** Button */
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'black',
        marginTop: 'auto',
        marginHorizontal: 24,
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
});
