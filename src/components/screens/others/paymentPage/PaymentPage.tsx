import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'react-native-paper';
import { styles } from './style';
import Clipboard from '@react-native-clipboard/clipboard';
import DocumentPicker from 'react-native-document-picker';

const PaymentPage = () => {
  const { colors } = useTheme();
  const [paymentOption, setPaymentOption] = useState(null);
  const [paymentId, setPaymentId] = useState('1234567890');
  const [screenshotUri, setScreenshotUri] = useState(null);

  const handleCopyPaymentId = () => {
    Clipboard.setString(paymentId);
    Alert.alert('Payment ID Copied', 'The payment ID has been copied to your clipboard.');
  };

  const handleUploadScreenshot = async () => {
    try {
      const res: any = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('======>res', res[0]);
      setScreenshotUri(res[0]);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled file picking
      } else {
        console.error('DocumentPicker Error:', error);
      }
    }
  };

  const handleSubmit = () => {
    if (paymentOption === 'manual' && screenshotUri) {
      Alert.alert('Submission Successful', 'Your payment proof has been submitted.');
      // Add further logic here
    } else {
      Alert.alert('Error', 'Please upload a screenshot as proof of payment.');
    }
  };

  return (
    <LinearGradient colors={['#8324ff', '#d781c4', colors.secondary]} style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose a Payment Option</Text>
        <View style={styles.paymentOptionsContainer}>
          <TouchableOpacity style={styles.paymentOptionButton} onPress={() => setPaymentOption('online')}>
            <Text style={styles.paymentOptionText}>Online Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOptionButton} onPress={() => setPaymentOption('manual')}>
            <Text style={styles.paymentOptionText}>Manual Payment</Text>
          </TouchableOpacity>
        </View>
        {paymentOption === 'manual' && (
          <View style={styles.manualPaymentContainer}>
            <View style={styles.paymentIdContainer}>
              <Text style={styles.paymentIdLabel}>Payment ID:</Text>
              <Text style={styles.paymentIdValue}>{paymentId}</Text>
              <TouchableOpacity onPress={handleCopyPaymentId}>
                <Text style={styles.copyButton}>Copy</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadScreenshot}>
              <Text style={styles.uploadButtonText}>Upload Screenshot</Text>
            </TouchableOpacity>
            {screenshotUri && (
              <View style={styles.screenshotContainer}>
                <Text style={styles.screenshotText}>Uploaded File:{screenshotUri?.name}</Text>
                {/* <Image source={{ uri: screenshotUri?.uri }} style={styles.screenshotImage} resizeMode="contain" /> */}
              </View>
            )}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default PaymentPage;
