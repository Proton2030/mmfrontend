import { View, Text, Modal, Animated, Easing, ScrollView } from 'react-native';
import React, { useContext, useState, useRef } from 'react';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import { Button, useTheme } from 'react-native-paper';
import CenterForm from '../../../../shared/centerForm/CenterForm';
import { SIGNUP_SCREEN_ONE } from '../../../../../constants/forms/SignUp';
import { ISignupScreenProps } from '../../../../../@types/props/SignupScreen.props';
import { selectLanguage } from '../../../../../utils/commonFunction/languageSelect';
import { SCREEN_ONE } from '../../../../../constants/texts/auth/signup/screenOne/ScreenOne';
import UiContext from '../../../../../contexts/uiContext/UIContext';
import CommonButton from '../../../../shared/commonButton/CommonButton';
import OtpModal from '../../../../shared/otpModal/OtpModal';

const SignUpScreenOne = ({ handleChangeScreen, handleChangeText, userDetails, loading }: ISignupScreenProps) => {
  const { colors } = useTheme();
  const {
    ui: { language, theme },
  } = useContext(UiContext);

  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current; // Animation state

  // Function to handle modal open
  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  // Function to handle modal close
  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const handleGenerateOtpClick = () => {
    if (userDetails.mobile.length >= 10) {
      openModal();

    } else {
    }
  };

  // Interpolating the slide animation to move the modal up
  const slideUp = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0], // Slide from bottom
  });

  return (
    <View>
      <View style={[globalStyles.childContainer, { alignItems: 'flex-start' }]}>
        <Text style={[globalStyles.headingText, { color: colors.scrim, marginBottom: 4 }]}>
          {selectLanguage(SCREEN_ONE.request, language)}
          <Text style={{ color: '#E71B73' }}>&nbsp; {selectLanguage(SCREEN_ONE.phone, language)}</Text>
        </Text>
      </View>
      <View style={globalStyles.childContainer}>
        <CenterForm handleChangeText={handleChangeText} fieldList={SIGNUP_SCREEN_ONE} object={userDetails} key={1} />
        <CommonButton
          loading={loading}
          handleAction={handleGenerateOtpClick}
          text={selectLanguage(SCREEN_ONE.otp_button, language)}
        />
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none" // We'll handle the animation manually
        onRequestClose={closeModal}
      >

        <OtpModal slideUp={slideUp} closeModal={closeModal} handleChangeScreen={handleChangeScreen} userDetails={userDetails} />
      </Modal>
    </View>
  );
};

export default SignUpScreenOne;
