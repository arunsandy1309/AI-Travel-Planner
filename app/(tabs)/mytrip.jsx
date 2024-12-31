
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTrip from "../../components/MyTrips/start_new_trip_card";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from './../../configs/FirebaseConfig';
import UserTripList from "../../components/MyTrips/user_trip_list";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');
export default function MyTripScreen() {
    const [userTrips, setUserTrips] = useState([]);
    const curr_user = auth.currentUser;
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (curr_user) {
            GetMyTrip();
        }
    }, [curr_user]);

    const GetMyTrip = async () => {
        setLoading(true);
        setUserTrips([]);

        try {
            const extract_query = query(
                collection(db, "UserTrips"),
                where("userEmail", "==", curr_user?.email),
                orderBy("timestamp", "desc")
            );

            const querySnapshot = await getDocs(extract_query);
            const trips = [];

            querySnapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                trips.push({ id: doc.id, ...doc.data() });
            });

            setUserTrips(trips);
        } catch (error) {
            console.error("Error fetching user trips:", error);
        }

        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar style="dark" />
            <View style={styles.add_trip}>
                <Text style={styles.my_trip_title}>Your Trips</Text>
                <TouchableOpacity
                    onPress={() => {
                        router.push('./../create_trip/search_places');
                    }}
                >
                    <Ionicons name="add-circle-sharp" size={width * 0.12} color="black" />
                </TouchableOpacity>
            </View>

            {loading && (
                <ActivityIndicator size={'large'} color='#999' style={styles.loader} />
            )}

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {userTrips?.length === 0 ? (
                    <StartNewTrip />
                ) : (
                    <UserTripList userTrips={userTrips} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: height * 0.06, // 5% of screen height
    },
    scrollContainer: {
        paddingBottom: height * 0.1, // 10% of screen height for extra padding
    },
    my_trip_title: {
        fontFamily: 'outfit-bold',
        fontSize: width * 0.08, // 8% of screen width
        paddingLeft: width * 0.02, // 3% of screen width
    },
    add_trip: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width * 0.03, // 3% of screen width
        paddingVertical: height * 0.01, // 1% of screen height
    },
    loader: {
        marginTop: height * 0.03, // 3% of screen height
        alignSelf: 'center',
    },
});
