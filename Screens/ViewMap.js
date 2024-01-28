import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {
  Dimensions
  , StyleSheet,
  Modal, View,
  Button,
  BackHandler
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Toast from "react-native-toast-message";
import { db } from "./Firebase";
import util from "../helpers/util";

const ViewMap = ({ visible, onClose, data }) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        onClose();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const screen = Dimensions.get('window')
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.9222;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const UserLocation = {
    latitude: 24.8787702,
    longitude: 66.8788,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const handleAccept = async() => {
    
    await db.collection('RequestService')
    .where("ID_Number", '==', data.ID_Number)  // Adjust this condition based on your use case
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Get the document data
        const documentData = doc.data();
  
        // Get the document ID
        const documentId = doc.id;
  
        // Update the field
        db.collection("RequestService").doc(documentId).update({
          Status:"Accepted"
        })
        .then(() => {
          util.successMsg("Successfully Accepted")
          onClose();
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
      });
    })
    .catch((error) => {
      console.error('Error getting documents: ', error);
    });
  };


  const handleDecline = async() => {
    await db.collection('RequestService')
    .where("ID_Number", '==', data.ID_Number)  // Adjust this condition based on your use case
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // Get the document data
        const documentData = doc.data();
  
        // Get the document ID
        const documentId = doc.id;
  
        // Update the field
        db.collection("RequestService").doc(documentId).update({
          Status:"Deleted"
        })
        .then(() => {
          util.successMsg("Successfully Declined")
          onClose();
          console.log('Document successfully updated!');
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
      });
    })
    .catch((error) => {
      console.error('Error getting documents: ', error);
    });
  };
  console.log("Data", data)
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
          <Marker coordinate={{ latitude: data?.Latitude, longitude: data?.Longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA }} />
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
