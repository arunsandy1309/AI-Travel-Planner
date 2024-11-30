import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import {Colors} from './../../../constants/Colors'
import { TextInput } from 'react-native';
export default function SignIn() {

  const navigation = useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerShown: false
    })
  })

  return (
    <View style={{
      paddingTop: 50,
      paddingLeft: 20,
      backgroundColor: '#FFFFFF',
      height: '100%'
    }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30
        }}>Let's Sign You In</Text>

    <Text style={{
          fontFamily: 'outfit',
          fontSize: 30,
          color: '#808080',
          marginTop: 25
        }}>Welcome Back</Text>

    <Text style={{
          fontFamily: 'outfit',
          fontSize: 30,
          marginTop: 25,
          color: '#808080'
        }}>You've been missed !</Text>

       {/* Adding the Text Fields to enter the Email and Password for Login */}
       <View>
          <Text>Email</Text>
          <TextInput placeholder='Enter Email'></TextInput>
       </View>
    </View>
  )
}
