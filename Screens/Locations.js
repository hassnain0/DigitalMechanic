import React, { useEffect, useRef, useState } from 'react';
import {Text, StyleSheet, View ,Dimensions, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE,ActivityIndicator,Polyline,AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location'
import ImagePath from '../helpers/ImagePath';
import { Metrics } from '../themes';
import { db } from './Firebase';
const Locations=()=>{

   const mapRef=useRef(null)
   const markerRef=useRef(null);
 
   
   //Map Dimensions

   //Tracking method
  
   const mechanicsData = [];
   const [markerShown,setMarkerShown]=useState(false)
   const screen=Dimensions.get('window')
   const ASPECT_RATIO=screen.width/screen.height;
   const LATITUDE_DELTA=0.9222;
  const LONGITUDE_DELTA=LATITUDE_DELTA*ASPECT_RATIO;

  const [state, setState] = useState({
    currlocation1: {
      latitude:25.9157 , 
      longitude:67.0921,
    },
    currlocation2: {
      latitude:26.9157 , 
      longitude:67.0921,
    },
    currlocation3: {
      latitude:24.9157 , 
      longitude:67.0921,
    },
    currlocation4: {
      latitude:26.9157 , 
      longitude:60.0921,
    },

  })

  const { currlocation1,currlocation2,currlocation3,currlocation4 } = state

  const animate=(latitude,longitude)=>{
    const newCoordinate={latitude,longitude}
     if(markerRef.current){
   
       markerRef.current.animateMarkerToCoordinate(newCoordinate,7000);
     
    }
    
    }

   
useEffect(()=>{

  // Function to fetch data from Firestore and add to mechanicsData
  async function fetchMechanicsData() {
    try {
      const mechanicsCollection =db.collection("Registration").where('Identity','==','Mechanic')
      const snapshot = await mechanicsCollection.get();
  
      snapshot.forEach((doc) => {
        const mechanic = doc.data();
        mechanicsData.push(mechanic);
      });
  
      console.log('Mechanics data fetched and added successfully:', mechanicsData);
    } catch (error) {
      console.error('Error fetching mechanics data:', error);
    }
  }
  
  // Call the function to fetch data and add to mechanicsData
  fetchMechanicsData();
  //Get Current location of user
  const getMyLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
animate(latitude,longitude)
    const latitude=location.coords.latitude;
    const longitude=location.coords.longitude
    
  }
getMyLocation();
},[])
   
const renderMechanicItem = ({ item }) => {
 
  console.log("Item",item)
  // Function to open the dial pad with the provided phone number
  const handleCallPress = () => {
    if (item.phoneNumber) {
      Linking.openURL(`tel:${item.phoneNumber}`);
    }
  };
}
    
const MarkerPressed = () => {
  db.collection("RequestService").add
  setMarkerShown(!markerShown);
};
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        maxZoomLevel={18}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsIndoors={true}
        initialRegion={{
          latitude: 24.9157,
          longitude: 67.0921,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Marker
          draggable={true}
          ref={markerRef}
          title="Nearby Mechanic"
          coordinate={currlocation1}
          image={ImagePath.Engineer}
          onPress={MarkerPressed}
        />
      </MapView>
      {markerShown && (
        <View style={styles.BottomCard}>
          <View style={{ position: 'absolute', bottom: 0, paddingBottom: 80, left: 40, backgroundColor: 'white' }}>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={styles.flatListContent}
              data={mechanicsData}
              renderItem={renderMechanicItem}
              keyExtractor={(item) => item.CNIC.toString()}
            />
            <Text>InProgress</Text>
          </View>
        </View>
      )}
    </View>
  );
};
const styles=StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },  flatListContent: {
    flexGrow: 1, // Make the content take all available space
  },
  TouchContainer: {
    backgroundColor: 'white',
    borderWidth: 2,

    borderRadius: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop:16,
    borderColor: 'white',
  },
  BottomCard: {
    backgroundColor: 'white',
    width: '100%',
    paddingRight:10,
    paddingBottom:(250),
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  }, 
  mechanicItem: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  mechanicImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },

  mechanicDetails: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
  },

  mechanicName: {
    fontSize: 18,
    color:'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },

  mechanicPhoneNumber: {
    color: 'blue',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },

  mechanicEmail: {
    marginBottom: 5,
  },

  mechanicShopDetails: {
    color: '#888',
  },
  
  input: {
    color: 'grey',
    height: 30,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalButton: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'gray',
    color: 'white',
  },
})

export default Locations;