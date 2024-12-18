import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { router, useNavigation, useRouter } from 'expo-router';
import CalendarPicker from 'react-native-calendar-picker';
import { CreateTripContext } from '../../context/create_trip_context';

export default function SelectDates() {
  const navigation = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const rounter = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null); // Reset end date if the start date changes
    }
  };

  const OnDateSelectionContinue=()=>{
    if (!selectedStartDate || !selectedEndDate) {
      ToastAndroid.show("Please select Start and End Dates", ToastAndroid.BOTTOM);
      return;
    }
  
    const totalNoDays = Math.ceil(
      (new Date(selectedEndDate).getTime() - new Date(selectedStartDate).getTime()) / (1000 * 60 * 60 * 24)
    );
  
    console.log(`Total number of days: ${totalNoDays}`);
    setTripData({
      ...tripData, 
      selectedStartDate: selectedStartDate,
      selectedEndDate: selectedEndDate,
      totalNoDays: totalNoDays
    })
    console.log("Moving to Other page");
    router.push("/create_trip/select_budget/")
  };


  return (
    <View style={styles.container}>
      <Text style={styles.travel_date_text}>Travel Dates</Text>

      {/* Calendar Component */}
      <View style={styles.calendarContainer}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          todayBackgroundColor="#00b2ff"
          selectedRangeStyle={styles.selectedRangeStyle}
          selectedDayColor="#004d99"
          selectedDayTextColor="#ffffff"
          textStyle={{
            color: '#000',
            fontFamily: 'outfit',
          }}
        />
      </View>

      {/* Display Selected Dates */}
        <View style={{
          width:"100%",
          alignItems: 'center'
        }}>
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateLabel}>Selected Dates:</Text>
            <Text style={styles.dateText}>
              {selectedStartDate
                ? `Start: ${selectedStartDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}`
                : 'Start Date: Not Selected'}
            </Text>
            <Text style={styles.dateText}>
              {selectedEndDate
                ? `End: ${selectedEndDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}`
                : 'End Date: Not Selected'}
            </Text>
          </View>
          </View>

                {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.singin_button}
          onPress={OnDateSelectionContinue}>
          <Text style={styles.singin_buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 12, // Padding for left and right
    backgroundColor: '#f5f5f5',
    
  },
  travel_date_text: {
    fontFamily: 'outfit-bold',
    fontSize: 35,
    color: '#000000',
    marginBottom: 20, // Space below the title
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  selectedRangeStyle: {
    backgroundColor: '#b3d9ff',
  },
  selectedDateContainer: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    width: "70%"
  },
  selectedDateLabel: {
    textAlign:'center',
    fontSize: 23,
    fontFamily: 'outfit-bold',
    color: '#004d99',
    marginBottom: 10,
  },
  dateText: {
    textAlign:'center',
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#333',
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',  // Ensures the container takes up the full width
    alignItems: 'center', // Centers the button horizontally
    marginTop: 30, // Gives some space before the button
  },
  singin_button: {
    padding: 15,
    width: '40%',
    backgroundColor: '#000000',
    borderRadius: 100,
    alignItems: 'center', // Center text horizontally within button
    justifyContent: 'center', // Center text vertically within button
  },
  singin_buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'outfit',
  },
});
