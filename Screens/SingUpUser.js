import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StyleSheet} from 'react-native';
import {Colors, Metrics} from '../themes';
import MainTextInput from '../components/MainTextInput';
import Icon from '../helpers/Icons';
import NetInfo from '@react-native-community/netinfo'
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import util from '../helpers/util';
import { auth, db } from './Firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';


const SignUpUser=({navigation})=> {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    cnic: '',
     shop: '',
     address:'',
    name: '',
    phone: '',
   phone2:'',
    password: '',
  });
  const [isConnected,setIsConnected]=React.useState(true)
const [loading,setLoading]=React.useState(false);
  const _handleTextChange = (name, val) => {
    setState({
      ...state,
      [name]: val,
    });
  };

  React.useEffect(()=>{
  
    const unsubscribe=NetInfo.addEventListener(state=>{
    setIsConnected(state.isConnected);
    })
    return ()=>{
      unsubscribe();
    }
}) 
 

  const _validation = () => {
    const {email, name, phone, phone2,cnic,password, vehcile} =
      state;
    if (util.stringIsEmpty(name)) {
      util.errorMsg('Enter User Name');
      return false;
    }
    if (util.stringIsEmpty(email)) {
        util.errorMsg('Enter Email Address');
        return false;
      }
      if (util.stringIsEmpty(password)) {
        util.errorMsg('Enter Password');
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

    if (util.stringIsEmpty(vehcile)) {
        util.errorMsg('Enter Vehcile Detaisl');
        return false;
      }
    
     
    return true;
  };
  const onRegister = () => {
    setLoading(true)
    if (!_validation()) {

      setLoading(false) 
           return;

    } else{
        if(isConnected){
     createUserWithEmailAndPassword(auth,state.email,state.password).then(userCredentials=>{
        onRegisterApiCall();
      
     })
     .catch((err) => {
      console.log(err)
      if (err.code === 'auth/email-already-in-use') {
        util.errorMsg("Email Already in use")
        setLoading(false)
        return false;
        
    
      }
      if (err.code === 'auth/wrong-password') {
        util.errorMsg("Wrong Password")
        setLoading(false)
        return false;
    
      }
      if (err.code === 'auth/invalid-email') {
    util.errorMsg("Invalid Email");
    setLoading(false)
    return false;
      }
    });}
    
    else{
      util.errorMsg("Please connect internet connection");
      return false;
    }
}  
  };

  const onRegisterApiCall = async ()=> {
  
    await db.collection("Registration").add({
        Name:state.name,
        Email:state.email,
        PhoneNO:state.phone,
        CNIC:state.cnic,
        Identity:"User",
        Phone2:state.phone2,
       VehcileDetails:state.vehcile,
        // Status:"Pending",
       }).then(()=>{
        navigation.navigate("Login") 
        setLoading(false)
       }).catch((error)=>console.log(error))
  
   resetForm();
   util.successMsg("Successfully Registered")
   setLoading(false)
  };

  const resetForm = () => {
    setState({
        email: '',
        password: '',
        cnic: '',
        name: '',
        phone: '',
     vehcile:'',
             password: '',
      
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
                  <Icon.FontAwesome5 name="car-side" style={styles.iconStyle} />
                }
                onChangeText={t => _handleTextChange('vehcile', t)}
                value={state.vehcile}
                label={"Vehcile Details"}
                placeholder=""
                // keyboardType="name-phone-pad"
                autoCapitalize={'none'}
              />
            <View style={styles.bottomContainer}>
              <View style={styles.buttonView}>
                <Button
                loader={loading}
                btnPress={onRegister}
                  label={"Register"}
                />
              </View>
            </View>
          </View>
           <Toast ref={ref => Toast.setRef(ref)} />
        </ScrollView>
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
export default SignUpUser;
