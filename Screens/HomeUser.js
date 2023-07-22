import React, { useState,useEffect } from 'react'
import {Image, StyleSheet, View,Text, TouchableOpacity,Alert, ScrollView, BackHandler} from 'react-native'
import {  Metrics } from '../themes'
import CustomDialog from './CustomDialog';
import {  db } from './Firebase';
import Locations from './Locations';
import { useFocusEffect } from '@react-navigation/native';


const HomeUser=({navigation})=>{

    const [selectedServices, setSelectedServices] = useState(null);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const services = ['Oil Change', 'Brake Inspection', 'Tire Rotation', 'Wheel Alignment','Battery Check','Air Filter Replacement','Cabin Air Filter Replacement','Transmission Service','Coolant Flush','Spark Plug Replacement','Timing Belt Replacement','Suspension Inspection','Fuel System Cleaning','Exhaust System Check','Radiator Check'
    
       ]; // Add other services as needed
  
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
    const RequestMethod=()=>{
        setDialogVisible(true);     
    }
    const CheckHistory=()=>{

    }
    const Cancel=()=>{

    }
    const RateFeedback=()=>{

    }
    const PayforService=()=>{

    }
    const handleServiceSelect = (selected) => {
       if(selected.length==0){
        console.log("Hello")
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
        <ScrollView>
        <View style={styles.ViewContainer}>

<View style={styles.CardContainer}>
<CustomDialog
        visible={isDialogVisible}
        onClose={handleCloseDialog}
        services={services}
        onServiceSelect={handleServiceSelect}
      />
  <TouchableOpacity
      onPress={RequestMethod}
        style={[
          styles.TouchContainer2,
         
        ]}
       
       
      >
         <Text style={{ fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:100, color: 'white' ,marginBottom:2,textAlign:'center'}}>Request for Service</Text>  
      </TouchableOpacity>
      <TouchableOpacity
      onPress={Cancel}
        style={[
          styles.TouchContainer2,
         
        ]}
      >
         <Text style={{ fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:100, color: 'white' ,marginBottom:2,textAlign:'center'}} >  Cancel Request  </Text>  
      </TouchableOpacity>
      <TouchableOpacity
      onPress={CheckHistory}
        style={[
          styles.TouchContainer2,

        ]}
      >
         <Text style={{ fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:100, color: 'white' ,marginBottom:2}}>    CheckHistory    </Text>  
      </TouchableOpacity>
      <TouchableOpacity
      onPress={RateFeedback}
        style={[
          styles.TouchContainer2,
         
        ]}
      >
         <Text style={{ fontSize: 20, borderColor:'#002F46',alignItems: 'center',marginLeft:100,marginRight:100, color: 'white' ,marginBottom:2}}>RateandFeedback</Text>  
      </TouchableOpacity>                
</View> 

        </View>
       
        </ScrollView>
      
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

export default HomeUser;