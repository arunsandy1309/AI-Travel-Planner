import {View, Text, Image, StyleSheet, ScrollViewComponent, ScrollView, Animated, TouchableOpacity} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import moment from 'moment/moment';
import FlightInfo from '../../components/MyTrips/TripDetails/flight_info';
import HotelList from '../../components/MyTrips/TripDetails/hotel_list';
import TripPlan from '../../components/MyTrips/TripDetails/trip_plan';

export default function TripDetails(){

    const navigation = useNavigation();
    const {trip} = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState(null);
    const buttonScaleAnim = useRef(new Animated.Value(1)).current;

    const formatData=(data)=>{
        try {
          return JSON.parse(data); // Parse the trip data if it's a string
        } catch (error) {
          console.error("Error parsing trip data:", error);
          return null;
        }
      };


    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTitle: '',
            headerTransparent:true
        })
        setTripDetails(JSON.parse(trip))

    if (trip) {
        setTripDetails(formatData(trip)); // Parse and set trip details
      } else {
        console.error("No trip data provided.");
      }
    }, []);

      const handleButtonPressIn = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };



    return  tripDetails && (
        <ScrollView>
        <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&maxwidth=400&photo_reference=${formatData(tripDetails?.tripData).locationInfo.photo_ref}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
            }}
            style={styles.trip_images}
          />

            <View style={styles.tirp_text_container}>
              <Text style={styles.trip_text}>{tripDetails?.generated_trip_plan.destination}</Text>
              {/* Date View */}
                <View style={styles.trip_date_container}>
                    <Text style={styles.trip_date}>{moment(formatData(tripDetails.tripData).selectedStartDate).format('DD MMM yyyy')}</Text>
                      <Text style={styles.trip_date}>{moment(formatData(tripDetails.tripData).selectedEndDate).format('DD MMM yyyy')}</Text>
                </View>
              
              <Text style={styles.traveller_info}>{formatData(tripDetails.tripData)?.traveller?.icon} {formatData(tripDetails.tripData)?.traveller?.title}</Text>
           
              {/* Flight Records */}
              <FlightInfo flight_data={tripDetails?.generated_trip_plan?.flights}/>

              <View style={styles.buttonContainer}>
               <Animated.View
                    style={{
                      transform: [{ scale: buttonScaleAnim }],
                    }}
                  >
                    <TouchableOpacity
                      style={styles.bookFlightButton}
                      activeOpacity={0.8}
                      onPressIn={handleButtonPressIn}
                      onPressOut={handleButtonPressOut}
                    >
                      <Text style={styles.bookFlightButtonText}>Book Flight</Text>
                    </TouchableOpacity>
                  </Animated.View>
              </View>

              {/* Hotel Records */}
                      
                      <HotelList hotelList={tripDetails?.generated_trip_plan?.hotels}/>


              {/* Trip Plan */}
                      <TripPlan tripList={tripDetails?.generated_trip_plan?.itinerary}/>
           
            </View>


        </ScrollView>
    )
}

export const styles = StyleSheet.create({

    trip_images:{
        width: '100%',
        height: 350,

    },
    tirp_text_container:{
          padding: 15,
          backgroundColor:"#FFF",
          height: "100%",
          marginTop: -30,
          borderTopLeftRadius:30,
          borderTopRightRadius:30,
    },
    trip_text:{
      fontSize: 23,
      fontFamily: 'outfit-bold'
    },
    trip_date_container: {
      width: '50%', // Use full width of the container
      flexDirection: 'row', // Arrange items in a row
      alignItems: "center", // Align items vertically in the center
      marginTop: 10,
      paddingRight: 1, // Add some padding for better spacing
      gap: 10,
    },
    trip_date:{
      fontSize: 18,
      fontFamily: 'outfit',
      color: "#999"
    },
    traveller_info: {
      fontFamily: "outfit",
      fontSize: 18,
      color: "#000",
    },
    /* Button Styling */
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 3,
  },

  bookFlightButton: {
    padding: 15,
    width: '70%',
    backgroundColor: '#E63946',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },

  bookFlightButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit-bold',
  },
});

