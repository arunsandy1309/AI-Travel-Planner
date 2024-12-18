import { TouchableOpacity, View, Text, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from './../../../constants/Colors';
import { useRouter } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from './../../../configs/FirebaseConfig'
import { getFirestore, setDoc, doc } from "firebase/firestore";  


export default function SignIn() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const db = getFirestore(); // Get Firestore instance


  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const OnCreateAccount = () => {
    // Checking if the user has entered the details or not
    if (!firstName || !lastName || !email || !password) {
      ToastAndroid.show("Please Enter all the details", ToastAndroid.BOTTOM);
      return; // Return early if any field is empty
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update the user's profile with first and last name
        updateProfile(user, {
          displayName: `${firstName} ${lastName}`
        })
        .then(() => {
          // Successfully updated the profile
          console.log("User profile updated:", user.displayName);
          router.replace("/mytrip")
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          ToastAndroid.show("Invalid Email or Password.", ToastAndroid.BOTTOM)
        });
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
          if(errorCode=="auth/invalid-email"){
          ToastAndroid.show("Invalid Email ID.", ToastAndroid.BOTTOM);
        }
        else if(errorCode=="auth/weak-password"){
          ToastAndroid.show("Password is too weak.", ToastAndroid.BOTTOM);
        }
        else{
          ToastAndroid.show("Invalid Email or Password.", ToastAndroid.BOTTOM);
        }
      });
  };

 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>

      {/* Name Inputs (First Name and Last Name side by side) */}
      <View style={styles.nameContainer}>
        {/* First Name */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter First Name'
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
          />
        </View>

        {/* Last Name */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter Last Name'
            value={lastName}
            onChangeText={(value) => setLastName(value)}
          />
        </View>
      </View>

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

      {/* Create Account Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.create_account_button}
          onPress={() => {
            console.log('Create Account button clicked!');
            OnCreateAccount();
            // router.replace('auth/sign_up');
          }}
        >
          <Text style={styles.create_account_buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
  title: {
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    fontSize: 30,
  },
  nameContainer: {
    flexDirection: 'row', // Arrange first and last name side by side
    justifyContent: 'space-between',
    marginTop: 50,
    width: '95%',
    paddingLeft:15

  },
  inputWrapper: {
    width: '48%', // Adjust width to make the inputs fit side by side
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
    borderColor: '#ccc',
    fontFamily: 'outfit',
    fontSize: 18,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  create_account_button: {
    padding: 15,
    width: '70%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#000000'
  },
  create_account_buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit',
  },
});
