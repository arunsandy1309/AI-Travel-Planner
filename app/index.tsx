import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Login_animations from './../components/Login_animations';
import { auth } from './../configs/FirebaseConfig';
import { Redirect } from "expo-router";

export default function Index() {
 const [user, setUser] = useState(null);
  console.log("This is the Layout Page:",user)
  useEffect(() => {
    // Set up an authentication state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Update state based on authentication status
    });

    // Cleanup the listener on component unmount
   return () => unsubscribe();
  }, []);
  
 // While the user state is being determined, show the login animations
  if (user === null) {
     return <Login_animations/>;
    return <></>
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? (
        <Redirect href={'/mytrip'} /> // If the user is logged in, navigate to mytrip
      ) : (
        <Login_animations/> // If the user is not logged in, show the login animation page
      )}
    </View>
  );
}
