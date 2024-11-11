import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';

export default function Login() {
    const imagePosition = useRef(new Animated.Value(-200)).current; // Starts above the screen
    const containerPosition = useRef(new Animated.Value(600)).current; // Starts below the screen
  
    useEffect(() => {
      // Image fall animation
      Animated.spring(imagePosition, {
        toValue: 10, // Final position for the image
        friction: 5,
        tension: 150,
        useNativeDriver: true,
      }).start();
  
      // Container raise animation
      Animated.timing(containerPosition, {
        toValue: 0, // Final position for the container
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, []);
  
    return (
      <View style={styles.mainContainer}>
        <Animated.View style={{ transform: [{ translateY: imagePosition }] }}>
          <Image
            source={require('./../assets/images/Login_image_1.jpeg')}
            style={{
                marginTop: -15,
              width: '100%',
              height: 500,
            }}
          />
        </Animated.View>
  
        <Animated.View style={[styles.container, { transform: [{ translateY: containerPosition }] }]}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'outfit-bold',
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            AI Travel Planner
          </Text>
  
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              fontFamily: 'outfit',
              color: '#7d7d7d', // Gray color
              marginTop: 15,
            }}
          >
            Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI-driven insights.
          </Text>
  
          <View style={styles.button}>
            <Text
              style={{
                color: '#FFFFFF',
                textAlign: 'center',
                fontSize: 18,
                fontFamily: 'outfit',
              }}
            >
              Sign In With Google
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    container: {
      backgroundColor: '#FFFFFF',
      marginTop: -20,
      height: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 10,
      alignItems: 'center', // Center contents horizontally
    },
    button: {
      padding: 15,
      width: '70%',
      backgroundColor: '#000000',
      borderRadius: 100,
      marginTop: '23%',
      alignItems: 'center', // Center text horizontally within button
      justifyContent: 'center', // Center text vertically within button
    },
  });