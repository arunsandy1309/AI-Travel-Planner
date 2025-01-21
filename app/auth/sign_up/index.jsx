import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Dimensions,
} from "react-native";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./../../../configs/FirebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

export default function SignIn() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const OnCreateAccount = async () => {
    if (!firstName || !lastName || !email || !password) {
      ToastAndroid.show("Please Enter all the details", ToastAndroid.BOTTOM);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        profileImageUrl: null,
        createdAt: new Date().toISOString(),
      });

      router.replace("/mytrip");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-email") {
        ToastAndroid.show("Invalid Email ID.", ToastAndroid.BOTTOM);
      } else if (errorCode === "auth/weak-password") {
        ToastAndroid.show("Password is too weak.", ToastAndroid.BOTTOM);
      } else {
        ToastAndroid.show("Error creating account. Please try again.", ToastAndroid.BOTTOM);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>

      <View style={styles.nameContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter First Name"
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Last Name"
            value={lastName}
            onChangeText={(value) => setLastName(value)}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={OnCreateAccount}
        >
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.07,
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
  },
  title: {
    fontFamily: "outfit-bold",
    textAlign: "center",
    fontSize: width * 0.075,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.05,
    width: "95%",
    paddingLeft: width * 0.04,
  },
  inputWrapper: {
    width: "48%",
  },
  inputContainer: {
    paddingLeft: width * 0.04,
    marginTop: height * 0.02,
    width: "95%",
  },
  inputLabel: {
    fontFamily: "outfit",
    fontSize: width * 0.05,
    marginBottom: height * 0.005,
  },
  input: {
    paddingLeft: width * 0.04,
    height: height * 0.075,
    borderWidth: 1,
    borderRadius: width * 0.07,
    borderColor: "#ccc",
    fontFamily: "outfit",
    fontSize: width * 0.045,
    marginBottom: height * 0.02,
    backgroundColor: "#F9F9F9",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: height * 0.03,
  },
  createAccountButton: {
    padding: height * 0.015,
    width: "70%",
    borderRadius: width * 0.2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  createAccountButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: width * 0.045,
    fontFamily: "outfit",
  },
});
