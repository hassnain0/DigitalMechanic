import React, { useEffect, useRef, useState } from 'react';
import {Text, StyleSheet, View ,Dimensions,FlatList,Button} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView, { Marker, PROVIDER_GOOGLE,} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { db } from './Firebase';
import util from '../helpers/util';
import Toast from 'react-native-toast-message';

const Locations=({route})=>{

   const mapRef=useRef(null)
   const [markerShown,setMarkerShown]=useState(true)
   const screen=Dimensions.get('window')
   const ASPECT_RATIO=screen.width/screen.height;
   const LATITUDE_DELTA=0.9222;
  const LONGITUDE_DELTA=LATITUDE_DELTA*ASPECT_RATIO;
   const [data,setData]=useState(''); 
   const [MechanicList,setMechanicList]=useState('');
// useEffect(()=>{
//   const Data=route.params.Data
//   console.log(Data)
// setData(Data);
//   // Function to fetch data from Firestore and add to mechanicsDa
 
// },[])
   
const Request = async ()=> {
  
  await db.collection("RequestService").add({
      Request:"Pending",
      // Status:"Pending",
     }).then(()=>{
     util.successMsg("Request Sucessfully Sent");
     setLoader(false);
     }).catch((error)=>console.log(error))
};
const showDetails=(marker)=>
{
  setMechanicList(marker)
  setMarkerShown(true)  
}

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
          {data &&
          data.length > 0 &&
          data.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.Latitude, // Use the correct key from your data
                longitude: marker.Longitude, // Use the correct key from your data
              }}
              title={marker.Address}
              onPress={() => {
                showDetails(marker);
                // Implement your logic to show details here
              }}
            />
          ))}
      </MapView>
      {markerShown && (
      
          <View style={{
          ...styles.flatListView,
          }}>
              <FlatList
                  data={MechanicList}
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

                                         <Image
                                                source={{ uri:'https://www.pinkvilla.com/images/2023-01/1674581250_pexels-jhosua-rodriguez-2465327.jpg' }}
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 100,
                                                }}
                                            />
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
                               {/* <Text style={{
                                      fontSize: 14,
                                      fontWeight: "500",
                                      color: '#000000',
                                      marginLeft: 26,
                                  }} numberOfLines={1}>{item.pickup}</Text> */}
                              </View>

                              {/* Stop view List */}
                              
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
                                      }}>Address</Text>
                                  </View>
                                  <Text style={{
                                      fontSize: 14,
                                      fontWeight: "500",
                                      color: '#000000',
                                      marginLeft: 26,
                                  }} numberOfLines={1}>{item.Address}</Text>
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
                                      onPress={() => { console.log("Done") }}
                                  />
                              </View>
                          </View>
                          )
                  }}/>
          </View>
      )}
      <Toast ref={(ref)=>Toast.setRef(ref)}/>
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