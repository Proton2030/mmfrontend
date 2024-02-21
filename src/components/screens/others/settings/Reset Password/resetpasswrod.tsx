
import { ScrollView, View,StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Button, Icon, Snackbar, Text, TextInput, } from 'react-native-paper'
import { globalStyles } from '../../../../../globalStyles/GlobalStyles'
import {reset} from '../../../../../assets'
import CenterForm from '../../../../shared/centerForm/CenterForm'
import { useEffect, useState } from 'react'
import SnackbarAlert from '../../../../shared/snackbarAlert/SnackbarAlert'
export const resetpasswrod=()=> {
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '',reenterpassword:"" });
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
  
    const toggleOldPasswordVisibility = () => {
      setOldPasswordVisible(!oldPasswordVisible);
    };
  
    const toggleNewPasswordVisibility = () => {
      setNewPasswordVisible(!newPasswordVisible);
    };
  
    const toggleConfirmPasswordVisibility = () => {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handlePasswordChange = (type: any, value: any) => {
        setPasswords(prevState => ({
            ...prevState,
            [type]: value
        }));
    };
    const handlePasswordValidation = () => {
        const { newPassword, reenterpassword } = passwords;
        if (newPassword !== reenterpassword) {
            setSnackbarMessage('Passwords do not match');
            setSnackbarVisible(true);
            return
        }
        console.log("true")
        return true;
    };
    const handleSnackbarDismiss = () => {
        setSnackbarVisible(false); // Hide the Snackbar when dismissed
    };

    useEffect(() => {
        console.log(passwords); // Logging the state after it has been updated
    }, [passwords]); 
  
  return (

    <>

    
    <ScrollView style={styles.container}>
{/* <View style={styles.lockIconContainer}>
<Image source={reset} style={{height:"100%",width:"100%"}} />
      </View>
      <Text style={styles.titleText}>Reset Your Password</Text>
     <Text style={{color:"#717171",fontWeight:"600",fontSize:17,textAlign:"center"}}>we have sent four digit code on your phone</Text>
     <Text style={{color:"#717171",fontWeight:"600",fontSize:17,marginBottom:25,textAlign:"center"}}>on your phone</Text> */}
     
     <View>
     <Text style={globalStyles.label}>Old Password</Text>
     <TextInput
        style={styles.textInput}
        placeholder="Old Password"
        textContentType="password"
        secureTextEntry={!oldPasswordVisible}
        value={passwords.oldPassword}
        onChangeText={text => handlePasswordChange('oldPassword', text)}
        right={<TextInput.Icon icon={oldPasswordVisible ? 'eye-off' : 'eye'} onPress={toggleOldPasswordVisibility} />}
        />
        
    <Text style={globalStyles.label}>New Password</Text>
      
      <TextInput
        style={styles.textInput}
        placeholder="New Password"
        textContentType="newPassword"
        secureTextEntry={!newPasswordVisible}
        value={passwords.newPassword}
        onChangeText={text => handlePasswordChange('newPassword', text)}
        right={<TextInput.Icon icon={newPasswordVisible ? 'eye-off' : 'eye'} onPress={toggleNewPasswordVisibility} />}
      />
      <Text style={globalStyles.label}>Re enter Password</Text>
      
      <TextInput
        style={styles.textInput}
        placeholder="Re enter Password"
        textContentType="newPassword"
        value={passwords.reenterpassword}
        secureTextEntry={!confirmPasswordVisible}
        onChangeText={text => handlePasswordChange('reenterpassword', text)}
        right={<TextInput.Icon icon={confirmPasswordVisible ? 'eye-off' : 'eye'} onPress={toggleConfirmPasswordVisibility} />}
      />
      <Button
        mode="contained"
        style={globalStyles.pinkButton}
        onPress={handlePasswordValidation}
        >

        <Text style={{color:"white",fontWeight:"700",fontSize:20}}>change password</Text>
        
      </Button>
     </View>
     
    
     
       
        </ScrollView>
        <SnackbarAlert visible={snackbarVisible} onDismissSnackBar={handleSnackbarDismiss} message={snackbarMessage} />

        </>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      
      

    },
    lockIconContainer: {
        marginTop:10,
        marginBottom: 10,
        alignSelf:"center",
        padding:10,
        height:250,
        width:250,
        
      },
      lockIcon: {
        width: 100,
        height: 100,
      },
      titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign:"center",
        color:"#E71B73",
      },
      textInput: {
        marginBottom: 10,
        padding:5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor:"white",
        marginTop:10
        
      },
      submitButton: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#4CAF50',
      }

})

export default resetpasswrod