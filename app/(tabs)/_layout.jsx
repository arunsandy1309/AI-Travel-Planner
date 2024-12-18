import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated as RNAnimated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";
import MyTripScreen from './mytrip';
import DiscoverScreen from './discover';
import ProfileScreen from './profile';


const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

export default function App() {
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const indicatorPosition = useRef(new RNAnimated.Value(0)).current;

  // Measure the tab bar width using onLayout
  const handleTabBarLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setTabBarWidth(width);
    setIndicatorWidth(width / 3);  // Set the indicator width as a fraction of the tab bar width
  };

  const handleTabPress = (index) => {
    // Adjust the indicator's position based on the selected tab
    const tabWidth = tabBarWidth / 3; // Adjust for the 3 tabs
    RNAnimated.timing(indicatorPosition, {
      toValue: index * tabWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="MyTrip"
          component={MyTripScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="bag-suitcase-outline"
                size={focused ? 30 : 24}
                color={focused ? '#fff' : '#aaa'}
              />
            ),
            tabBarLabel: "My Trip",
            tabBarLabelStyle: styles.tabLabelStyle,
            tabBarActiveTintColor: "#00ffcc"
          }}
          listeners={{
            tabPress: () => handleTabPress(0),
          }}
        />
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="map-search-outline"
                size={focused ? 30 : 24}
                color={focused ? '#fff' : '#aaa'}
              />
            ),
            tabBarLabel: 'Discover',
            tabBarLabelStyle: styles.tabLabelStyle,
            tabBarActiveTintColor: "#00ffcc"
          }}
          listeners={{
            tabPress: () => handleTabPress(1),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={focused ? 30 : 24}
                color={focused ? '#fff' : '#aaa'}
              />
            ),
            tabBarLabel: 'Profile',
            tabBarLabelStyle: styles.tabLabelStyle,
            tabBarActiveTintColor: "#00ffcc"
          }}
          listeners={{
            tabPress: () => handleTabPress(2),
          }}
        />
      </Tab.Navigator>

      {/* Tab bar indicator container (80% of the tab bar width) */}
      <View
        onLayout={handleTabBarLayout}
        style={styles.tabIndicatorWrapper}
      >
        {/* Animated gradient light indicator */}
        <RNAnimated.View style={[styles.indicatorWrapper, { transform: [{ translateX: indicatorPosition }] }]}>
          <LinearGradient
            colors={['#00ffcc', '#00b38f', '#009974']} // Light green gradient effect
            style={[styles.indicator, { width: indicatorWidth }]} // Dynamically adjust width based on tab width
          >
            <View style={styles.shadow}></View>
          </LinearGradient>
        </RNAnimated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  my_trip_screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  discover_screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccdc',
  },
  profile_screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  tabBar: {
    position: 'absolute',
    backgroundColor: '#000000',
    borderRadius: 15,
    height: 65,
    marginBottom: 20,
    marginHorizontal: 20,
    overflow: 'hidden',
    bottom: 0,  // Ensures the tab bar stays at the bottom
  },
  tabIndicatorWrapper: {
    position: 'absolute',
    bottom: 20,
    left: '8%', // Center the indicator within the tab bar (80% of tab bar width)
    right: '8%',
    height: 5,
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  tabLabelStyle: {
    paddingTop: 3,  // Adds 4 units of padding above the label
    fontSize: 12,   // Optionally adjust the font size if necessary
  },
  indicatorWrapper: {
    position: 'absolute',
    bottom: 0,
    height: 5,
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  indicator: {
    flex: 1,
    borderRadius: 2.5,
  },
  shadow: {
    position: 'absolute',
    top: -6,  // Adjust shadow position
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 2.5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',  // Light shadow effect
    opacity: 0.4,
  },
});

