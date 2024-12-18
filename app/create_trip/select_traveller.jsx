import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SelectTravelsList } from '../../constants/Options'; // Ensure this is properly imported
import OptionCard from '../../components/CreateTrip/option_card'; // Ensure this is properly imported
import { CreateTripContext } from '../../context/create_trip_context';

export default function SelectTraveller() {
  const navigation = useNavigation();

  const[selectedTraveler, setSelectedTraveler] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  useEffect(()=>{
    setTripData({...tripData,
        traveller: selectedTraveler
    })
  },[selectedTraveler]);

  useEffect(()=>{
    console.log(tripData);
  },[tripData]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.container_items}>
        <Text style={styles.header_text}>Who's Travelling</Text>
        <Text style={styles.subheading_text}>Choose Your Travels</Text>
        </View>
        <FlatList
          data={SelectTravelsList} // Correctly provide the array
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={()=>setSelectedTraveler(item)}
            style={styles.option_card}>
              <OptionCard option={item} selectedTraveler={selectedTraveler} setSelectedTraveler={setSelectedTraveler}/> {/* Pass data to OptionCard */}
            </TouchableOpacity>
          )}
        />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  container_items: {
    paddingLeft: 25,
  },
  header_text: {
    paddingTop: '25%',
    fontFamily: 'outfit-bold',
    fontSize: 30,
  },
  subheading_text: {
    marginTop: 20,
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  option_card:{
    marginVertical:15,
  }
});
