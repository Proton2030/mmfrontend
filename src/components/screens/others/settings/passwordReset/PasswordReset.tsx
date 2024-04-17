import React, { useContext, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Appbar, useTheme } from 'react-native-paper';
import axios from 'axios';
import AuthContext from '../../../../../contexts/authContext/authContext';
import SnackbarAlert from '../../../../shared/snackbarAlert/SnackbarAlert';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { api } from '../../../../../utils/api';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../../../../globalStyles/GlobalStyles';

const PasswordReset = () => {
  const { user } = useContext(AuthContext);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (oldPassword === newPassword) {
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

  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#fde8f1' }}>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Change Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              label="Old Password"
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="New Password"
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry
              style={styles.input}
            />
          </View>

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
});

export default PasswordReset;
