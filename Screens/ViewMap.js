import React from "react";

import { Dimensions
  , StyleSheet,
  Modal,View,
  Text,
TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const ViewMap=({ visible, onClose, })=>{
    const screen=Dimensions.get('window')
    const ASPECT_RATIO=screen.width/screen.height;
    const LATITUDE_DELTA=0.9222;
   const LONGITUDE_DELTA=LATITUDE_DELTA*ASPECT_RATIO;
   const UserLocation = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const handleAccept = () => {
    // Implement your logic for accept button press
    console.log('Accepted');
  };

  const handleDecline = () => {
    // Implement your logic for decline button press
    console.log('Declined');
  };
    return(
      <View style={styles.container}>
        <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
        <MapView
        showsBuildings={true}
        maxZoomLevel={18}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        showsIndoors={true}
        initialRegion={{latitude: 24.9157,longitude: 67.0921,latitudeDelta: LATITUDE_DELTA,longitudeDelta: LONGITUDE_DELTA,}}>
<Marker coordinate={UserLocation} />
</MapView>
</Modal>
</View>
            
            
        
    )
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
export default ViewMap;
