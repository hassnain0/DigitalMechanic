import React ,{useEffect} from 'react';
import {Image,StyleSheet, View ,Text} from 'react-native';
import Login from './Login';
import AnimatedLottieView from 'lottie-react-native';

const  SplashScreen = ({ navigation }) => {

  useEffect(() => {
   setTimeout(() => {
      navigation.navigate('Login');
    },3000 );

    return () => {
    };
  }, []);
  return (
    <View style={styles.container}>
  <View style={{alignSelf:'center',alignContent:'center',paddingBottom:1}}>
        <AnimatedLottieView source={require('../assets/animation.json')} autoSize={true} autoPlay={true} style={styles.image} />
<Text style={{textAlign:'right',fontSize:30}}>Your Road Our Expertise</Text>

        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 300,
  },
});

export default SplashScreen;
