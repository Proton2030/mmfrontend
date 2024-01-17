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
        const payload = {
            userObjectId: user?._id,
            message_limit: message_limit,
            tran_id: tranId
        }
        try {
            const response = await api.payment.updateUserMessageLimit(payload);
            if (response) {
                console.log("response", response);
                setUser(response);
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
