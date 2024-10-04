import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, View, Text, TouchableOpacity, Vibration, BackHandler } from 'react-native';
import { COLORS } from '../../../constants/theme';
import { OtpInput } from 'react-native-otp-entry';
import { useTheme } from 'react-native-paper';
import { selectLanguage } from '../../../utils/commonFunction/languageSelect';
import { SCREEN_TWO } from '../../../constants/texts/auth/signup/screenTwo/ScreenTwo';
import UiContext from '../../../contexts/uiContext/UIContext';

const OtpModal = ({ slideUp, closeModal, handleChangeScreen, userDetails, generatedOtp }: any) => {
  const [otp, setOtp] = useState<string>('');
  const { colors } = useTheme();
  const [focusColor, setFocusColor] = useState('green');
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const {
    ui: { language },
  } = useContext(UiContext);

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
            {selectLanguage(SCREEN_TWO.enter_otp, language)}
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
            {selectLanguage(SCREEN_TWO.sent_otp, language)}
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
            <Text style={{ color: COLORS.primary, fontWeight: '700' }}> +88 {userDetails?.mobile}</Text>
          </Text>
          <View style={{ paddingHorizontal: 50, marginTop: 10, marginBottom: 20 }}>
            <OtpInput
              numberOfDigits={4}
              focusColor={focusColor}
              textInputProps={{ style: { color: 'red' } }}
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
                pinCodeTextStyle: {
                  // Try adding this to apply text color
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
              {selectLanguage(SCREEN_TWO.verify_otp, language)}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default OtpModal;
