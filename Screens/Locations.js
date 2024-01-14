import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, Dimensions, FlatList, Button, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MapView, { Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { db } from './Firebase';
import util from '../helpers/util';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';
import firebase from 'firebase/compat';
import * as Location from 'expo-location';
const Locations = () => {

  const navigation=useNavigation();
  const mapRef = useRef(null)

  const [markerShown, setMarkerShown] = useState(false)
  const screen = Dimensions.get('window')
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.9222;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [MechanicList, setMechanicList] = useState('');

  const route = useRoute();
  const data = route.params.data ? route.params.data : null; 
  const showDetails = (marker) => {

    setMechanicList(marker)

    setMarkerShown((prevMarkerShown) => {

      return true;                  // Return the new state value
    });
    console.log(marker)
  }

  const cancel = () => {
    setMarkerShown(false)
  }

async  function SendReq  (item )  {
    const email = firebase.auth().currentUser.email;
    console.log("Email", email)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
console.log("Item",item)
const ID_Number=item.ID_Number;
const Speciality=item.Specialty;
    if (item) {
      await db.collection('RequestService').add({
        Latitude: latitude,
        Longitude: longitude,
        email: email,
        ID_Number: ID_Number,
        Speciality: Speciality,
        Status: 'Pending',
      }).then(() => {
        setMarkerShown(false)
        util.successMsg("Request Successfully Sent");
       
      })
        .catch((error) => {
          console.error('Error updating Req:', error.message);
        });
    }
    navigation.goBack();
  }
  const UserLocation = {
    latitude: 24.8787702,
    longitude: 66.8788,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={UserLocation}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsIndoors={true} >
        {data &&
          data.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.Latitude,
                longitude: marker.Longitude,
              }}
              title={marker.Name}
              description={`Specialty: ${marker.Specialty}`}

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
            data={[MechanicList]}
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
                    justifyContent: "space-between",
                    alignItems: 'center',
                  }}>
                    <Image
                      source={{ uri: 'https://www.pinkvilla.com/images/2023-01/1674581250_pexels-jhosua-rodriguez-2465327.jpg' }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                      }}
                    />
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",
                      width: "50%",
                      textAlign: "right",
                    }} numberOfLines={1}>{item.Name}</Text>


                  </View>
                  <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "left",
                    }} numberOfLines={1}>Specialties</Text>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "right",
                    }} numberOfLines={1}>{item.Specialty}</Text>
                  </View>
                  <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "left",
                    }} numberOfLines={1}>Phone Number</Text>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "right",
                    }} numberOfLines={1}>{item.Phone_Number}</Text>
                  </View>
                  <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "left",
                    }} numberOfLines={1}>ID Number</Text>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "right",
                    }} numberOfLines={1}>{item.ID_Number}</Text>
                  </View>
                  <View style={{
                    width: "100%",
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center',
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "left",
                    }} numberOfLines={1}>Address</Text>
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                      fontWeight: "500",

                      textAlign: "right",
                    }} numberOfLines={1}>{item.Address}</Text>
                  </View>
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

                  <View style={{
                    width: "100%",
                    height: 45,
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                    <Button
                      title={"Cancel"}
                      buttonStyle={{
                        width: "48%",
                        height: "100%",
                      }}
                      color={'red'}
                      onPress={cancel}
                    />
                    <Button
                      title={"Done"}
                      buttonStyle={{
                        width: "48%",
                        height: "100%",
                      }}
                      color={'green'}
                      onPress={() => SendReq(item)}
                    />

                  </View>
                </View>
              )
            }} />
        </View>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }, flatListContent: {
    flexGrow: 1, // Make the content take all available space
  },
  TouchContainer: {
    backgroundColor: 'white',
    borderWidth: 2,

    borderRadius: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
    borderColor: 'white',
  },
  BottomCard: {
    backgroundColor: 'white',
    width: '100%',
    paddingRight: 10,
    paddingBottom: (250),
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
    flexDirection: 'column',
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
  sideBtnStyle: {
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
  flatListView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "39%",
    // backgroundColor: "red",
  },
  tabViewStyle: {
    width: "90%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
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
    color: 'black',
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