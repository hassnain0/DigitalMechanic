import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native'; // You can import necessary components here
import HomeUser from './Screens/HomeUser';
import HomeAdmin from './Screens/HomeAdmin';
import HomeMechanic from './Screens/HomeMechanic';
import { auth } from './Screens/Firebase';
import util from './helpers/util';
import Login from './Screens/Login';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {

  const handleLogout = () => {
   auth.signOut().then(()=>{

    util.successMsg("Sucessfully Logout")
    navigation.navigate('Login');
   })
      };

 
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeUser" component={HomeUser} />
      <Drawer.Screen name="HomeAdmin" component={HomeAdmin} />
      <Drawer.Screen name="HomeMechanic" component={HomeMechanic} />
   
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  logoutButton: {
    backgroundColor: '#3A0A6A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default DrawerNavigator;