import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import HomeUser from './Screens/HomeUser';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ userName }) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeUser"
        component={HomeUser}
        
      />
     
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

