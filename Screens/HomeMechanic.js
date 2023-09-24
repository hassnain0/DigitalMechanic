import React, { useEffect} from 'react';
import {Alert,ImageBackground,BackHandler, StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Request from './Requests';
import Rating from './Rating';
import Settings from './Settings';
import { auth } from './Firebase';
import util from '../helpers/util';


const HomeMechanic=({navigation})=>{
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
   
      useEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={handlelogout}>
              <Image source={require('../assets/LogoutButton.png')} style={{width:30,height:30,marginRight:5}}></Image>
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
      
      const handlelogout=()=>{
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
              onPress: () =>logout()
            }
          ],
          { cancelable: false,
            titleStyle: { color: 'red' },
            messageStyle: { color: 'blue' }, }
        );
        return true;
      };
    const RequestMethod=()=>{
    navigation.navigate("Request")     
    }
    const CheckHistory=()=>{
    navigation.navigate('CheckHistory')
    }

    const Management=()=>{
navigation.navigate("Settings")
    }
    const RateFeedback=()=>{
    navigation.navigate("Rating")
    }
    const ProvideService=()=>{
      navigation.navigate("ProvideService")
    }
       
    return(
      
            <ImageBackground source={require("../assets/ImageBackground.jpeg")} style={styles.container}>
              <View style={styles.rowContainer}>
                <View style={styles.cardContainer}>
                  <Image
                    source={require("../assets/Car.png")}
                    style={styles.cardImage}
                  />
                  <TouchableOpacity
                    onPress={ProvideService}
                    style={[styles.touchContainer]}
                  >
                    <Text style={styles.buttonText}>Provide Services</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContainer}>
                  <Image
                    source={require("../assets/Management.png")}
                    style={styles.cardImage}
                  />
                  <TouchableOpacity
                    onPress={Management}
                    style={[styles.touchContainer]}
                  >
                    <Text style={styles.buttonText}>Profile Management</Text>
                  </TouchableOpacity>
                </View>
              </View>
        
              <View style={styles.rowContainer}>
                <View style={styles.cardContainer}>
                  <Image
                    source={require("../assets/Service.jpg")}
                    style={styles.cardImage}
                  />
                  <TouchableOpacity
                    onPress={RequestMethod}
                    style={[styles.touchContainer]}
                  >
                    <Text style={styles.buttonText}>Check for Services</Text>
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
                    <Text style={styles.buttonText}>Service Rating and Feedback</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          );
        };
        
        const styles = StyleSheet.create({
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
export default HomeMechanic;