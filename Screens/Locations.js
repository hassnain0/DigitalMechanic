import React, { useEffect, useRef, useState } from 'react';
import {Text, StyleSheet, View ,Dimensions, TouchableOpacity} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE,ActivityIndicator,Polyline,AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location'
import ImagePath from '../helpers/ImagePath';
import { Metrics } from '../themes';
import styles from '../components/MainTextInput/styles';


const Locations=()=>{

   const mapRef=useRef(null)
   const markerRef=useRef(null);
 
   const[isTracking,setIsTracking]=useState(false);
   //Map Dimensions

   const screen=Dimensions.get('window')
   const ASPECT_RATIO=screen.width/screen.height;
   const LATITUDE_DELTA=0.9222;
  const LONGITUDE_DELTA=LATITUDE_DELTA*ASPECT_RATIO;

  const [state, setState] = useState({
    currlocation1: {
      latitude:25.9157 , 
      longitude:68.0921,
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
   


    return(
        <View style={styles.container}>
     <MapView
       
        ref={mapRef}
       maxZoomLevel={18}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsIndoors={true}
       
   
        initialRegion={{ latitude: 24.9157 , longitude:67.0921, latitudeDelta:LATITUDE_DELTA, longitudeDelta:LONGITUDE_DELTA  }}
      > 
      <Marker  draggable={true}

  ref={markerRef}
     
    title="Nearby Mechanic"
    coordinate={currlocation1}
    image={ImagePath.Engineer}
  />
  <Marker  draggable={true}

ref={markerRef}
   
  title="Nearby Mechanic"
  coordinate={currlocation2}
  image={ImagePath.Engineer}
/>
<Marker  draggable={true}

  ref={markerRef}
     
    title="Nearby Mechanic"
    coordinate={currlocation3}
    image={ImagePath.Engineer}
  />
  <Marker  draggable={true}

ref={markerRef}
   
  title="Nearby Mechanic"
  coordinate={currlocation4}
  image={ImagePath.Engineer}
/>
      </MapView>
    <View style={styles.BottomCard}>
      <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 70 }}>
          <TouchableOpacity
            style={[
              styles.TouchContainer,
              {
                backgroundColor: isTracking ? 'red' : 'green',
              },
            ]}
>
            <Text style={{ fontSize: 20, textAlign: 'center', alignItems: 'center', marginTop: 1, paddingLeft: 70, paddingRight: 50, color: 'white' }}>
              {isTracking ? 'Stop' : 'Start'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.TouchContainer,
              {
                backgroundColor: 'green',
              },
            ]}
          >
            <Text style={{ fontSize: 20, textAlign: 'center', alignItems: 'center', marginTop: 1, paddingLeft: 20, paddingRight: 20, color: 'white', textAlignVertical: 'center' }}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.TouchContainer,
              {
                backgroundColor: 'red',
              },
            ]}
          >
            <Text style={{ fontSize: 20, textAlign: 'center', alignItems: 'center', marginTop: 1, paddingLeft: 20, paddingRight: 30, color: 'white', }}>Cancel</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    )
}
const styles=StyleSheet.create({
  BottomCard: {
    backgroundColor: 'white',
    width: '100%',
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  }, 
  container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      TouchContainer:{
        backgroundColor:'green',
        borderWidth:2,
        
        borderRadius:1,
        alignItems:'center',
        height:48,
        justifyContent:'center',
        marginTop:16,
        borderColor:'white',
      },
      BottomCard:{
        backgroundColor:'white',
        width:'100%',
       
        borderTopEndRadius:24,
        borderTopStartRadius:24,
      } 
})

export default Locations;