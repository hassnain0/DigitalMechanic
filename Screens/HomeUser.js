import React, { useState, useEffect } from 'react'
import { Image, TextInput, StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView, BackHandler, Modal, ImageBackground } from 'react-native'
import { Metrics } from '../themes'
import CustomDialog from './CustomDialog';
import { auth, db, firebase } from './Firebase';
import { getAuth, } from 'firebase/auth';
import Locations from './Locations';
import { useFocusEffect } from '@react-navigation/native';
import util from '../helpers/util';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import * as Location from 'expo-location';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeUser = ({ navigation }) => {


  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState(null);
  const [isDialogVisible, setDialogVisible] = useState(false);

  const services = ['Painter', 'Electrician', 'Flat Tire Mechanic', 'Key Maker', 'Denter', 'Auto Mechanic', 'Body-Mechanic']; // Add other services as needed
  const [data, setData] = useState('');
  const [inputText, setInputText] = useState();

  const [showInput, setShowInput] = useState(false);

  const handleCancel = () => {
    setShowInput(false)
  }

  const handleConfirm = async () => {
    try {
      const date = new Date().toLocaleDateString();
      await db.collection("Feedback").add({
        myDate: date,
        Feedback: inputText,
      }).then(() => {
        setInputText('');
        setShowInput(false);
      })
    }

    catch (error) {
      console.log(error)
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel'
            },
            {
              text: 'Exit',
              onPress: () => BackHandler.exitApp()
            }
          ],
          { cancelable: false }
        );
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
  const handleCloseDialog = () => {
    setDialogVisible(false);
  };
  const RequestMethod = () => {
    setDialogVisible(true);
  }
  const CheckHistory = () => {
    navigation.navigate('CheckHistory')
  }

  const Cancel = () => {
    const userEmail = getAuth().currentUser.email;
    db.collection("RequestService").where("Status", '==', 'Pending')
      .where("Email", "==", userEmail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(querySnapshot)
          // Use the entire state object to update the document
          db.collection("RequestService")
            .doc(doc.id)
            .update({
              Status: "Deleted"
            })
            .then(() => {

              util.successMsg(" Request  deleted")
            })
            .catch((error) => {
              console.error("Error updating document:", error);
            });
        });
      })

      .catch((error) => {
        console.error("Error fetching document:", error);
      });
  }
  const RateFeedback = () => {
    setShowInput(true)
  }

  const handleServiceSelect = async (selected) => {
    setLoading(true);
          setSelectedServices(selected);

    if(selectedServices==null){
      return false;
    }
    try {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await .getCurrentPositionAsync({});

      const latitude=location.coords.latitude;
      const longitude=location.coords.longitude;

      console.log("Services Selected",services)
      const data = {
        Latitude: latitude,
        Longitude: longitude,
        Specialties: ["Painter", "Denter"]
      }
      const url = "https://zohaib964242.pythonanywhere.com/predict";

      // Using axios:
      try {

        const response = await axios.post(url, data);

        if (response.data) {

          navigation.navigate("Locations", {
            Data: response.data,
          })
          setLoading(false);
        }
        else {
          setLoading(false);
          setDialogVisible(false);
          util.errorMsg("No Nearby Mechanic found");
          return false;

        }
      }

      catch (error) {
        console.log(error)
      }
    }
    catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handlelogout}>
          <Image source={require('../assets/LogoutButton.png')} style={{ width: 30, height: 30, marginRight: 5 }}></Image>
        </TouchableOpacity>
      ),
    });
  }, [])

  const logout = () => {

    auth
      .signOut()
      .then(() => util.successMsg("Sucessfully Logout"));
    navigation.navigate("Login")
  }

  const handlelogout = () => {
    Alert.alert(
      'Done Route',
      'Are you sure you want  to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: () => logout()
        }
      ],
      {
        cancelable: false,
        titleStyle: { color: 'red' },
        messageStyle: { color: 'blue' },
      }
    );
    return true;
  };

  return (
    <ImageBackground source={require("../assets/ImageBackground.jpeg")} style={styles.container}>
      <CustomDialog
        visible={isDialogVisible}
        onClose={handleCloseDialog}
        services={services}
        onServiceSelect={handleServiceSelect}
      />
      <Spinner
        visible={loading}
        size={'large'}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
      <View style={styles.rowContainer}>
        <View style={styles.cardContainer}>
          <Image
            source={require("../assets/20945730.jpg")}
            style={styles.cardImage}
          />
          <TouchableOpacity
            onPress={RequestMethod}
            style={[styles.touchContainer]}
          >
            <Text style={styles.buttonText}>Request for Service</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <Image
            source={require("../assets/4027232_15831.jpg")}
            style={styles.cardImage}
          />
          <TouchableOpacity
            onPress={CheckHistory}
            style={[styles.touchContainer]}
          >
            <Text style={styles.buttonText}>Check History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.cardContainer}>
          <Image
            source={require("../assets/Cancel.png")}
            style={styles.cardImage}
          />
          <TouchableOpacity
            onPress={Cancel}
            style={[styles.touchContainer]}
          >
            <Text style={styles.buttonText}>Cancel Request</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <Image
            source={require("../assets/Start.jpg")}
            style={styles.cardImage}
          />
          <TouchableOpacity
            onPress={RateFeedback}
            style={[styles.touchContainer]}
          >
            <Text style={styles.buttonText}>Rating Feedback</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={showInput}  >
        <View style={styles.modalContainer}>

          <TextInput
            style={styles.input}
            onChangeText={text => setInputText(text)}
            value={inputText}
            placeholder='Enter your feedback here'
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={styles.modalButton}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Toast ref={ref => Toast.setRef(ref)} />
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  ViewContainer: {
    marginTop: Metrics.ratio(80),
    flexDirection: 'column',
    flex: 1,
    width: 400,
    height: 600,
  },

  ImageBackgroundcontainer: {

    paddingTop: 120,
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    elevation: 5,

  },
  TouchContainer2: {
    backgroundColor: '#3A0A6A',

    elevation: 10,
    borderWidth: 2,

    borderRadius: 15,
    alignItems: 'center',
    height: 70,
    justifyContent: 'center',
    marginTop: 16,
    borderColor: 'white',
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
  MapContainer: {

    flex: 1,
    flexDirection: 'column',
    width: 500,
    height: 400
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
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  rowContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between", // Adjust spacing between cards horizontally
    marginVertical: 10,
    marginBottom: 50,
    marginHorizontal: 10, // Add gap between individual cards of each row
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 10, // Add space between cards within a row
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  touchContainer: {
    alignItems: "center",
    backgroundColor: "#3A0A6A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: '300',
    fontSize: 13,
    color: "white",
    textAlign: "center",
  },
});

export default HomeUser;