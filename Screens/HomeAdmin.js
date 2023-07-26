import React, { useState } from 'react';
import {Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import { Button } from 'react-native-elements';
import { Metrics } from '../themes';
import { useFocusEffect } from '@react-navigation/native';
import ListMechanic from './ListMechanic'


const HomeAdmin=({navigation})=>{
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
   
    const RequestMechanic=()=>{
navigation.navigate("ListMechanic")
    }
     
    return(
      
            <View style={styles.container}>
              <View style={styles.rowContainer}>
                <View style={styles.cardContainer}>
                  <Image
                    source={require("../assets/Man.png")}
                    style={styles.cardImage}
                  />
                  <TouchableOpacity
                    onPress={RequestMechanic}
                    style={[styles.touchContainer]}
                  >
                    <Text style={styles.buttonText}>Mechanic Request's</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContainer}>
                  <Image
                    source={require("../assets/InProgress.png")}
                    style={styles.cardImage}
                  />
                  <TouchableOpacity
                    
                    style={[styles.touchContainer]}
                  >
                    <Text style={styles.buttonText}>In Progress</Text>
                  </TouchableOpacity>
                </View>
              </View>
        
              <View style={styles.rowContainer}>
                <View style={styles.cardContainer}>
                  <Image
                    source={require("../assets/InProgress.png")}
                    style={styles.cardImage}
                  />
                  <TouchableOpacity
                    
                    style={[styles.touchContainer]}
                  >
                    <Text style={styles.buttonText}>In Progress</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContainer}>
                  <Image
                    source={require("../assets/InProgress.png")}
                    style={styles.cardImage}
                  />
                  <TouchableOpacity

                    style={[styles.touchContainer]}
                  >
                    <Text style={styles.buttonText}>In Progress</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
            marginBottom: 10,
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
            backgroundColor: "#002F46",
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
export default HomeAdmin;