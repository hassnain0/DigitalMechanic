import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import firebase from 'firebase/compat';
import {Platform, StyleSheet} from 'react-native';
import {Colors, Metrics} from '../themes';
import MainTextInput from '../components/MainTextInput';
import {Picker} from '@react-native-picker/picker';
import Icon from '../helpers/Icons';
import NetInfo from '@react-native-community/netinfo'
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import util from '../helpers/util';
import { auth, db } from './Firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';


const SignUp=({navigation})=> {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    cnic: '', shop: '',
    name: '',
    phone: '',
   phone2:'',
    password: '',
    vehicle: '',
  });
  const [isConnected,setIsConnected]=React.useState(true)
  const [selectedValue, setSelectedValue] = React.useState('');
  const [selectedIdentity, setSelectedIdentity] = React.useState('');
  
  const [loader, setLoader] = React.useState(false);
  const _handleTextChange = (name, val) => {
    setState({
      ...state,
      [name]: val,
    });
  };

  const selectValue=(item,index)=>{
    setSelectedValue(index)
    setSelectedIdentity(item)

  }
  React.useEffect(()=>{
  
    const unsubscribe=NetInfo.addEventListener(state=>{
    setIsConnected(state.isConnected);
    })
    return ()=>{
      unsubscribe();
    }
}) 
 

  const _validation = () => {
    const {email, name, phone, phone2,cnic, shop,password, vehicle} =
      state;
    if (util.stringIsEmpty(name)) {
      util.errorMsg('Enter User Name');
      return false;
    }
    if (util.stringIsEmpty(phone)) {
      util.errorMsg('Enter Phone Number');
      return false;
    }
    if (util.stringIsEmpty(cnic)) {
        util.errorMsg('Enter CNIC No');
        return false;
      }

    if (util.stringIsEmpty(email)) {
      util.errorMsg('Enter Email');
      return false;
    }
    if (util.stringIsEmpty(password)) {
      util.errorMsg('Enter Password');
      return false;
    }
    if (util.stringIsEmpty(selectedIdentity)) {
      util.errorMsg('Select Identity');
      return false;
    }
    if (selectedValue == '2' && util.stringIsEmpty(vehicle)) {
      util.errorMsg('Enter Vehicle Details');
      return false;
    }
    if (selectedValue == '3' && util.stringIsEmpty(phone2)) {
        util.errorMsg('Enter Another Phone no');
        return false;
      }
      if (selectedValue == '3' && util.stringIsEmpty(shop)) {
        util.errorMsg('Enter Shop Details');
        return false;
      }
    return true;
  };
  const onRegister = () => {
    if (!_validation()) {
      return;
    } else{
        if(isConnected){
     createUserWithEmailAndPassword(auth,state.email,state.password).then(userCredentials=>{

        onRegisterApiCall();
         navigation.navigate("Login") 
     })
     .catch(err => {
      if (err.code === 'auth/email-already-in-use') {
        util.errorMsg("Email Already in use")
    
      }
      if (err.code === 'auth/invalid-email') {
    util.errorMsg("Invalid Email");
      }
    
      if (err.code === 'auth/email-already-in-use') {
        util.errorMsg("Email Already in use")
      }
    });}
    
    else{
      util.errorMsg("Please connect internet connection")
    }
}  
  };

  const onRegisterApiCall = async ()=> {
  
    const userEmail=firebase.auth().currentUser.email
   if(selectedIdentity=="Admin"){
    await db.collection("Registration").add({
        Name:state.name,
        PhoneNO:state.phone,
        CNIC:state.cnic,
        Identity:selectedIdentity,
    
       })
   }
   else if(selectedIdentity=="User"){
    
    await db.collection("Registration").add({
        Name:state.name,
        Email:state.email,
        PhoneNO:state.phone,
        CNIC:state.cnic,
        Identity:selectedIdentity,
        CarDetail:state.vehicle,
    
       })
   }
   else{
    await db.collection("Registration").add({
        Name:state.name,
        Email:state.email,
        PhoneNO:state.phone,
        CNIC:state.cnic,
        Identity:selectedIdentity,
        Phone2:state.phone2,
        ShopDetails:state.shop,
    
       })
   }
   resetForm();
   util.successMsg("Sucessfully Registered")
  };

  const resetForm = () => {
    setState({
        email: '',
        password: '',
        cnic: '',
        name: '',
        phone: '',
       phone2:'',
        carDetail: '',
        password: '',
        vehicle: '',
    });
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.leftIconView}
            onPress={() => console.log('navigation', navigation.goBack())}>
            <Icon.Ionicons name="arrow-back" color={Colors.white} size={28} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Register</Text>
        </View>

        <ScrollView>
          <View style={styles.registeredContainer}>
            <MainTextInput
              Icon={
                <Icon.FontAwesome5
                  name="user-circle"
                  style={styles.iconStyle}
                />
              }
              onChangeText={t => _handleTextChange('name', t)}
              value={state.name}
              label="Name"
              placeholder=""
              //   keyboardType=''
              autoCapitalize={'none'}
            />

            <MainTextInput
              Icon={<Icon.FontAwesome5 name="phone" style={styles.iconStyle} />}
              onChangeText={t => _handleTextChange('phone', t)}
              value={state.phone}
              label="Phone No"
              placeholder=""
              keyboardType="number-pad"
              autoCapitalize={'none'}
            />

             <MainTextInput
              Icon={
                <Icon.MaterialCommunityIcons
                  name="email-outline"
                  style={styles.iconStyle}
                />
              }
              onChangeText={t => _handleTextChange('cnic', t)}
              value={state.c}
              label="CNIC No"
              placeholder=""
              keyboardType={'numeric'}
              autoCapitalize={'none'}
            />
            <MainTextInput
              Icon={
                <Icon.MaterialCommunityIcons
                  name="email-outline"
                  style={styles.iconStyle}
                />
              }
              onChangeText={t => _handleTextChange('email', t)}
              value={state.email}
              label="Email"
              placeholder=""
              keyboardType={'email-address'}
              autoCapitalize={'none'}
            />
          

            <MainTextInput
              Icon={
                <Icon.MaterialCommunityIcons
                  name="lock-outline"
                  style={styles.iconStyle}
                />
              }
              secureTextEntry={true}
              onChangeText={t => _handleTextChange('password', t)}
              value={state.password}
              label="Password"
              autoCapitalize={'none'}
              rightIcon={true}
              passowrdhide={true}
            />

        
            <View style={styles.main}>
              <View style={styles.iconsRound}>
                <Icon.MaterialIcons
                  name="location-on"
                  style={styles.iconStyle}
                />
              </View>
              <View style={styles.dropDownView}>
              <Picker
        selectedValue={selectedIdentity}
        onValueChange={selectValue} // Make sure to pass the function directly
      >
        <Picker.Item label="Select Identity" value="" />
        <Picker.Item label="Admin" value="Admin" />
        <Picker.Item label="User" value="User" />
        <Picker.Item label="Mechanic" value="Mechanic" />
      </Picker>
              </View>
            </View>
            {selectedValue == '3' && (
              <MainTextInput
                Icon={
                  <Icon.MaterialIcons name="shop" style={styles.iconStyle} />
                }
                onChangeText={t => _handleTextChange('shop', t)}
                value={state.shop}
                label={"Specialities"}
                placeholder=""
                // keyboardType="name-phone-pad"
                autoCapitalize={'none'}
              />
            )}
            {selectedValue == '3' && (
              <MainTextInput
              Icon={<Icon.FontAwesome5 name="phone" style={styles.iconStyle} />}
              onChangeText={t => _handleTextChange('phone2', t)}
              value={state.phone2}
              label="Phone No"
              placeholder=""
              keyboardType="number-pad"
              autoCapitalize={'none'}
            />

            )}
            
            {selectedValue == '2' && (
              <MainTextInput
                Icon={
                  <Icon.FontAwesome5 name="car-side" style={styles.iconStyle} />
                }
                onChangeText={t => _handleTextChange('vehicle', t)}
                value={state.vehicle}
                label={"VehicleDetail"}
                placeholder=""
                // keyboardType="name-phone-pad"
                autoCapitalize={'none'}
              />
            )}

            <View style={styles.bottomContainer}>
              <View style={styles.buttonView}>
                <Button
                  loader={loader}
                  btnPress={onRegister}
                  label={"SubmitYourRequest"}
                />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.backView}>
                <Text style={styles.registerText}>
                  {"BackToLogin"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaView>
    
  );
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.background.primary,
      },
      header: {
        backgroundColor: Colors.themeColor,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: Metrics.ratio(15),
        // paddingHorizontal:Metrics.ratio(5),
      },
      leftIconView: {
        paddingHorizontal: Metrics.ratio(10),
        height: Metrics.ratio(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparent,
      },
      scrollContainer: {
        flex: 1,
        paddingHorizontal: Metrics.smallMargin,
      },
      logoView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Metrics.ratio(10),
        marginTop: Metrics.ratio(90),
        marginBottom: Metrics.ratio(60),
      },
      textHeader: {
        textAlign:'center',
        alignContent:'center',
        color: Colors.white,
        fontSize: Metrics.ratio(20),
        fontWeight: 'bold',
        paddingLeft: Metrics.ratio(20),
      },
    
      logo: {
        resizeMode: 'contain',
        width: Metrics.ratio(250),
        height: Metrics.ratio(170),
      },
      logoText: {
        color: Colors.descriptionColor,
        marginTop: Metrics.ratio(-20),
        marginBottom: Metrics.ratio(20),
      },
      forgotPassowordView: {
        alignItems: 'flex-end',
        padding: Metrics.ratio(10),
      },
      forgotPasswordText: {
        color: Colors.descriptionColor,
        textDecorationLine: 'underline',
        fontSize: Metrics.ratio(12),
      },
      buttonView: {
        height:Metrics.vh*6,
        backgroundColor:'#3A0A6A',
borderRadius:Metrics.ratio(70),
        marginTop: Metrics.ratio(70),
        width: Metrics.vw * 60,
        marginHorizontal: Metrics.vw * 20,
        justifyContent: "center",
        alignItems: "center",
      },
     
      backView: {
        
borderRadius:Metrics.ratio(30),
        marginTop: Metrics.ratio(20),
        width: Metrics.vw * 60,
        marginHorizontal: Metrics.vw * 20,
        justifyContent: "center",
        alignItems: "center",
      },
      iconStyle: {
        fontSize: Metrics.ratio(20),
        color: Colors.themeColor,
      },
      bottomContainer: {
        flex: 1,
        marginBottom: Metrics.baseMargin,
        // backgroundColor: "red",
      },
    
      genderRow: {
        flex: 1.5,
        flexDirection: 'row',
        paddingVertical: Metrics.ratio(10),
    
        paddingHorizontal: Metrics.ratio(10),
      },
      genderView: {
        borderBottomColor: Colors.borderColor,
        flex: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 50,
      },
      iconsRound: {
        width: Metrics.ratio(45),
        height: Metrics.ratio(45),
        borderRadius: Metrics.ratio(90),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.themeColor,
        backgroundColor: Colors.transparent,
      },
      genderBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Metrics.ratio(10),
        // peddingLeft: Metrics.ratio(10),
      },
      genderText: {
        paddingLeft: Metrics.ratio(5),
        paddingRight: Metrics.ratio(5),
      },
      registeredContainer: {
        marginTop: Metrics.ratio(50),
      },
      rowView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      main: {
        overflow: "hidden",
        borderRadius: Metrics.borderRadius,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        minHeight: Metrics.ratio(50),
        marginVertical: Metrics.ratio(8),
        marginHorizontal: Metrics.ratio(10),
    },
    dropDownView:{
      flex:1,
      borderBottomWidth: 1,
      borderBottomColor:Colors.borderColor
      
    }
})
export default SignUp;
