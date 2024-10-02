import { WebView } from 'react-native-webview';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import CustomizeAppBar from '../customizeAppbar/CustomizeAppBar';
import { DOMAIN_LINK, PAYMENT_REDIRECTION_LINK } from '../../../constants/paymentLink';

import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Payment = () => {
  const route = useRoute<any>();
  const { paymentUrl, tranId, planId } = route.params;
  const navigation = useNavigation<any>();
  const [currentUrl, setCurrentUrl] = useState<string>(paymentUrl);
  const [loading, setLoading] = useState<boolean>(true);

  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;
    setCurrentUrl(url);

    if (url.includes(PAYMENT_REDIRECTION_LINK) || url.includes(DOMAIN_LINK)) {
      // Add your logic here
      navigation.replace('PaymentVerification', { tranId, planId });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: { preventDefault: () => void }) => {
      e.preventDefault(); // Prevent the screen from being removed
      Alert.alert('Do not close the window');
      unsubscribe();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomizeAppBar />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={70} color="#0000ff" />
        </View>
      ) : null}
      <WebView
        source={{ uri: currentUrl }}
        style={{ flex: 1 }}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Payment;
