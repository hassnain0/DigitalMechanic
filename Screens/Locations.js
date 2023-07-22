import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE,ActivityIndicator,Polyline,AnimatedRegion } from 'react-native-maps';


const Locations=()=>{
    return(
        <View style={styles.container}>
     <MapView
       
        ref={mapRef}
        maxZoomLevel={16.5}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsIndoors={true}
       
   
        initialRegion={{ latitude: 33.738045 , longitude: 73.084488, latitudeDelta:LATITUDE_DELTA, longitudeDelta:LONGITUDE_DELTA  }}
      > 
      </MapView>
      </View>
    )
}
const styles=StyleSheet.create({
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