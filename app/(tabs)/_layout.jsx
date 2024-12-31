import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated as RNAnimated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

import MyTripScreen from './mytrip';
import DiscoverScreen from './discover';
import ProfileScreen from './profile';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

export default function App() {
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const indicatorPosition = useRef(new RNAnimated.Value(0)).current;

  const handleTabBarLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setTabBarWidth(width);
    setIndicatorWidth(width / 3);
  };

  const handleTabPress = (index) => {
    const tabWidth = tabBarWidth / 3;
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
                size={focused ? width * 0.07 : width * 0.06} // Dynamic size
                color={focused ? '#fff' : '#aaa'}
              />
            ),
            tabBarLabel: 'My Trip',
            tabBarLabelStyle: styles.tabLabelStyle,
            tabBarActiveTintColor: '#00ffcc',
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
                size={focused ? width * 0.07 : width * 0.06} // Dynamic size
                color={focused ? '#fff' : '#aaa'}
              />
            ),
            tabBarLabel: 'Discover',
            tabBarLabelStyle: styles.tabLabelStyle,
            tabBarActiveTintColor: '#00ffcc',
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
                size={focused ? width * 0.07 : width * 0.06} // Dynamic size
                color={focused ? '#fff' : '#aaa'}
              />
            ),
            tabBarLabel: 'Profile',
            tabBarLabelStyle: styles.tabLabelStyle,
            tabBarActiveTintColor: '#00ffcc',
          }}
          listeners={{
            tabPress: () => handleTabPress(2),
          }}
        />
      </Tab.Navigator>

      <View onLayout={handleTabBarLayout} style={styles.tabIndicatorWrapper}>
        <RNAnimated.View style={[styles.indicatorWrapper, { transform: [{ translateX: indicatorPosition }] }]}>
          <LinearGradient
            colors={['#00ffcc', '#00b38f', '#009974']}
            style={[styles.indicator, { width: indicatorWidth }]}
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
  tabBar: {
    position: 'absolute',
    backgroundColor: '#000000',
    borderRadius: height * 0.02,
    height: height * 0.08,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.05,
    overflow: 'hidden',
    bottom: 0,
  },
  tabIndicatorWrapper: {
    position: 'absolute',
    bottom: height * 0.02,
    left: '8%',
    right: '8%',
    height: height * 0.007,
    borderRadius: height * 0.0035,
    overflow: 'hidden',
  },
  tabLabelStyle: {
    paddingTop: height * 0.01,
    fontSize: width * 0.035, // Dynamic font size
  },
  indicatorWrapper: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.007,
    borderRadius: height * 0.0035,
    overflow: 'hidden',
  },
  indicator: {
    flex: 1,
    borderRadius: height * 0.0035,
  },
  shadow: {
    position: 'absolute',
    top: -height * 0.01,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: height * 0.0035,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    opacity: 0.4,
  },
});
