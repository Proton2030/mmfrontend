import { Dimensions, StyleSheet } from "react-native";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const globalStyles = StyleSheet.create(
    {
        parent: {
            flex:1,
            paddingBottom:0,
        },
        parentScrollContainer:{
            paddingTop:25,
            flexGrow:1,
            justifyContent: "center",
            alignItems: "center",
        },
        parentView: {
            flex:1,
            justifyContent: "space-around",
            alignItems: "center",
            padding: 30
        },
        innerContainer:{
            width:"100%"
        },
        childContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width:windowWidth,
            padding:30
        },
        roundedInputBox: {
            width: "100%",
            marginBottom: 8,
            height:60
        },
        pinkButton:{
            width:"100%",
            marginTop:15,
            backgroundColor:"#E71B73",
            padding:6,
        },
        lightPinkButton:{
            backgroundColor:"#fde8f1",
            borderColor:"#E71B73",
            width:"100%",
            padding:6
        },
        label:{
            color:"#595857"
        },
        headingText:{
            fontSize:25,
            color:"black",
            fontWeight:"bold",
            textAlign:"center",
            textTransform:"capitalize"
        },
        mediumText:{
            fontSize:20,
            color:"black",
            fontWeight:"bold",
            textAlign:"left",
            textTransform:"capitalize"
        },
        middleImage:{
            width:windowWidth/2,
            height:windowHeight/2,
            resizeMode:"cover"
        },
        selectField:{
            width:"100%",
            borderColor:"gray",
            backgroundColor:"white",
            height:60,
            marginBottom:10,
            borderWidth:1,
            borderRadius:10
        },
        selectText:{
            color:"#595857",
            textAlign:"left"
        },
        menuCard:{
            backgroundColor:"#fde8f1",
            color:"#E71B73",
            marginBottom:12
        },
        menucardText:{
            color:"#E71B73"
        },
        card:{
            marginTop:40,
            paddingBottom:20,
            borderWidth:0,
            borderBottomWidth:2,
            borderColor:"#fde8f1"
        },
        cardImage:{
            width:windowWidth,
            height:windowHeight/3,
            resizeMode:"cover"
        },
        iconText:{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 5
        }
    }
)