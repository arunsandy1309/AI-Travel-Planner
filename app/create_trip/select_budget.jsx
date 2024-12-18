import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { SelectBudgetList } from '../../constants/Options'; // Ensure this is properly imported
import BudgetCard from '../../components/CreateTrip/budget_card'; // Ensure this is properly imported
import { StatusBar } from 'expo-status-bar';
import { Video } from 'expo-av';
import { CreateTripContext } from '../../context/create_trip_context';
import { useRoute } from '@react-navigation/native';

export default function SelectBudget() {
  const navigation = useNavigation();
  const [selectedBudget, setSelectedBudget] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
    const rounter = useRoute();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  useEffect(()=>{
    selectedBudget&&setTripData({
        ...tripData,
        budget: selectedBudget?.title
    })
  }, [selectedBudget])

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.container_items}>
        <Text style={styles.header_text}>Select Your Budget</Text>
        <Text style={styles.subheading_text}>Choose the budget for your trip</Text>
      </View>
      <FlatList
        data={SelectBudgetList} // Correctly provide the array
        keyExtractor={(item) => item.id.toString()} // Add keyExtractor for performance
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {     
                setSelectedBudget(item);
            }}
            style={styles.option_card}
          >
            <BudgetCard
              option={item}
              selectedBudget={selectedBudget}
              setSelectedBudget={setSelectedBudget}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent} // Add padding for better styling
      />

      {/* Video Section */}
      <View style={styles.videoSection}>
        <Video
          source={require('../../assets/animations/wallet_payment.mp4')}
          rate={1.0}
          volume={0.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container_items: {
    paddingLeft: 25,
    paddingBottom: 20,
  },
  header_text: {
    paddingTop: '25%',
    fontFamily: 'outfit-bold',
    fontSize: 30,
  },
  subheading_text: {
    marginTop: 10,
    fontFamily: 'outfit',
    fontSize: 20,
    color: '#666',
  },
  option_card: {
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, // Android shadow
  },
  flatListContent: {
    paddingHorizontal: 50,
    paddingBottom: 20,
  },
  videoSection: {
    position: 'absolute',
    bottom: -10, // Ensure video stays at the bottom
    width: '100%',
    height: 320, // Adjust the height of the video
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
});
