import { TouchableOpacity, View, Text, StyleSheet, TextInput, ToastAndroid, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from './../../../configs/FirebaseConfig';
import { doc, getDoc } from "firebase/firestore";

const { width, height } = Dimensions.get('window'); // Get screen width and height

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please Enter all the details", ToastAndroid.BOTTOM);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User Successfully Signed In:", user.uid);

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Fetched User Data:", userData);
        ToastAndroid.show(`Welcome back, ${userData.firstName}!`, ToastAndroid.BOTTOM);
        router.replace("/mytrip");
      } else {
        console.error("No user data found in Firestore.");
        ToastAndroid.show("User data not found. Please contact support.", ToastAndroid.BOTTOM);
      }
    } catch (error) {
    //  console.error("Error during sign in:", error);
      const errorCode = error.code;

      if (errorCode === "auth/invalid-email") {
        ToastAndroid.show("Invalid Email ID.", ToastAndroid.BOTTOM);
      } else if (errorCode === "auth/user-not-found") {
        ToastAndroid.show("No account found with this email.", ToastAndroid.BOTTOM);
      } else if (errorCode === "auth/wrong-password") {
        ToastAndroid.show("Incorrect password. Please try again.", ToastAndroid.BOTTOM);
      } else if (errorCode === "auth/invalid-credential"){
        ToastAndroid.show("Invalid Credentials", ToastAndroid.BOTTOM);
      } else {
        ToastAndroid.show("Failed to sign in. Please try again.", ToastAndroid.BOTTOM);
      }
    }
  };

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
        <TouchableOpacity style={styles.singin_button} onPress={onSignIn}>
          <Text style={styles.singin_buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Create Account Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.create_account_button}
          onPress={() => router.replace("/auth/sign_up")}
        >
          <Text style={styles.create_account_buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.08, 
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
  title: {
    paddingLeft: width * 0.05, 
    fontFamily: 'outfit-bold',
    fontSize: width * 0.08, 
  },
  subtitle: {
    paddingLeft: width * 0.05, 
    fontFamily: 'outfit',
    fontSize: width * 0.07, 
    color: '#808080',
    marginTop: height * 0.02, 
  },
  greeting: {
    paddingLeft: width * 0.05, 
    fontFamily: 'outfit',
    fontSize: width * 0.07, 
    marginTop: height * 0.02, 
    color: '#808080',
  },
  inputContainer: {
    paddingLeft: width * 0.05, 
    marginTop: height * 0.02, 
    width: '95%',
  },
  inputLabel: {
    fontFamily: 'outfit',
    fontSize: width * 0.05, 
    marginBottom: height * 0.005, 
  },
  input: {
    paddingLeft: width * 0.05,
    height: height * 0.07,
    borderWidth: 1,
    borderRadius: width * 0.05, 
    borderColor: '#ccc',
    fontFamily: 'outfit',
    fontSize: width * 0.045, 
    marginBottom: height * 0.015, 
    backgroundColor: '#F9F9F9',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  singin_button: {
    paddingVertical: height * 0.02, 
    paddingHorizontal: width * 0.2, 
    backgroundColor: '#000000',
    borderRadius: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  create_account_button: {
    paddingVertical: height * 0.02, 
    paddingHorizontal: width * 0.1, 
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: width * 0.1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  singin_buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: width * 0.045, 
    fontFamily: 'outfit',
  },
  create_account_buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: width * 0.045, 
    fontFamily: 'outfit',
  },
});
