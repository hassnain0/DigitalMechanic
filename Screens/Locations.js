import React, { useEffect, useRef, useState } from 'react';
import {Text, StyleSheet, View ,Dimensions, TouchableOpacity, FlatList, ScrollView,Button} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView, { Marker, PROVIDER_GOOGLE,} from 'react-native-maps';
import * as Location from 'expo-location'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePath from '../helpers/ImagePath';
import { Metrics } from '../themes';
import { db } from './Firebase';
const Locations=({route})=>{

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
 console.log("Route",route.params)
  //Get Current location of user
//   const getMyLocation = async () => {

//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       return;
//     }

//     let location = await Location.getCurrentPositionAsync({
//       enableHighAccuracy: true
//     });
// animate(latitude,longitude)
//     const latitude=location.coords.latitude;
//     const longitude=location.coords.longitude
    
//   }
// getMyLocation();
},[])
   

const MechanicList=[
  {
      id:1,
      userImg:"https://menshaircuts.com/wp-content/uploads/2023/01/tp-simple-hair-style-men.jpg",
      userName:"Ahmad",
      time:"38 mins",
      distance: "16.3 mi",
      price:"24",
      pickup:"Street abc, ABC road, town Abc",
      pickupRegion: {
          latitude: 28.412431403916305,
          longitude: 70.3080391511321,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
      dropoff:"Street2 abc, ABC Main Road",
      dropoffRegion:{
          latitude: 28.422692508486698,
          longitude: 70.3116587921977,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
      stops:[
          {
              id:1,
              stopName:"Street abc2, ABC Road, Town",
              stopRegion: {
                  latitude: 28.41851275733448,
                  longitude: 70.31051248311996,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
              },
          }
      ]
  },
  {
      id: 2,
      userImg: "https://www.pinkvilla.com/images/2023-01/1674581250_pexels-jhosua-rodriguez-2465327.jpg",
      userName: "Anna",
      time: "38 mins",
      distance: "16.3 mi",
      price: "24",
      pickup: "Street abc, ABC road, town Abc",
      pickupRegion: {
          latitude: 28.40962312387894,
          longitude: 70.30914556235075,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
      dropoff: "Street2 abc, ABC Main Road",
      dropoffRegion: {
          latitude: 28.392880715002157,
          longitude: 70.3328562900424,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      },
      stops: [
          {
              id: 1,
              stopName: "Street abc2, ABC Road, Town",
              stopRegion: {
                  latitude: 28.404047923309488,
                  longitude: 70.3093832731247,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
              },
          },
          {
              id: 2,
              stopName: "Street 123, ABC Road, Town",
              stopRegion: {
                  latitude: 28.399621173203865,
                  longitude: 70.30930984765291,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
              },
          }
      ]
  }
]
const renderMechanicItem = ({ item }) => {
 
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
        <Marker
          draggable={true}
          ref={markerRef}
          title="Nearby Mechanic"
          coordinate={currlocation2}
          image={ImagePath.Engineer}
          
        />
      </MapView>
      {markerShown && (
      
          <View style={{
          ...styles.flatListView,
          }}>
              <FlatList
                  data={route.params.Data ? route.params.Data:[]}
                  contentContainerStyle={{
                      paddingBottom: 40,
                  }}
                  
                  renderItem={({ item, index }) => {
                      return (
                          <View style={{
                              ...styles.tabViewStyle,
                          }}>
                             
                              {/* Time and Distance */}
                              <View style={{
                                  width: "100%",
                                  height: 40,
                                  flexDirection: "row",
                                  justifyContent:"space-between",
                                  alignItems: 'center',
                              }}>
                                           <Text style={{
                                      fontSize: 18,
                                      color: "#717171",
                                      fontWeight: "500",
                                      width: "50%",
                                  }} numberOfLines={1}>Name:</Text>
                                  <Text style={{
                                      fontSize: 16,
                                      color:'#000000',
                                      fontWeight: "500",
                                      width: "50%",
                                      textAlign: "right",
                                  }} numberOfLines={1}>{item.Name}</Text></View>

                              {/* Price */}
                              <View style={{
                                  width: "100%",
                                  height: 40,
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: 'center',
                              }}>
                                  {/* Price */}
                                  
                              </View>

                              {/* Pickup view */}
                              <View style={{
                                  width: "100%",
                                  marginTop: 10,
                                  justifyContent: 'center',
                              }}>
                                  <View style={{
                                      flexDirection: "row",
                                      alignItems: 'center',
                                  }}>
                                      <FontAwesome name={"dot-circle-o"} size={20} color={'#982920'} />
                                      <Text style={{
                                          fontSize: 12,
                                          color: "#787878",
                                          marginLeft: 10,
                                      }}>Pickup</Text>
                                  </View>
                               <Text style={{
                                      fontSize: 14,
                                      fontWeight: "500",
                                      color: '#000000',
                                      marginLeft: 26,
                                  }} numberOfLines={1}>{item.pickup}</Text>
                              </View>

                              {/* Stop view List */}
                              {item.stops.map((value, index) => 
                                  <View key={value.id} style={{
                                      width: "100%",
                                      marginTop: 5,
                                      justifyContent: 'center',
                                  }}>
                                      <View style={{
                                          flexDirection: "row",
                                          alignItems: 'center',
                                      }}>
                                          <Entypo name={"location-pin"} size={20} color={'#982920'} style={{ left: -1 }} />
                                          <Text style={{
                                              fontSize: 12,
                                              color: "#787878",
                                              marginLeft: 10,
                                          }}>Stop</Text>
                                      </View>
                                      <Text style={{
                                          fontSize: 14,
                                          fontWeight: "500",
                                          color:'#000000',
                                          marginLeft: 26,
                                      }} numberOfLines={1}>{value.stopName}</Text>
                                  </View>
                              )}
                              
                              {/* Dropoff view */}
                              <View style={{
                                  width: "100%",
                                  marginTop: 5,
                                  justifyContent: 'center',
                              }}>
                                  <View style={{
                                      flexDirection: "row",
                                      alignItems: 'center',
                                  }}>
                                      <FontAwesome name={"dot-circle-o"} size={20} color={'#000000'} />
                                      <Text style={{
                                          fontSize: 12,
                                          color: "#787878",
                                          marginLeft: 10,
                                      }}>Dropoff</Text>
                                  </View>
                                  <Text style={{
                                      fontSize: 14,
                                      fontWeight: "500",
                                      color: '#000000',
                                      marginLeft: 26,
                                  }} numberOfLines={1}>{item.dropoff}</Text>
                              </View>

                              <View style={{
                                  width: "100%",
                                  height: 45,
                                  marginTop: 10,
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                              }}>
                                  <Button
                                      title={"Reject"}
                                      buttonStyle={{
                                          width: "48%",
                                          height: "100%",
                                      }}
                                      onPress={() => {}}
                                  />
                                  <Button
                                      title={"Accept"}
                                      buttonStyle={{
                                          width: "48%",
                                          height: "100%",
                                      }}
                                      onPress={() => { this.props.navigation.navigate("DriverRideStart") }}
                                  />
                              </View>

                          </View>
                      )
                  }}/>
              
              
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
  container: {
    backgroundColor: '#fffff',
    width: "100%",
    height: "100%",
},
mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
},
sideBtnStyle:{
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: "10%",
    right: 15,
  
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
flatListView:{
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "39%",
    // backgroundColor: "red",
},
tabViewStyle:{
    width:"90%",
    padding:20,
    backgroundColor:"#FFFFFF",
    alignSelf: 'center',
    borderRadius:10,
    marginTop:10,
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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