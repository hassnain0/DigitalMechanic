import React from "react";

import {
  Dimensions
  , StyleSheet,
  Modal, View,
  Button
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Toast from "react-native-toast-message";

const ViewMap = ({ visible, onClose,data }) => {
  const screen = Dimensions.get('window')
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.9222;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const UserLocation = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const handleAccept = () => {

  };


  const handleDecline = () => {
    onClose();
  };
  console.log("Data",data)
  return (
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
          initialRegion={UserLocation}>
          {/* <Marker coordinate={{latitude: data?.latitude, longitude: data?.longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA}} /> */}
        </MapView>
        <View style={styles.buttonContainer}>
          <Button title="Accept" color={"green"} onPress={handleAccept} />
          <Button title="Decline" color={"red"} onPress={handleDecline} />
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Modal>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    width: '100%',
  },
})
export default ViewMap;
