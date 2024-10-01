import { WebView } from 'react-native-webview';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import CustomizeAppBar from '../customizeAppbar/CustomizeAppBar';

const Payment = () => {
  const route = useRoute<any>();
  const { url } = route.params;
  const navigation = useNavigation<any>();

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
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
};

export default Payment;
