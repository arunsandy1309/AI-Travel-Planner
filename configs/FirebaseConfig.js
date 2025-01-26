// Import the functions you need from the SDKs you need
import { initializeApp, getApps  } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5VG_y_hNh3rgkkHzcvlNa_LcRf_KZ1iA",
  authDomain: "ai-travel-planner-f9ba2.firebaseapp.com",
  projectId: "ai-travel-planner-f9ba2",
  storageBucket: "ai-travel-planner-f9ba2.firebasestorage.app",
  messagingSenderId: "198055929445",
  appId: "1:198055929445:web:14c53acc1a941c3bebc88c",
  measurementId: "G-1KTXPGPXQP"
};

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication with persistence
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// // Initializing Firestore Database
// export const db = getFirestore(app);

// // Initializing the Storage
// export const storage = getStorage(app);

// Initialize Firebase App (only if no app is already initialized)
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Authentication with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);