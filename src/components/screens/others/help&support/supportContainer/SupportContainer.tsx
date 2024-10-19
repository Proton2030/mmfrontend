import { View, Text, Linking, Modal, TextInput, Button, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';
import InlineCard from '../../../../shared/inlineCard/InlineCard';
import AuthContext from '../../../../../contexts/authContext/authContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SupportContainer = () => {
  const { user } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [feedback, setFeedback] = useState(''); // Feedback input state

  const handleCall = (value: string) => {
    const phoneNumberWithPrefix = `tel:${value}`;
    Linking.openURL(phoneNumberWithPrefix).catch((err) => console.error('Error opening phone app:', err));
  };

  const handleEmailButtonPress = (email: string) => {
    const subject = 'Subject of the email';
    const body = 'Body of the email';
    const mailtoUrl = `mailto:${'info@shohozshadi.com'}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoUrl)
      .then(() => console.log('Email opened'))
      .catch((error) => console.error('Error opening email:', error));
  };

  const handleSendFeedback = () => {
    if (feedback.trim() !== '') {
      console.log('Feedback sent:', feedback);
      // Here you can handle sending feedback to your backend or API
      setModalVisible(false); // Close modal after sending
      setFeedback(''); // Reset feedback input
    } else {
      console.log('Please enter feedback before sending.');
    }
  };

  return (
    <View style={globalStyles.childContainer}>
      {user?.gender === 'MALE' ? (
        <>
          <InlineCard
            icon="phone-call"
            titleKey="Phone 2 "
            onClick={handleCall}
            value="+880 1700-952906"
            buttonIcon="phone"
          />
          <InlineCard
            icon="phone-call"
            titleKey="Phone 2 "
            onClick={handleCall}
            value="+880 1700-952907"
            buttonIcon="phone"
          />
          <InlineCard
            icon="mail"
            titleKey="Email "
            onClick={handleEmailButtonPress}
            value="info@shohozshadi.com"
            buttonIcon="gmail"
          />
        </>
      ) : (
        <>
          <InlineCard
            icon="phone-call"
            titleKey="Phone 1 "
            onClick={handleCall}
            value="+880 1700952906"
            buttonIcon="phone"
          />
          <InlineCard
            icon="phone-call"
            titleKey="Phone 2 "
            onClick={handleCall}
            value="+880 1700952907"
            buttonIcon="phone"
          />
          <InlineCard
            icon="mail"
            titleKey="Email "
            onClick={handleEmailButtonPress}
            value="info@shohozshadi.com"
            buttonIcon="gmail"
          />
        </>
      )}

      {/* Button to open feedback modal */}
      {/* <TouchableOpacity style={styles.feedbackBtn} onPress={() => setModalVisible(true)}>
        <Text style={{ color: 'white', fontSize: 15 }}>Send your query to us</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Write Something here</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your feedback here"
              value={feedback}
              onChangeText={setFeedback}
              multiline
            />
            <Button color={'black'} title="Send Feedback" onPress={handleSendFeedback} />
            <View style={{ marginVertical: 5 }}></View>
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  feedbackBtn: {
    backgroundColor: '#E71B73',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    width: 300,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
    color: 'black',
  },
});

export default SupportContainer;
