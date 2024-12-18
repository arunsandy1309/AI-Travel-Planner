import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Video } from 'expo-av';
import moment from 'moment';
import { CreateTripContext } from '../../context/create_trip_context';

export default function review_trip() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData } = useContext(CreateTripContext);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoPosition = useRef(new Animated.Value(0)).current; // Initial position for animation
  const videoRef = useRef(null); // Reference for the video component
  const screenWidth = Dimensions.get('window').width; // Screen width for calculation

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const startAnimation = () => {
    // Start the animation to move the video
    Animated.timing(videoPosition, {
      toValue: screenWidth - screenWidth * 0.6, // Stop at the right edge (account for video width)
      duration: 2000, // Duration for the animation
      useNativeDriver: true,
    }).start(() => {
      // Stop the video and reset its position
      if (videoRef.current) {
        videoRef.current.stopAsync(); // Stop the video playback
      }
      console.log("Moving to Trip Recommendation Page");
      router.push("/create_trip/generate_trip")
      videoPosition.setValue(0); // Reset the animation position
      setIsVideoPlaying(false); // Reset the state for video playback
      console.log("Stopped the Video");
      
    });
  };


  const handleVideoTap = () => {
    if (!isVideoPlaying) {
      setIsVideoPlaying(true);
      videoRef.current.playAsync(); // Start the video playback
      startAnimation();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.review_text}>Review Your Trip</Text>
      <Text style={styles.sub_text}>
        Before generating the trip, please review your selection.
      </Text>

      {/* Display trip information */}
      <View style={styles.information_container}>
        <Text style={styles.icon}>📍</Text>
        <View>
          <Text style={styles.information_label}>Destination</Text>
          <Text style={styles.information_text}>{tripData?.locationInfo?.name}</Text>
        </View>
      </View>
      <View style={styles.information_container}>
        <Text style={styles.icon}>🗓️</Text>
        <View>
          <Text style={styles.information_label}>Travel Date</Text>
          <Text style={styles.information_text}>
            {moment(tripData.selectedStartDate).format('MMM D')} -{' '}
            {moment(tripData.selectedEndDate).format('MMM D')} ({tripData?.totalNoDays} days)
          </Text>
        </View>
      </View>
      <View style={styles.information_container}>
        <Text style={styles.icon}>🚌</Text>
        <View>
          <Text style={styles.information_label}>Who's Travelling?</Text>
          <Text style={styles.information_text}>{tripData?.traveller?.title}</Text>
        </View>
      </View>
      <View style={styles.information_container}>
        <Text style={styles.icon}>💰</Text>
        <View>
          <Text style={styles.information_label}>Budget</Text>
          <Text style={styles.information_text}>{tripData?.budget}</Text>
        </View>
      </View>

      {/* Instruction text */}
      <Text style={styles.tapText}>After reviewing, swipe the below Icon to right</Text>

      {/* Video Section */}
      <TouchableWithoutFeedback onPress={handleVideoTap}>
        <Animated.View
          style={[
            styles.videoContainer,
            { transform: [{ translateX: videoPosition }] }, // Bind animation to video position
          ]}
        >
          <Video
            ref={videoRef}
            source={require('../../assets/animations/walking_with_bags.mp4')}
            rate={1.0}
            volume={0}
            isMuted={true}
            resizeMode="cover"
            isLooping={true} // Play only once
            style={styles.video}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: '22%',
  },
  review_text: {
    paddingLeft: 25,
    fontFamily: 'outfit-bold',
    fontSize: 33,
  },
  sub_text: {
    marginTop: 20,
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: '#666',
    paddingLeft: 25,
  },
  information_container: {
    paddingTop: 20,
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 50,
  },
  information_label: {
    paddingLeft: 10,
    fontFamily: 'outfit',
    fontSize: 18,
    color: '#666',
  },
  information_text: {
    paddingLeft: 10,
    fontFamily: 'outfit-medium',
    fontSize: 18,
  },
  icon: {
    fontSize: 40,
  },
  tapText: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 18,
    color: '#004d99',
  },
  videoContainer: {
    position: 'absolute',
    bottom: 0, // Ensure video stays at the bottom
    width: '55%',
    height: 280, // Adjust the height of the video
    alignSelf: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    transform: [{ scaleX: -1 }], // Mirror the video
  },
});
