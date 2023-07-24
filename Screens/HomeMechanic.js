import React, { useState } from 'react';
import {Alert,ImageBackground, BackHandler, StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import { Button } from 'react-native-elements';
import { Metrics } from '../themes';
import { useFocusEffect } from '@react-navigation/native';
import Request from './Requests';
import Rating from './Rating';
import Settings from './Settings';

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
    const PayforService=()=>{

    }
       
    return(
      
            <ImageBackground source={require("../assets/ImageBackground.jpeg")} style={styles.container}>
              <View style={styles.rowContainer}>
                <View style={styles.cardContainer}>
                  <Image
                    source={require("../assets/Button.png")}
                    style={styles.cardImage}
                  />
                  <TouchableOpacity
                    onPress={RequestMethod}
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
                    source={require("../assets/Request.png")}
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
                    source={require("../assets/Rating.png")}
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
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 50,
            
            margin:20,
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
            elevation: 2,
          },
          cardImage: {
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: "center",
            marginBottom: 20,
          },
          touchContainer: {
            alignItems:'center',
            backgroundColor: "#3A0A6A",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginBottom: 10,
          },
          buttonText: {
            
            fontSize: 20,
            color: "white",
            textAlign: "center",
          },
        });
export default HomeMechanic;