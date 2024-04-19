import React, { useContext, useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Appbar, useTheme } from 'react-native-paper';
import axios from 'axios';
import AuthContext from '../../../../../contexts/authContext/authContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { api } from '../../../../../utils/api';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';

const PasswordReset = () => {
  const { user } = useContext(AuthContext);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track whether passwords match

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (oldPassword === newPassword && newPassword === confirmNewPassword) {
      setSnackbarVisible(true);
      return;
    }
    try {
      const response = await api.auth.ResetPassword({
        mobile: user?.mobile,
        currentPassword: oldPassword,
        newPassword: newPassword,
      });
      if (response) {
        console.log(response);
        handleGoBack();
      }
    } catch (error: any) {
      console.error('Error occurred:', error);
    }
  };

  // Function to handle changes in the Confirm New Password field
  const handleConfirmPasswordChange = (text) => {
    setConfirmNewPassword(text);
    setPasswordsMatch(text === newPassword); // Check if Confirm New Password matches New Password
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.secondary, paddingLeft: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={colors.primary} style={{ marginRight: 15 }} />
        </TouchableOpacity>
        <Text style={{ fontWeight: '800', fontSize: 23, color: colors.onSurface }}>Settings</Text>
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 20,
          paddingHorizontal: 30,
          backgroundColor: colors.background,
        }}
      >
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Change Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Old Password"
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="New Password"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Confirm New Password"
              value={confirmNewPassword}
              onChangeText={handleConfirmPasswordChange} // Call the new function for Confirm New Password change
              secureTextEntry
              style={styles.input}
            />
          </View>
          {!passwordsMatch && <Text style={styles.passwordMismatch}>Passwords do not match</Text>}

          <Button
            mode="contained"
            style={globalStyles.pinkButton}
            labelStyle={globalStyles.pinkButtonText}
            onPress={handleSubmit}
          >
            Reset Password
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
  passwordMismatch: {
    color: 'red',
    marginTop: -7,
    marginBottom: 10,
  },
});

export default PasswordReset;
