import { useRef, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function OtpScreen({navigation}){

const [otp,setOtp]=useState(["","","","","",""]);
const [focusIndex,setFocusIndex]=useState(null);
const inputs=useRef([]);

const handleChange=(text,index)=>{
    let newOtp=[...otp];
    newOtp[index]=text;
    setOtp(newOtp);

    if(text && index<5){
        inputs.current[index+1].focus();
    }
};

return(
<KeyboardAvoidingView
style={{flex:1}}
behavior={Platform.OS==="ios"?"padding":"height"}
>

<ScrollView
contentContainerStyle={{flexGrow:1}}
keyboardShouldPersistTaps="handled"
>

<View style={styles.container}>

{/* HEADER */}
<LinearGradient
colors={["#ff0033","#ff6600"]}
style={styles.header}
>

<Image
source={require("../assets/images/icon1.png")}
style={styles.logo}
/>

<Text style={styles.appName}>
Smart Luggage
</Text>

<Text style={styles.subtitle}>
OTP Verification
</Text>

</LinearGradient>

{/* CARD */}
<View style={styles.card}>

<Text style={styles.title}>
Enter OTP
</Text>

<Text style={styles.desc}>
Enter the 6-digit code sent to your phone
</Text>

{/* OTP BOXES */}
<View style={styles.otpRow}>
{
otp.map((digit,index)=>(
<TextInput
key={index}
ref={(ref)=>inputs.current[index]=ref}
style={[styles.otpBox, focusIndex===index && styles.focus]}
keyboardType="numeric"
maxLength={1}
value={digit}
onFocus={()=>setFocusIndex(index)}
onBlur={()=>setFocusIndex(null)}
onChangeText={(text)=>handleChange(text,index)}
/>
))
}
</View>

{/* VERIFY BUTTON */}
<TouchableOpacity style={styles.btn}>

<LinearGradient
colors={["#ff0033","#ff6600"]}
style={styles.gradientBtn}
>

<Text style={styles.btnText}>
Verify OTP
</Text>

</LinearGradient>

</TouchableOpacity>

{/* RESEND */}
<Text style={styles.resend}>
Didn't receive OTP? <Text style={styles.link}>Resend</Text>
</Text>

<TouchableOpacity
onPress={()=>navigation.navigate("Login")}
>

<Text style={styles.back}>
Back to Login
</Text>

</TouchableOpacity>

</View>
</View>
</ScrollView>
</KeyboardAvoidingView>
);
}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f6fa"
},

header:{
height:240,
borderBottomLeftRadius:40,
borderBottomRightRadius:40,
alignItems:"center",
justifyContent:"center"
},

logo:{
width:65,
height:65,
marginBottom:10
},

appName:{
color:"#fff",
fontSize:26,
fontWeight:"bold"
},

subtitle:{
color:"#fff",
marginTop:5
},

card:{
padding:30,
paddingTop:40
},

title:{
fontSize:26,
fontWeight:"bold",
textAlign:"center",
marginBottom:10
},

desc:{
textAlign:"center",
color:"gray",
marginTop:5,
marginBottom:30
},

otpRow:{
  flexDirection:"row",
  justifyContent:"center",  // center the boxes
  marginBottom:30
},

otpBox:{
  width:50,
  height:60,
  backgroundColor:"#eee",
  borderRadius:10,
  textAlign:"center",
  fontSize:22,
  fontWeight:"bold",
  borderWidth:1,
  borderColor:"#eee",
  marginHorizontal:5  // <-- adds space between boxes
},

focus:{
borderColor:"#ff6600",
borderWidth:2
},

btn:{
borderRadius:30,
overflow:"hidden",
marginBottom:20
},

gradientBtn:{
padding:16,
alignItems:"center"
},

btnText:{
color:"#fff",
fontSize:18,
fontWeight:"bold"
},

resend:{
textAlign:"center",
marginTop:10,
color:"gray"
},

link:{
color:"#ff6600",
fontWeight:"bold"


},

back:{
textAlign:"center",
marginTop:20,
color:"#ff6600",
fontWeight:"bold"
}

});