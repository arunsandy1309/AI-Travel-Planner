import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function Login() {
  return (
    <View>
        <Image source={require('./../assets/images/Login_image_1.jpeg')}
        style={{
            marginTop: 10,
          width: '100%',
          height: 500  
        }}/>

        <View style={styles.container}>
            <Text style={{
                fontSize: 25,
                fontFamily: 'outfit-bold',
                textAlign: 'center',
                marginTop: 10
            }}>
                AI Travel Planner
            </Text>

            <Text style={{
                fontSize: 18,
                textAlign: 'center',
                fontFamily: 'outfit',
                color: '#7d7d7d', // Gray color
                marginTop: 15
            }}>
            Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI-driven insights.   
            </Text>

            <View style={styles.button}>
            <Text style={{
                color: '#FFFFFF',
                textAlign: 'center',
                fontSize: 18,
                fontFamily: 'outfit'
            }}>Sign In With Google</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        marginTop: -20,
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        alignItems: 'center'
    },

    button: {
        padding: 15,
        width: '70%',
        backgroundColor: "#000000",
        borderRadius: 100,
        marginTop: '23%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})