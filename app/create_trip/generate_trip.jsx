import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CreateTripContext } from '../../context/create_trip_context';
import { AI_PROMPT } from '../../constants/Options';
import { Video } from 'expo-av';
import moment from 'moment';
import { chatSession } from '../../configs/AI_Model';
import { useRouter } from 'expo-router';
import {auth, db} from './../../configs/FirebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';


export default function GenerateTrip() {

    const { tripData, setTripData } = useContext(CreateTripContext);
    const [loading, setLoading] = useState(false);
    const user = auth.currentUser
    const router = useRouter();
    let generated_trip_response;
    
    useEffect(()=>{
        GenerateAITrip()  // Making sure that the trip data is available and then only generating the context
    }, [])
    const GenerateAITrip= async()=>{
        setLoading(true)
            const Final_Prompt = AI_PROMPT
            .replace('{location}', tripData?.locationInfo?.name)
            .replace('{totalDays}', tripData?.totalNoDays)
            .replace('{totalNights}', tripData?.totalNoDays-1)
            .replace('{traveller}', tripData?.traveller?.title)
            .replace('{budget}', tripData?.budget)
            .replace('{totalDays}', tripData?.totalNoDays)
            .replace('{totalNights}', tripData?.totalNoDays-1)
            .replace('{startDate}', moment(tripData.selectedStartDate).format('MMM D'))
            .replace('{endDate}', moment(tripData.selectedEndDate).format('MMM D'))

            console.log("Final Prompt : ",Final_Prompt)
          
            try {
              // Log before sending the message
                console.log("Sending prompt to Gemini...");
    
               const result = await chatSession.sendMessage(Final_Prompt);
                // console.log("Received response: ", result.response.text());

                //Converting the Response to JSON
                const responseText = result.response.text();
                generated_trip_response = JSON.parse(responseText);
                console.log("Generated Response: ", generated_trip_response);

                // Check if the response is valid and contains expected data
                if (result.response && result.response.text()) {
                    console.log("Gemini has processed the request successfully!");
                } else {
                    console.log("Gemini response seems empty. No data received.");
                }
            } catch (error) {
                console.error("Error sending prompt to Gemini:", error);
            }
    
            setLoading(false);

            // Storing the Generated Trip Details in the Firestore DB
            if (generated_trip_response) { // Only proceed if the response was parsed successfully
                const docId = (Date.now()).toString(); // Ensure you call toString() here
                try {
                    const add_to_firestore = await addDoc(collection(db, "UserTrips"), {
                        userEmail: user.email,
                        generated_trip_plan: generated_trip_response, // This is the generated response by AI
                        tripData: JSON.stringify(tripData), // This is the User Selection Data,
                        timestamp: Timestamp.now()
                    });

                    console.log("Firestore response:", add_to_firestore);

                    // Check if the document was successfully added
                    if (add_to_firestore.id) {
                        console.log("Data successfully saved in Firestore with ID:", add_to_firestore.id);
                        // Navigate to Trip_Detail Page only when the data is saved
                        router.push("(tabs)/mytrip");
                    } else {
                        console.error("Failed to save data to Firestore.");
                    }
                } catch (error) {
                    console.error("Error saving data to Firestore:", error);
                }
            } else {
                console.error("No valid generated trip response to save to Firestore.");
            }

}


    return (
        <View style={styles.container}>
          <View style={styles.text_container}>
            <Text style={styles.wait_text}>Please Wait...</Text>
            <Text style={styles.sub_text}>We are working on generating your trip</Text>
          </View>
    
          {/* Video Section */}
          <View style={styles.videoSection}>
            <Video
              source={require('../../assets/animations/waiting_for_flight.mp4')}
              rate={1.0}
              volume={0.0}
              isMuted={true}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={styles.video}
            />
          </View>
          <Text style={styles.go_back_text}>Do not refresh, close or go back from here.</Text>
        </View>
      );
}


export const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  text_container: {
    width: '100%',
  },
  wait_text: {
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 35,
  },
  sub_text: {
    marginTop: 25,
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  videoSection: {
    width: '100%',
    marginTop: 25,
    height: 320, // Adjust the height of the video
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  go_back_text:{
    marginTop: 25,
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    color:"#999",
    fontSize: 18,
  }
});