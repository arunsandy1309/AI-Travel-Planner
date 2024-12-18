import { TouchableOpacity, View, Text, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../../constants/Colors'
import {useRouter} from 'expo-router'
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './../../../configs/FirebaseConfig'
import { getFirestore, setDoc, doc } from "firebase/firestore";  

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  const onSignIn=()=>{
        // Checking if the user has entered the details or not
        if (!email || !password) {
          ToastAndroid.show("Please Enter all the details", ToastAndroid.BOTTOM);
          return; // Return early if any field is empty
        }
    
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User Successfully Signed In");
    router.replace("/mytrip")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage, errorCode);
    if(errorCode=="auth/invalid-email"){
      ToastAndroid.show("Invalid Email ID.", ToastAndroid.BOTTOM);
    }
    else if(errorCode=="auth/invalid-credential"){
      ToastAndroid.show("The provided credentials are Invalid.", ToastAndroid.BOTTOM);
    }
    else{
      ToastAndroid.show("Invalid Email or Password.", ToastAndroid.BOTTOM);
    }
  });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Sign You In</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>
      <Text style={styles.greeting}>You've been missed!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Email'
          value={email}
          onChangeText={(value) => setEmail(value)}
          keyboardType='email-address'
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder='Enter Password'
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      {/* SignIn Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.singin_button}
          onPress={() => {
            console.log("Sign In button clicked!");
            onSignIn();
          }}>
          <Text style={styles.singin_buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Create Account Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.create_account_button}
          onPress={() => {
            console.log("Create Account button clicked!");
            router.replace("/auth/sign_up");
          }}>
          <Text style={styles.create_account_buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: "100%"
  },
  title: {
    paddingLeft: 15, 
    fontFamily: 'outfit-bold',
    fontSize: 30,
  },
  subtitle: {
    paddingLeft: 15, 
    fontFamily: 'outfit',
    fontSize: 30,
    color: '#808080',
    marginTop: 25,
  },
  greeting: {
    paddingLeft: 15, 
    fontFamily: 'outfit',
    fontSize: 30,
    marginTop: 25,
    color: '#808080',
  },
  inputContainer: {
    paddingLeft: 15, 
    marginTop: 20,
    width: '95%',
  },
  inputLabel: {
    fontFamily: 'outfit',
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    paddingLeft: 15,
    height: 60,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#ccc', // Light gray border
    fontFamily: 'outfit',
    fontSize: 18,
    marginBottom: 15, // Reduced gap between fields
    backgroundColor: '#F9F9F9', // Subtle background color
  },
  buttonContainer: {
    width: '100%',  // Ensures the container takes up the full width
    alignItems: 'center', // Centers the button horizontally
    marginTop: 30, // Gives some space before the button
  },
  singin_button: {
    padding: 15,
    width: '70%',
    backgroundColor: '#000000',
    borderRadius: 100,
    alignItems: 'center', // Center text horizontally within button
    justifyContent: 'center', // Center text vertically within button
  },
  create_account_button: {
    padding: 15,
    width: '70%',
    borderColor:"#000000",
    borderWidth:2,
    borderRadius: 100,
    alignItems: 'center', // Center text horizontally within button
    justifyContent: 'center', // Center text vertically within button
  },
  singin_buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit',
  },
  create_account_buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit',
  },
});
