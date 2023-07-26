import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView ,Image} from 'react-native';
import { Switch, Button } from 'react-native-paper';
import MainTextInput from '../components/MainTextInput';
import Icon from '../helpers/Icons';
import { Metrics } from '../themes';
import {  db } from './Firebase';
import util from '../helpers/util';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getAuth,} from 'firebase/auth';

const Settings = () => {
    const [state, setState] = React.useState({Name:'',Email: '',CNIC: '',Phone1: '',PhoneNO:'',ShopDetails:'',Address:''});
   
    const _handleTextChange = (name, val) => {
      setState((prevState) => ({
        ...prevState,
        [name]: val,
      }));
    }

    useEffect(()=>{
      const fetchData = async () => {
        
        try {
          const auth=getAuth();
          const email=auth.currentUser.email;
          
          const querySnapshot = await db
            .collection("Registration")
            .where("Identity", "==", "Mechanic").where("Email",'==',email)
            .get();
        

          if (!querySnapshot.empty) {
            // If at least one matching document is found
            const data = querySnapshot.docs.map((doc) => doc.data());
            console.log("data")
            // Assuming the data contains a single document with the relevant information
            const firstData = data[0] || {};
            console.log("firstData",firstData)
            // Populate the state with data from Firebase
            setState((prevState) => ({
              ...prevState,
        
              Email: firstData.Email || "",
              Name: firstData.Name || "",
              CNIC: firstData.CNIC || "",
              Phone1: firstData.PhoneNO || "",
              PhoneNO: firstData.Phone2 || "",
              ShopDetails:firstData.ShopDetails || "",
              Address:firstData.Address || "",
            }));
          }
        }
                catch (error) {
          console.error("Error fetching data:", error);
       
        }
      };
  
      fetchData(); // Fetch data when the component mounts
  
      return () => {
        // Clean up any listeners or subscriptions if needed
      };
    }, []);
    
    const update=()=>{
       try {
          
          db.collection("Registration")
            .where("Email", "==", state.Email)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // Use the entire state object to update the document
                db.collection("Registration")
                  .doc(doc.id)
                  .update(state)
                  .then(() => {
                  util.successMsg("Your data is successfully updated")  
                resetForm();                })
                  .catch((error) => {
                    console.error("Error updating document:", error);
                  });
              });
            })
            .catch((error) => {
              console.error("Error fetching document:", error);
            });
        } catch (error) {
          console.error("Error updating document:", error);
        }
    }
    
  const resetForm = () => {
    setState({
        Email: '',
        CNIC: '',
        Name: '',
        Phone1: '',
       PhoneNO:'',
        ShopDetails: '',
        Address: '',
    });
  };
    return (
    <ScrollView style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={require("../assets/Icon.png")} style={styles.userImage} />
                    
        
      </View>

      <View style={styles.section}>
       
        <MainTextInput
          Icon={
            <Icon.FontAwesome5
              name="user-circle"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('Name', t)}
          value={state.Name}
          label={'Name'}
          placeholder=""
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />
        <MainTextInput
          Icon={
            <Icon.MaterialCommunityIcons
              name="email-outline"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('Email', t)}
          value={state.Email}
          label={'Email'}
          placeholder=""
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />


<MainTextInput
          Icon={
            <Icon.MaterialCommunityIcons
              name="email-outline"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('CNIC', t)}
          value={state.CNIC}
          label={'CNIC'}
          placeholder=""
          keyboardType={'numeric'}
          autoCapitalize={'none'}
        />
<MainTextInput
          Icon={
            <Icon.FontAwesome5
              name="phone"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('Phone1', t)}
          value={state.Phone1}
          label={'Phone1'}
          placeholder=""
          keyboardType={'numeric'}
          autoCapitalize={'none'}
        />
        
<MainTextInput
          Icon={
            <Icon.FontAwesome5
              name="phone"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('Phone2', t)}
          value={state.PhoneNO}
          label={'Phone2'}
          placeholder=""
          keyboardType={'numeric'}
          autoCapitalize={'none'}
        />
        <MainTextInput
          Icon={
            <Icon.FontAwesome5
              name="user-circle"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('ShopDetails', t)}
          value={state.ShopDetails}
          label={'Specialities'}
          placeholder=""
          autoCapitalize={'none'}
        />
         <MainTextInput
          Icon={
            <Icon.FontAwesome5
              name="user-circle"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('Address', t)}
          value={state.Address}
          label={'Shop Address'}
          placeholder=""
          autoCapitalize={'none'}
        />
      </View>
      <TouchableOpacity style={styles.buttonView} onPress={update}>
          <Text style={{fontSize:15,color:'white'}}>Update</Text>
          </TouchableOpacity>
          <Toast ref={ref=>Toast.setref(ref)}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  userContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    backgroundColor: '#ccc',
  },
  editImageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#3498db',
    borderRadius: 20,
  },
  editImageText: {
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor:'white'
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonView: {
    backgroundColor:'#3A0A6A',
borderRadius:Metrics.ratio(70),
    marginTop: Metrics.ratio(2),
    width: Metrics.vw * 60,
    height:Metrics.vh*6,
    marginHorizontal: Metrics.vw * 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Settings;