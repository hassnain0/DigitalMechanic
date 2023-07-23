import React, { useState,useEffect } from 'react'
import {Image,TextInput, StyleSheet, View,Text, TouchableOpacity,Alert, ScrollView, BackHandler,Modal} from 'react-native'
import {  Metrics } from '../themes'
import CustomDialog from './CustomDialog';
import {  db } from './Firebase';
import Locations from './Locations';
import { useFocusEffect } from '@react-navigation/native';


const HomeUser=({navigation})=>{

    const [selectedServices, setSelectedServices] = useState(null);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const services = ['Oil Change', 'Brake Inspection', 'Flat tyre', 'Wheel Alignment','Battery Check','Air Filter Replacement','Cabin Air Filter Replacement','Transmission Service','Coolant Flush','Spark Plug Replacement','Timing Belt Replacement','Suspension Inspection','Fuel System Cleaning','Exhaust System Check','Radiator Check'
    
       ]; // Add other services as needed
 
       const [inputText, setInputText] = useState();

       const [showInput,setShowInput]=useState(false); 
       
       const handleCancel = () => {
        setShowInput(false)
       }
      

       const handleConfirm=async()=>{
            await db.collection("Feedback").add({
              Email:"Hassnain",
              Feedback:inputText,
            })
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
    const RequestMethod=()=>{
        setDialogVisible(true);     
    }
    const CheckHistory=()=>{
navigation.navigate('CheckHistory')
    }

    const Cancel=()=>{

    }
    const RateFeedback=()=>{
      setShowInput(true)
    }
    
    const handleServiceSelect = (selected) => {
       if(selected.length==0){
       
       }
        setSelectedServices(selected);

        try{
            db.collection("RequestService").add({
                Service:selectedServices,
                Status:"Pending",
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
      input: {
        color: 'grey',
        height: 30,
        width: 200,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 5,
        textAlign: 'center',
      },
});

export default HomeUser;