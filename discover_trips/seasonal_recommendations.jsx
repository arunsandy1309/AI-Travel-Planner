import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { GetPhotoRef } from "./../services/google_place_api"
import { useRouter } from "expo-router";
import { CreateTripContext } from "./../context/create_trip_context";

const { width, height } = Dimensions.get("window");

const recommendations = {
  Spring: [
    {
      destination: "Netherlands",
      description: "See the tulips in bloom and enjoy the charming canals.",
    },
    {
      destination: "Japan",
      description:
        "Cherry blossom season is magical, with beautiful temples and bustling cities.",
    },
    {
      destination: "Paris, France",
      description:
        "Pleasant weather, blooming gardens, and fewer crowds than summer.",
    },
    {
      destination: "Charleston, South Carolina, USA",
      description:
        "Historic charm, beautiful gardens, and pleasant temperatures.",
    },
  ],
  Summer: [
    {
      destination: "Mediterranean Coast (Greece)",
      description: "Sunshine, beaches, and ancient history.",
    },
    {
      destination: "Iceland",
      description: "Experience the midnight sun and stunning natural landscapes.",
    },
    {
      destination: "Banff National Park, Canada",
      description: "Turquoise lakes, stunning mountains, and hiking trails.",
    },
    {
      destination: "Bali, Indonesia",
      description: "Tropical paradise with beaches, rice paddies, and cultural experiences.",
    },
  ],
  Fall: [
    {
      destination: "Bavaria, Germany",
      description: "Oktoberfest, charming villages, and beautiful landscapes.",
    },
    {
      destination: "Kyoto, Japan",
      description: "Temples surrounded by colorful autumn leaves.",
    },
    {
      destination: "Scottish Highlands",
      description: "Dramatic scenery, castles, and cozy pubs.",
    },
    {
      destination: "Tuscany, Italy",
      description: "Harvest season, wine tasting, and beautiful countryside.",
    },
  ],
  Winter: [
    {
      destination: "Swiss Alps",
      description: "Skiing, snowboarding, and stunning mountain scenery.",
    },
    {
      destination: "Lapland, Finland",
      description: "Northern Lights, snow-covered forests, and reindeer encounters.",
    },
    {
      destination: "Vienna, Austria",
      description: "Christmas markets, classical music, and charming atmosphere.",
    },
    {
      destination: "Quebec City, Canada",
      description: "Winter carnival, ice sculptures, and historic charm.",
    },
  ],
};

export default function SeasonalRecommendations() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  const handleArrowPress = async (destination) => {
    try {
      const data = await GetPhotoRef(destination);
      const locationInfo = {
        name: destination,
        coordinates: data.results[0]?.geometry.location || null,
        photo_ref: data.results[0]?.photos?.[0]?.photo_reference || null,
        url: data.results[0]?.url || null,
      };

      setTripData({ ...tripData, locationInfo });
      console.log(tripData)
      router.push("/create_trip/select_traveller"); 
    } catch (error) {
      console.error(`Error fetching data for ${destination}:`, error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Heading */}
      <Text style={styles.heading}>Seasonal Recommendations</Text>

      {/* Spring Container */}
      <View style={styles.seasonContainer}>
        <LottieView
          source={require("./../assets/animations/spring_animation.json")}
          autoPlay
          loop
          style={styles.backgroundAnimation}
        />
        <View style={styles.seasonContent}>
          <Text style={styles.seasonTitle}>Spring</Text>
          {recommendations.Spring.map(({ destination, description }, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.destination}>{destination}</Text>
                <Text style={styles.description}>{description}</Text>
              </View>
              <TouchableOpacity
                style={styles.cardIcon}
                onPress={() => handleArrowPress(destination)}
              >
                <Ionicons
                  name="arrow-redo-outline"
                  size={width * 0.08}
                  color="#555"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>


      </View>

            {/* Summer Container */}
            <View style={styles.seasonContainer}>
        <LottieView
          source={require("./../assets/animations/summer_animation.json")}
          autoPlay
          loop
          style={styles.backgroundAnimation}
        />
        <View style={styles.seasonContent}>
          <Text style={styles.seasonTitle}>Summer</Text>
          {recommendations.Summer.map(({ destination, description }, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.destination}>{destination}</Text>
                <Text style={styles.description}>{description}</Text>
              </View>
              <TouchableOpacity
                style={styles.cardIcon}
                onPress={() => handleArrowPress(destination)}
              >
                <Ionicons
                  name="arrow-redo-outline"
                  size={width * 0.08}
                  color="#555"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        
      </View>

            {/* Fall Container */}
            <View style={styles.seasonContainer}>
        <LottieView
          source={require("./../assets/animations/fall_animation.json")}
          autoPlay
          loop
          style={styles.backgroundAnimation}
        />
        <View style={styles.seasonContent}>
          <Text style={styles.seasonTitle}>Fall</Text>
          {recommendations.Fall.map(({ destination, description }, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.destination}>{destination}</Text>
                <Text style={styles.description}>{description}</Text>
              </View>
              <TouchableOpacity
                style={styles.cardIcon}
                onPress={() => handleArrowPress(destination)}
              >
                <Ionicons
                  name="arrow-redo-outline"
                  size={width * 0.08}
                  color="#555"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        
      </View>

      {/* Winter Container */}
      <View style={styles.seasonContainer}>
        <LottieView
          source={require("./../assets/animations/winter_animation.json")}
          autoPlay
          loop
          style={styles.backgroundAnimation}
        />
        <View style={styles.seasonContent}>
          <Text style={styles.seasonTitle}>Winter</Text>
          {recommendations.Winter.map(({ destination, description }, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.destination}>{destination}</Text>
                <Text style={styles.description}>{description}</Text>
              </View>
              <TouchableOpacity
                style={styles.cardIcon}
                onPress={() => handleArrowPress(destination)}
              >
                <Ionicons
                  name="arrow-redo-outline"
                  size={width * 0.08}
                  color="#555"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        
      </View>

      {/* Other seasons (Summer, Fall, Winter) follow the same structure */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: height * 0.04,
  },
  scrollContent: {
    paddingBottom: height * 0.15, // Extra padding for tab navigation
  },
  heading: {
    fontSize: width * 0.07,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: "#333",
    marginBottom: height * 0.03,
  },
  seasonContainer: {
    marginBottom: height * 0.05,
    position: "relative",
    overflow: "hidden", // Ensures animation stays within container
    borderRadius: 15, // Rounds the entire container
  },
  backgroundAnimation: {
    position: "absolute",
    width: width * 1.3, // Dynamic width
    height: height * 0.69, // Dynamic height
    zIndex: 1,
  },
  seasonContent: {
    position: "relative",
    zIndex: 2, // Ensures content is above the animation
    padding: 20,
  },
  seasonTitle: {
    fontSize: width * 0.07,
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  card: {
    flexDirection: "row", // Align content and icon horizontally
    justifyContent: "space-between", // Space between content and icon
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Semi-transparent white
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    flex: 1,
  },
  cardIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  destination: {
    fontSize: width * 0.05,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: "#000",
    marginBottom: height * 0.01,
  },
  description: {
    fontSize: width * 0.04,
    fontFamily: "outfit",
    textAlign: "center",
    color: "#555",
  },
});
