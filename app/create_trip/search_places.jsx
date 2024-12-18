import 'react-native-get-random-values';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRouter } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from './../../context/create_trip_context';
import { Video } from 'expo-av';

export default function SearchPlaces() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />


      {/* GooglePlacesAutocomplete */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Prevent shifting on iOS
        style={styles.searchBoxContainer}
      >
        <GooglePlacesAutocomplete
          placeholder="Search Destination"
          fetchDetails={true}
          onFail={(error) => console.log(error)}
          onPress={(data, details = null) => {
            setTripData({
              locationInfo: {
                name: data.description,
                coordinates: details?.geometry.location,
                photo_ref: details?.photos[0]?.photo_reference,
                url: details?.url,
              },
            });
            router.push('/create_trip/select_traveller');
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            language: 'en',
          }}
          styles={{
            textInputContainer: {
              backgroundColor: '#fff',
              borderRadius: 27,
              borderWidth: 2,
              borderColor: '#FFFFFF',
              paddingHorizontal: 15,
              paddingVertical: 2,
              marginTop: 10,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 10, // Adds a shadow for Android
              width: '80%',
              left: '10%',
            },
            textInput: {
              height: 50,
              fontSize: 17,
              color: '#000',
              backgroundColor: '#FFFFFF',
            },
            listView: {
              position: 'absolute',
              top: 60, // Adjust as needed for dropdown placement
              zIndex: 3, // Ensure dropdown is above the video
              backgroundColor: '#FFFFFF',
            },
          }}
        />

              {/* Video Section */}
      <View style={styles.videoSection}>
        <Video
          source={require('../../assets/animations/boy_searching_location.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />
      </View>


      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  videoSection: {
    position: 'absolute', // Keep video static
    top: 0,
    left: 0,
    right: 0,
    height: 400, // Adjust the height based on your requirements
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingTop:50,
    marginTop:100,

  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 15,    
  },
  searchBoxContainer: {
    marginTop: 100, // Start below the video
    flex: 1, // Allow it to occupy remaining space
  },
});
