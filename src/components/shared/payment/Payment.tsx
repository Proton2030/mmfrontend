import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import React, { useCallback, useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import AuthContext from '../../../contexts/authContext/authContext';
import { api } from '../../../utils/api';

const Payment = () => {
    const route = useRoute<any>();
    const { user, setUser } = useContext(AuthContext);
    const { url, tranId, message_limit } = route.params;

    const handlePayment = useCallback(async () => {
        try {
            if (user) {
                const filter = {
                    userObjectId: user._id
                }
                const response = await api.userDetails.getUserInfo(filter);
                if (response) {
                    console.log("------->response of user", response);
                    setUser(response);
                }
            }
        } catch (error) {
            console.log(error);
        }

    }, [user])

    useEffect(() => {
        return () => {
            handlePayment();
        };
    }, [handlePayment])
    console.log("url", url);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView source={{ uri: url }} style={{ flex: 1 }} />
        </SafeAreaView>
    );
}

export default Payment;
