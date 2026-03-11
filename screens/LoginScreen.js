import { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen({navigation}){

const [mode,setMode]=useState("otp");
const [remember,setRemember]=useState(false);
const [focus,setFocus]=useState("");
const scrollRef=useRef();

useEffect(()=>{

const hideListener=Keyboard.addListener("keyboardDidHide",()=>{
scrollRef.current?.scrollTo({y:0,animated:true});
});

return ()=>{
hideListener.remove();
};

},[]);

return(

<KeyboardAvoidingView
style={{flex:1}}
behavior={Platform.OS==="ios"?"padding":undefined}
>

<ScrollView
ref={scrollRef}
style={{flex:1, backgroundColor:"#f5f6fa"}}
keyboardShouldPersistTaps="handled"
contentContainerStyle={{paddingBottom:40}}
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

<Text style={styles.appSub}>
Secure luggage pickup service
</Text>

</LinearGradient>


<View style={styles.card}>

<Text style={styles.title}>
Login
</Text>

<Text style={styles.subtitle}>
Access your account securely
</Text>

{/* RADIO BUTTON */}
<View style={styles.radioRow}>

<TouchableOpacity
style={styles.radioBtn}
onPress={()=>setMode("otp")}
>

<View style={styles.radioOuter}>
{mode=="otp" && <View style={styles.radioInner}/>}
</View>

<Text style={styles.radioText}>
OTP
</Text>

</TouchableOpacity>

<TouchableOpacity
style={styles.radioBtn}
onPress={()=>setMode("password")}
>

<View style={styles.radioOuter}>
{mode=="password" && <View style={styles.radioInner}/>}
</View>

<Text style={styles.radioText}>
Password
</Text>

</TouchableOpacity>

</View>

{/* PHONE */}
<Text style={styles.label}>
Phone Number <Text style={styles.star}>*</Text>
</Text>

<View style={styles.phoneRow}>

<Text style={styles.code}>
+91
</Text>

<TextInput
placeholder="Enter phone number"
keyboardType="numeric"
style={[styles.input, focus==="phone" && styles.focus]}
onFocus={()=>{
  setFocus("phone");
  scrollRef.current.scrollTo({y:100, animated:true});
}}
onBlur={()=>setFocus("")}
/>

</View>

{/* PASSWORD */}
{
mode=="password" &&

<>

<Text style={styles.label}>
Password <Text style={styles.star}>*</Text>
</Text>

<TextInput
placeholder="Enter password"
secureTextEntry
style={[styles.input, {marginBottom:10}, focus==="pass" && styles.focus]}
onFocus={()=>{
  setFocus("pass");
  scrollRef.current.scrollTo({y:160, animated:true});
}}
onBlur={()=>setFocus("")}
/>

<View style={styles.rememberRow}>

<Checkbox
value={remember}
onValueChange={setRemember}
/>

<Text style={styles.rememberText}>
Remember Me
</Text>

</View>

</>
}

{/* BUTTON */}
<TouchableOpacity
style={styles.btn}
onPress={()=>{
if(mode=="otp"){
navigation.navigate("Otp");
}else{
alert("Login Successful");
}
}}
>

<LinearGradient
colors={["#ff0033","#ff6600"]}
style={styles.gradientBtn}
>

<Text style={styles.btnText}>

{
mode=="otp"?
"Send OTP":
"Login"
}

</Text>

</LinearGradient>

</TouchableOpacity>


<TouchableOpacity
onPress={()=>navigation.navigate("Register")}
>

<Text style={styles.bottomText}>

Don't have an account? <Text style={styles.register}>Register</Text>

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

appSub:{
color:"#fff",
fontSize:14,
marginTop:5
},

card:{
padding:25
},

title:{
fontSize:26,
fontWeight:"bold"
},

subtitle:{
color:"gray",
marginBottom:20,
marginTop:5
},

radioRow:{
flexDirection:"row",
marginBottom:20
},

radioBtn:{
flexDirection:"row",
alignItems:"center",
marginRight:20
},

radioOuter:{
height:20,
width:20,
borderRadius:10,
borderWidth:2,
borderColor:"#ff6600",
alignItems:"center",
justifyContent:"center",
marginRight:8
},

radioInner:{
height:10,
width:10,
borderRadius:5,
backgroundColor:"#ff6600"
},

radioText:{
fontSize:15
},

label:{
fontSize:14,
fontWeight:"600",
marginBottom:5
},

star:{
color:"red",
fontWeight:"normal"
},

phoneRow:{
flexDirection:"row",
alignItems:"center",
marginBottom:15
},

code:{
backgroundColor:"#eee",
padding:13,
borderRadius:10,
marginRight:10,
fontWeight:"600"
},

input:{
backgroundColor:"#eee",
flex:1,
padding:13,
borderRadius:10,
borderWidth:1,
borderColor:"#eee"
},

focus:{
borderColor:"#ff6600",
borderWidth:2
},

fullInput:{
backgroundColor:"#eee",
padding:13,
borderRadius:10,
marginBottom:10,
borderWidth:1,
borderColor:"#eee"
},

rememberRow:{
flexDirection:"row",
alignItems:"center",
marginBottom:20
},

rememberText:{
marginLeft:8,
fontSize:14
},

btn:{
borderRadius:30,
overflow:"hidden"
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

bottomText:{
textAlign:"center",
marginTop:20,
color:"gray"
},

register:{
color:"#ff6600",
fontWeight:"bold"
}

});