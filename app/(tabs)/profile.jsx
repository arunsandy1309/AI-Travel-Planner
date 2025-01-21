import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "./../../configs/FirebaseConfig";
import { Picker } from "@react-native-picker/picker";
import Login from "../../components/Login_animations";
import { roundToNearestHours } from "date-fns";
import { router, useRouter } from "expo-router";


const { width, height } = Dimensions.get("window");

export default function ProfileScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pronouns, setPronouns] = useState("He/Him");

  const user = auth.currentUser;

  const rounter = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfileImage(userData.profileImage || null);
          setPhoneNumber(userData.phoneNumber || "");
          setPronouns(userData.pronouns || "He/Him");
        }
        setName(user.displayName || "");
        setEmail(user.email || "");
      } catch (error) {
        console.error("Error fetching profile data:", error);
        ToastAndroid.show("Failed to fetch profile data.", ToastAndroid.BOTTOM);
      }
    };
    fetchProfileData();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);

      try {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        const response = await fetch(uri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          profileImageUrl: downloadURL,
          profileImage: downloadURL,
        });

        ToastAndroid.show("Profile image updated successfully!", ToastAndroid.BOTTOM);
      } catch (error) {
        console.error("Error uploading image:", error);
        ToastAndroid.show("Failed to upload profile image.", ToastAndroid.BOTTOM);
      }
    }
  };

  const saveProfileData = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        phoneNumber,
        pronouns,
      });
      ToastAndroid.show("Profile updated successfully!", ToastAndroid.BOTTOM);
    } catch (error) {
      console.error("Error saving profile data:", error);
      ToastAndroid.show("Failed to update profile.", ToastAndroid.BOTTOM);
    }
  };

  // Updated handleLogout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      ToastAndroid.show("Logged out successfully!", ToastAndroid.BOTTOM);
      router.replace(Login)
    } catch (error) {
      console.error("Logout failed:", error);
      ToastAndroid.show("Logout failed!", ToastAndroid.BOTTOM);
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <Text style={styles.accountInfoTitle}>Account Info</Text>

      <View style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.defaultIcon}>
            <Text style={styles.defaultIconText}>+</Text>
          </View>
        )}
        <TouchableOpacity style={styles.addButton} onPress={pickImage}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} editable={true} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} editable={false} />

        <Text style={styles.label}>Pronouns</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pronouns}
            onValueChange={(itemValue) => setPronouns(itemValue)}
            style={[styles.picker, { height: height * 0.06 }]} // Explicitly set height
            itemStyle={{
              fontSize: Math.round(width * 0.025),
              fontFamily: "outfit",
              color: "#000",
            }} // Avoid fractional sizes
          >
            <Picker.Item label="He/Him" value="He/Him" />
            <Picker.Item label="She/Her" value="She/Her" />
          </Picker>
        </View>

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveProfileData}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  accountInfoTitle: {
    marginTop: height * 0.07,
    fontFamily: "outfit-bold",
    fontSize: width * 0.08,
  },
  imageContainer: {
    marginTop: height * 0.03,
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    borderWidth: 2,
    borderColor: "#000",
  },
  defaultIcon: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  defaultIconText: {
    fontSize: width * 0.15,
    color: "#000",
  },
  addButton: {
    position: "absolute",
    bottom: -10,
    right: -10,
    backgroundColor: "#000",
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  addButtonText: {
    fontSize: width * 0.06,
    color: "#fff",
  },
  infoContainer: {
    width: "85%",
    marginTop: height * 0.02,
  },
  label: {
    fontFamily: "outfit",
    fontSize: width * 0.05,
    marginVertical: height * 0.01,
    color: "#666",
  },
  input: {
    width: "100%",
    height: height * 0.05,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: "outfit",
    fontSize: width * 0.043,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: height * 0.06, // Explicitly set the height
  },
  pickerItem: {
    fontSize: Math.round(width * 0.025), // Use rounded font size
    fontFamily: "outfit",
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.03,
    width: "85%",
  },
  saveButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontFamily: "outfit-bold",
    fontSize: width * 0.04,
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontFamily: "outfit-bold",
    fontSize: width * 0.04,
  },
});
