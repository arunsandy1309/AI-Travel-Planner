import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SeasonalRecommendations from "./../../discover_trips/seasonal_recommendations"; // Import SeasonalRecommendations
import NewRecommendations from "../../components/new_recommendations";

const { width, height } = Dimensions.get("window");

export default function DiscoverScreen() {
  const navigation = useNavigation();
  const [showSeasonal, setShowSeasonal] = useState(true); // State to toggle between seasonal and generated recommendations

  const handleSeasonalRecommendations = () => {
    setShowSeasonal(true); // Show seasonal recommendations
  };

  const handleGenerateRecommendations = () => {
    setShowSeasonal(false); // Replace this logic with actual generation
    console.log("Generate Recommendations button clicked!");
  };

  return (
    <View style={styles.container}>
      {/* Buttons at the top */}
      <View style={styles.buttonWrapper}>
        {/* Seasonal Recommendations Button */}
        <TouchableOpacity
          style={[
            styles.button,
            showSeasonal ? styles.activeSeasonalButton : styles.inactiveButton,
          ]}
          onPress={handleSeasonalRecommendations}
        >
          <Text
            style={[
              styles.buttonText,
              showSeasonal ? styles.activeButtonText : styles.inactiveButtonText,
            ]}
          >
            Seasonal
          </Text>
          <Text
            style={[
              styles.buttonText,
              showSeasonal ? styles.activeButtonText : styles.inactiveButtonText,
            ]}
          >
            Recommendations
          </Text>
        </TouchableOpacity>

        {/* Generate Recommendations Button */}
        <TouchableOpacity
          style={[
            styles.button,
            !showSeasonal ? styles.activeGenerateButton : styles.inactiveButton,
          ]}
          onPress={handleGenerateRecommendations}
        >
          <Text
            style={[
              styles.buttonText,
              !showSeasonal ? styles.activeButtonText : styles.inactiveButtonText,
            ]}
          >
            Generate
          </Text>
          <Text
            style={[
              styles.buttonText,
              !showSeasonal ? styles.activeButtonText : styles.inactiveButtonText,
            ]}
          >
            Recommendations
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content: Show Seasonal or Generated Recommendations */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {showSeasonal ? (
          <SeasonalRecommendations />
        ) : (
          <View style={styles.generatedContent}>
            <NewRecommendations/>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.08,
    marginBottom: height * 0.01
  },
  button: {
    flex: 1,
    borderRadius: 30,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.02,
    marginHorizontal: width * 0.01,
    alignItems: "center", // Ensure horizontal centering of text
    justifyContent: "center", // Ensure vertical centering of text,
    textAlign: "center",
    elevation: 5, // Adds shadow for Android
  },
  activeSeasonalButton: {
    backgroundColor: "#FF9F68", // Bright orange for active seasonal button
  },
  activeGenerateButton: {
    backgroundColor: "#56CCF2", // Bright blue for active generate button
  },
  inactiveButton: {
    backgroundColor: "#D3D3D3", // Gray for inactive buttons
  },
  buttonText: {
    fontSize: width * 0.045,
    fontFamily: "outfit-bold"
  },
  activeButtonText: {
    color: "#FFFFFF", // White for active buttons
  },
  inactiveButtonText: {
    color: "#555", // Dark gray for inactive buttons
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: height * 0.1, // Prevent overlap with content
  },
  generatedContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
  },
  generatedText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
});
