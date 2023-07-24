import React ,{useEffect} from 'react';
import {StyleSheet,ImageBackground} from 'react-native';
import Login from './Login';

const  SplashScreen = ({navigation}) => {

  useEffect(() => {
   setTimeout(() => {
      navigation.navigate('Login');
    },3000 );

    return () => {
    };
  }, []);
  return (
    <ImageBackground  style={styles.image} source={require("../assets/Final.jpeg")}></ImageBackground>
  );
};
const styles = StyleSheet.create({

  image: {
    width: 390,
    height:800,
  },
});

export default SplashScreen;
