import { useState } from "react";
import {
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen({ navigation }) {

const [agree,setAgree]=useState(false);

const [name,setName]=useState("");
const [phone,setPhone]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [confirm,setConfirm]=useState("");

const [errors,setErrors]=useState({});
const [focus,setFocus]=useState("");

const handleRegister=()=>{

let newErrors={};

if(name.trim()=="")
newErrors.name="Full Name is required";

if(phone.length!=10)
newErrors.phone="Enter valid phone number";

if(email.trim()=="")
newErrors.email="Email is required";

if(password.length<4)
newErrors.password="Minimum 4 characters required";

if(password!=confirm)
newErrors.confirm="Passwords do not match";

if(!agree)
newErrors.agree="Please accept Terms & Conditions";

setErrors(newErrors);

if(Object.keys(newErrors).length==0){

Keyboard.dismiss();
navigation.navigate("Otp");

}

};

return(

<KeyboardAwareScrollView
style={{flex:1, backgroundColor:"#f5f6fa"}}
enableOnAndroid={true}
extraScrollHeight={20}
keyboardShouldPersistTaps="handled"
showsVerticalScrollIndicator={false}
contentContainerStyle={{flexGrow:1}}
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
Create your account
</Text>

</LinearGradient>


<View style={styles.card}>

<Text style={styles.title}>
Register
</Text>

<Text style={styles.subtitle}>
Fill details to create account
</Text>


{/* FULL NAME */}

<Text style={styles.label}>
Full Name <Text style={styles.star}>*</Text>
</Text>

<TextInput
placeholder="Enter your full name"
style={[styles.input, focus==="name" && styles.focus]}
value={name}
onChangeText={(text)=>{
setName(text);
if(text.trim()!=""){
setErrors(prev=>({...prev,name:null}));
}
}}
onFocus={()=>setFocus("name")}
onBlur={()=>setFocus("")}
/>

{errors.name &&
<Text style={styles.error}>
{errors.name}
</Text>
}


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
style={[styles.phoneInput, focus==="phone" && styles.focus]}
value={phone}
onChangeText={(text)=>{
setPhone(text);
if(text.length==10){
setErrors(prev=>({...prev,phone:null}));
}
}}
onFocus={()=>setFocus("phone")}
onBlur={()=>setFocus("")}
/>

</View>

{errors.phone &&
<Text style={styles.error}>
{errors.phone}
</Text>
}


{/* EMAIL */}

<Text style={styles.label}>
Email <Text style={styles.star}>*</Text>
</Text>

<TextInput
placeholder="Enter email address"
style={[styles.input, focus==="email" && styles.focus]}
value={email}
onChangeText={(text)=>{
setEmail(text);
if(text.trim()!=""){
setErrors(prev=>({...prev,email:null}));
}
}}
onFocus={()=>setFocus("email")}
onBlur={()=>setFocus("")}
/>

{errors.email &&
<Text style={styles.error}>
{errors.email}
</Text>
}


{/* PASSWORD */}

<Text style={styles.label}>
Password <Text style={styles.star}>*</Text>
</Text>

<TextInput
placeholder="Create password"
secureTextEntry
style={[styles.input, focus==="pass" && styles.focus]}
value={password}
onChangeText={(text)=>{
setPassword(text);

if(text.length>=4){
setErrors(prev=>({...prev,password:null}));
}

if(confirm && text !== confirm){
setErrors(prev=>({...prev,confirm:"Passwords do not match"}));
}else if(confirm && text === confirm){
setErrors(prev=>({...prev,confirm:null}));
}
}}
onFocus={()=>setFocus("pass")}
onBlur={()=>setFocus("")}
/>


{/* CONFIRM PASSWORD */}

<Text style={styles.label}>
Confirm Password <Text style={styles.star}>*</Text>
</Text>

<TextInput
placeholder="Re-enter password"
secureTextEntry
style={[styles.input, focus==="confirm" && styles.focus]}
value={confirm}
onChangeText={(text)=>{
setConfirm(text);

if(text !== password){
setErrors(prev=>({...prev,confirm:"Passwords do not match"}));
}else{
setErrors(prev=>({...prev,confirm:null}));
}
}}
onFocus={()=>setFocus("confirm")}
onBlur={()=>setFocus("")}
/>

{errors.confirm &&
<Text style={styles.error}>
{errors.confirm}
</Text>
}


{/* TERMS */}

<View style={styles.termsRow}>

<Checkbox
value={agree}
onValueChange={(value)=>{
setAgree(value);
if(value){
setErrors(prev=>({...prev,agree:null}));
}
}}
/>

<Text style={styles.termsText}>
I agree to Smart Luggage <Text style={styles.link}>Terms & Conditions</Text>
</Text>

</View>

{errors.agree &&
<Text style={styles.error}>
{errors.agree}
</Text>
}


{/* BUTTON */}

<TouchableOpacity
style={styles.btn}
onPress={handleRegister}
>

<LinearGradient
colors={["#ff0033","#ff6600"]}
style={styles.gradientBtn}
>

<Text style={styles.btnText}>
Create Account
</Text>

</LinearGradient>

</TouchableOpacity>


<TouchableOpacity
onPress={()=>navigation.navigate("Login")}
>

<Text style={styles.bottomText}>
Already have an account? <Text style={styles.link}>Login</Text>
</Text>

</TouchableOpacity>

</View>

</View>

</KeyboardAwareScrollView>

);
}



const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f6fa"
},

header:{
height:220,
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
padding:20
},

title:{
fontSize:26,
fontWeight:"bold"
},

subtitle:{
color:"gray",
marginBottom:10,
marginTop:4
},

label:{
fontSize:14,
fontWeight:"600",
marginBottom:5,
marginTop:6
},

star:{
color:"red",
fontWeight:"normal"
},

input:{
backgroundColor:"#eee",
padding:13,
borderRadius:10,
borderWidth:1,
borderColor:"#eee"
},

focus:{
borderColor:"#ff6600",
borderWidth:2
},

phoneRow:{
flexDirection:"row",
alignItems:"center"
},

code:{
backgroundColor:"#eee",
padding:13,
borderRadius:10,
marginRight:10,
fontWeight:"600"
},

phoneInput:{
backgroundColor:"#eee",
flex:1,
padding:13,
borderRadius:10,
borderWidth:1,
borderColor:"#eee"
},

termsRow:{
flexDirection:"row",
alignItems:"center",
marginTop:12
},

termsText:{
marginLeft:8,
fontSize:14,
color:"#444",
flex:1
},

link:{
color:"#ff6600",
fontWeight:"bold"
},

error:{
color:"red",
fontSize:12,
marginTop:3
},

btn:{
marginTop:18,
borderRadius:30,
overflow:"hidden"
},

gradientBtn:{
padding:15,
alignItems:"center"
},

btnText:{
color:"#fff",
fontSize:18,
fontWeight:"bold"
},

bottomText:{
textAlign:"center",
marginTop:15,
color:"gray"
}

});