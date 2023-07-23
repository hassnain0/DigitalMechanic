import React, { useState } from 'react';
import {Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Button } from 'react-native-elements';
import { Metrics } from '../themes';
import { useFocusEffect } from '@react-navigation/native';
import Request from './Requests';

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
   
    const RequestMethod=()=>{
        navigation.navigate("Request")     
    }
    const CheckHistory=()=>{
navigation.navigate('CheckHistory')
    }

    const Cancel=()=>{

    }
    const RateFeedback=()=>{
      setShowInput(true)
    }
    const PayforService=()=>{

    }
    const handleServiceSelect = (selected) => {
       if(selected.length==0){
       
       }
        setSelectedServices(selected);

        try{
            db.collection("RequestService").add({
                Service:selectedServices,
            }).then(()=>
            setDialogVisible(false),
            navigation.navigate("Locations")  )      }
        catch(error){
            console.log(error)
        }
      };
     
    return(
        
        <View style={styles.ViewContainer}>

<View style={styles.CardContainer}>
  <TouchableOpacity
      onPress={RequestMethod}
        style={[
          styles.TouchContainer2,
         
        ]}
       
       
      >
         <Text style={{ fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:100, color: 'white' ,marginBottom:2,textAlign:'center'}}>Provide Services</Text>  
      </TouchableOpacity>
      <TouchableOpacity
      onPress={Cancel}
        style={[
          styles.TouchContainer2,
         
        ]}
      >
         <Text style={{ fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:100, color: 'white' ,marginBottom:2,textAlign:'center'}} >Profile Management</Text>  
      </TouchableOpacity>
      <TouchableOpacity
      onPress={RequestMethod}
        style={[
          styles.TouchContainer2,

        ]}
      >
         <Text style={{ fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:100, color: 'white' ,marginBottom:2}}>Check for Services</Text>  
      </TouchableOpacity>
      <TouchableOpacity
      onPress={RateFeedback}
        style={[
          styles.TouchContainer2,
         
        ]}
      >
         <Text style={{ fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:100, color: 'white' ,marginBottom:2}}>Service Rating and Feedback</Text>  
      </TouchableOpacity>                
</View> 
        </View>
    )
};


const styles=StyleSheet.create({
ViewContainer:{
marginTop:Metrics.ratio(80),
flexDirection:'column',
flex:1,
},

ImageBackgroundcontainer: {
paddingTop:120,
flex: 1,
flexDirection:'column',
padding:20,
elevation:5,

},
TouchContainer2:{
  backgroundColor:'#3A0A6A',
  elevation:10,
  borderWidth:2,
  borderRadius:15,
  alignItems:'center',
  height:70,
  justifyContent:'center',
  marginTop:16,
  borderColor:'white',
}, modalContainer: {
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
MapContainer:{
    
        flex: 1,
      
        flexDirection:'column',
  width:500,
  height:400    
      },

      ImageContainer:{
        marginBottom:20,
        width:300,
        height:200,
        marginRight:20
      },


      CardContainer:{
        flex: 1, height: '100%', width: '100%', borderRadius: 10, 
        marginTop:50,
        alignItems:'center',
        justifyContent:'center'
      },
      TouchContainer:{
        backgroundColor:'#002F46',
        
        elevation:10,
        borderWidth:2,
          marginBottom:10, 
        borderRadius:15,
        alignItems:'center',
        height:70,
        justifyContent:'center',
        marginTop:16,
        borderColor:'white',
      },
});
export default HomeAdmin;