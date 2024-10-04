import React, { useRef, useState } from 'react';
import { Animated, ScrollView, View, Text, TouchableOpacity, Vibration } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { OtpInput } from 'react-native-otp-entry';
import { useTheme } from 'react-native-paper';

// const tempUri =
//   'https://img.freepik.com/free-photo/3d-mobile-phone-with-security-code-padlock_107791-16180.jpg?t=st=1713429697~exp=1713433297~hmac=75a9f85ebaba5f63f78f9f3b5e5e1a83dd43d27197ca03c023ff01cdd5703d61&w=740';

const OtpModal = ({ slideUp, closeModal, handleChangeScreen, userDetails, generatedOtp }: any) => {
  const [otp, setOtp] = useState<string>('');
  const { colors } = useTheme();
  const [focusColor, setFocusColor] = useState('green');
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const handleSubmit = () => {
    console.log('===>Otp', otp);
    console.log('first', generatedOtp);
    if (otp === generatedOtp) {
      console.log('=======>otp matched');
      handleChangeScreen();
    } else {
      shakeImage();
      Vibration.vibrate(100);
    }
  };

  const shakeImage = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
    Vibration.vibrate(100);
  };
  return (
    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <Animated.View
        style={{
          transform: [{ translateY: slideUp }],
          height: 320,
          backgroundColor: colors.background,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 10,
        }}
      >
        <ScrollView>
          {/* <Animated.Image
            style={[
              { height: 0, width: 0, marginLeft: 'auto', marginRight: 'auto' },
              { transform: [{ translateX: shakeAnimation }] },
            ]}
            source={{ uri: tempUri }}
          /> */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: '500',
              marginBottom: 10,
              color: colors.scrim,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            Verify Your Contact Number
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              marginBottom: 10,
              color: colors.scrim,
              textAlign: 'center',
              marginTop: 0,
              width: '80%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Please Enter the 4-digit code we have
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              marginBottom: 10,
              color: colors.scrim,
              textAlign: 'center',
              marginTop: -5,
              width: '80%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            sent to <Text style={{ color: COLORS.primary, fontWeight: '700' }}> +880 {userDetails?.mobile}</Text>
          </Text>
          <View style={{ paddingHorizontal: 50, marginTop: 10, marginBottom: 20 }}>
            <OtpInput
              numberOfDigits={4}
              focusColor={focusColor}
              textInputProps={{ style: { color: "red" } }}
              focusStickBlinkingDuration={400}
              onTextChange={(text) => {
                setFocusColor('green');
              }}
              onFilled={(text) => {
                setOtp(text);
                if (text !== generatedOtp) {
                  setFocusColor('red');
                }
              }}
              theme={{
                filledPinCodeContainerStyle: {
                  borderColor: focusColor,
                },
                pinCodeTextStyle: { // Try adding this to apply text color
                  color: colors.primary,
                },
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              borderColor: COLORS.primary,
              width: '90%',
              paddingHorizontal: 10,
              paddingVertical: 13,
              borderTopEndRadius: 25,
              borderBottomEndRadius: 25,
              borderTopLeftRadius: 25,
              marginLeft: 20,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{ fontWeight: '400', fontSize: 20, justifyContent: 'center', textAlign: 'center', color: 'white' }}
            >
              Verify Otp
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default OtpModal;
