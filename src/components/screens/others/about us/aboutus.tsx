import React from 'react'
import { Image, ScrollView,StyleSheet, View } from 'react-native'
import { Button, Text, Title } from 'react-native-paper'

export const Aboutus=()=> {
  return (
    <ScrollView style={styles.container}>
        {/* <Title style={styles.title}>About us</Title> */}
        <Image
        style={{height:200,width:"100%",borderRadius:10,}}
        source={{uri: 'https://imgs.search.brave.com/PJQvCK2Mo6xj8td9uwRDTkvKFrFPl-bQHJ1BWGGbBLU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2M5L2E1/Lzc5L2M5YTU3OThi/MGViOGNmMzdlODhh/ODdiYmMwYTA5Mjhh/LmpwZw'}}
      />

        <Text style={{fontWeight:"800",fontSize:28,color:"#E71B73",textAlign:"center",marginTop:10,marginBottom:20,borderBottomWidth:4,borderBottomColor:"#ffc8dd",width:"30%"}}>About us</Text>
        <Text style={styles.subtitle}>Where Faithful Hearts Unite for</Text>
        <Text style={styles.subtitle}>Everlasting Love</Text> 
        <View style={{marginTop:10}}>
            <Text style={{fontWeight:"700",fontSize:15,color:"#717171",lineHeight:18}}>Decades of matchmaking expertise, exemplified by 'Patrapatri' (matrimonial classifieds) got reinvented online 
            in the form of ABPweddings.com.As society evolved,the decision making pertaining to marriage became collaborative.The joy of customised search, shortlisting and sharing with all 
            relevant members of family and extended family became convenient with the click of a button.But, the apprehension of fake profiles and false claims remained.ABPweddings.com attempts to remove this concern of yours
             as the ethos of this matrimonial site from ABP Group stands for TRUST!</Text>
        </View>
        <View style={{marginTop:10}}>
            <Title style={{fontSize:20,fontWeight:"800",color:"#E71B73"}}>Free and Convenient Registration Options</Title>
            <Text style={{fontWeight:"500",fontSize:15,color:"#717171",lineHeight:18}}>ABPWeddings.com makes submission of a photo ID mandatory for any user who would like to connect with other users registered on the site.The documents submitted are
             moderated manually to match the information provided.Hence the profiles here are trustworthy unlike other matrimonial sites.One can be certain that one 
             is communicating with a genuine person and not a fictitious profile!ABPWeddings has also attempted to create a credible profile base by introducing the concept of Trust Score.A user gets the Trust Score by successful submission of documents such as photo ID, address proof, educational qualification certificates, employment/income proof, divorce documents (if any) and other relevant documents.</Text>
        </View>
        <Text style={{fontSize:15,fontWeight:"500",color:"#717171",marginTop:30}}>We uphold your trust in the highest esteem and our entire effort revolves around valuing that!After all, we believe in Real people. Real Relationships.</Text>
        <Button style={{backgroundColor:"#E71B73",marginTop:20,marginBottom:50}}>
            <Text style={{color:"white"}}>Register</Text>
            </Button>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    container: {
      padding: 16,

    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
       borderWidth:2,
       
      },
      subtitle:{
     fontSize:20,
     fontWeight:"600",
     marginBottom:5,
     
     

      },

})
