// // import { StatusBar } from "expo-status-bar";
// // import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, ActivityIndicator, ScrollViewComponent, ScrollView } from 'react-native';
// // import Ionicons from '@expo/vector-icons/Ionicons';
// // import StartNewTrip from "../../components/MyTrips/start_new_trip_card";
// // import {collection, getDoc, getDocs, query, where} from "firebase/firestore";
// // import {auth, db} from './../../configs/FirebaseConfig';
// // import UserTripList from "../../components/MyTrips/user_trip_list";

// // export default function MyTripScreen() {

// //     const [userTrips, setUserTrips] = useState([]);
// //     const curr_user = auth.currentUser
// //     const [loading, setLoading] = useState(false);

// //     useEffect(() => {
// //       if (curr_user) {
// //           GetMyTrip();
// //       }
// //   }, [curr_user]);

// //     const GetMyTrip = async () => {
// //       setLoading(true);
// //           setUserTrips([]);
// //         try {
// //             const extract_query = query(
// //                 collection(db, "UserTrips"),where("userEmail", "==", curr_user?.email)
// //             );

// //             const querySnapshot = await getDocs(extract_query); // Use getDocs for queries

// //             const trips = [];
// //             querySnapshot.forEach((doc) => {
// //                 console.log(doc.id, '=>', doc.data()); // Logs the document ID and data
// //                 trips.push({ id: doc.id, ...doc.data() }); // Collect data into the trips array
// //             });

// //             setUserTrips(trips); // Update state with retrieved trips
// //         } catch (error) {
// //             console.error("Error fetching user trips:", error);
// //         }

// //         setLoading(false);
// //     };

// //   return (
// //     <ScrollView style={styles.screen}>
// //       <StatusBar style="dark" />

// //       <View style={styles.add_trip}>
// //         <Text style={styles.my_trip_title}>Your Trips</Text>
// //         <Ionicons name="add-circle-sharp" size={50} color="black" />
// //       </View>

// //       {loading&&<ActivityIndicator size={'large'} color='#999' alignItems='center' justifyContent='center'/>}
// //       {userTrips?.length==0?
// //         <StartNewTrip/>
// //         : 
// //          <UserTripList  userTrips = {userTrips}/>
// //       }
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   screen: {
// //     paddingTop: 50,
// //     height: "100%",
// //     backgroundColor: '#FFFFFF',
// //   },
// //   my_trip_title: {
// //     fontFamily: 'outfit-bold',
// //     fontSize: 35,
// //     paddingLeft: 10,
// //   },
// //   add_trip: {
// //     flexDirection: 'row',
// //     width: "100%",
// //     justifyContent: 'space-between', 
// //     alignItems: 'center',
// //     paddingHorizontal: 10, 
// //     paddingVertical: 5, 
// //     paddingRight: 20
// //   }
// // });



// import { StatusBar } from "expo-status-bar";
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import StartNewTrip from "../../components/MyTrips/start_new_trip_card";
// import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
// import { auth, db } from './../../configs/FirebaseConfig';
// import UserTripList from "../../components/MyTrips/user_trip_list";
// import { useRouter } from "expo-router";

// export default function MyTripScreen() {
//     const [userTrips, setUserTrips] = useState([]);
//     const curr_user = auth.currentUser;
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();
    
//     useEffect(() => {
//         if (curr_user) {
//             GetMyTrip();
//         }
//     }, [curr_user]);

//     const GetMyTrip = async () => {
//         setLoading(true);
//         setUserTrips([]);

//         try {
//             const extract_query = query(
//                 collection(db, "UserTrips"), 
//                 where("userEmail", "==", curr_user?.email),
//                 orderBy("timestamp", "desc")
//             );

//             const querySnapshot = await getDocs(extract_query);
//             const trips = [];

//             querySnapshot.forEach((doc) => {
//                 console.log(doc.id, '=>', doc.data());
//                 trips.push({ id: doc.id, ...doc.data() });
//             });

//             setUserTrips(trips);
//         } catch (error) {
//             console.error("Error fetching user trips:", error);
//         }

//         setLoading(false);
//     };

//     return (
//         <View style={styles.screen}>
//             <StatusBar style="dark" />
//             <View style={styles.add_trip}>
//                 <Text style={styles.my_trip_title}>Your Trips</Text>
//                <TouchableOpacity onPress={()=>{
//                 router.push('./../create_trip/search_places')
//                }}>
//                 <Ionicons name="add-circle-sharp" size={50} color="black" />
//                 </TouchableOpacity> 
//             </View>

//             {loading && (
//                 <ActivityIndicator size={'large'} color='#999' style={styles.loader} />
//             )}

//             <ScrollView
//                 contentContainerStyle={styles.scrollContainer}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {userTrips?.length === 0 ? (
//                     <StartNewTrip />
//                 ) : 
//                 (
//                     <UserTripList userTrips={userTrips} />
//                 )}
//             </ScrollView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//        // paddingTop:70
//     },
//     scrollContainer: {
//         paddingBottom: "25%",  // Extra padding for trips to move above nav bar
//        // paddingHorizontal: 20,
//     },
//     my_trip_title: {
//         fontFamily: 'outfit-bold',
//         fontSize: 35,
//         paddingLeft: 10,
//     },
//     add_trip: {
//         flexDirection: 'row',
//         width: "100%",
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 10,
//         paddingVertical: 5,
//         paddingRight: 20
//     },
//     loader: {
//         marginTop: 20,
//         alignSelf: 'center',
//     },
// });



import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTrip from "../../components/MyTrips/start_new_trip_card";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from './../../configs/FirebaseConfig';
import UserTripList from "../../components/MyTrips/user_trip_list";
import { useRouter } from "expo-router";

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
                    <Ionicons name="add-circle-sharp" size={50} color="black" />
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
        paddingTop: "15%"
    },
    scrollContainer: {
        paddingBottom: "25%", // Extra padding for trips to move above the nav bar
    },
    my_trip_title: {
        fontFamily: 'outfit-bold',
        fontSize: 35,
        paddingLeft: 10,
    },
    add_trip: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        paddingRight: 20,
    },
    loader: {
        marginTop: 20,
        alignSelf: 'center',
    },
});
