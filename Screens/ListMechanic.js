import React, { useEffect, useState } from 'react';
import {Alert, View, Text, FlatList, TouchableOpacity,TextInput ,Image} from 'react-native';
import { db, } from './Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import util from '../helpers/util';

export default function ListMechanic({ navigation }) {
  const [mechanics, setMechanics] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleteCount, setDeleteCount] = useState(0); // new state variable to keep track of the number of times user has been deleted
  
  useEffect(() => {
   
    const collectionRef = db.collection('Registration').where('Status', '==', 'Pending').where('Identity','==','Mechanic');
   
    collectionRef.get().then((querySnapshot) => {
      const documents = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        documents.push({ ...data, id: doc.id });
      });
      console.log(documents)
      setMechanics(documents)}).catch((error) => {
      console.log('Error getting Mechanic:', error);
    })
   
  }, [deleteCount]);

  const handleSearch = (text) => {
    setSearchText(text);
  };
 
  const filteredEngineers = mechanics.filter(
    (mechanic) =>
      mechanic.Name.toLowerCase().includes(searchText.toLowerCase())
  );
 
  const handleAble = (mechanic) => {
    
    const documentRef = db.collection('Registration').doc(mechanic.id);
    documentRef.update({
      Status:'Enabled',
    })
    .then(() => {
  
    util.successMsg("Mechanic Sucessfully Registered")
          setDeleteCount((prev) => prev + 1); 
    })
    .catch((error) => {
      console.error('Error updating mechanic:', error);
    });
  };
  const handleConfirm=(item)=>{
    Alert.alert(
      'Delete User',
      'Are you sure you want  to delete user?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () =>handleDelete(item)
        }
      ],
      { cancelable: false,
        titleStyle: { color: 'red' },
        messageStyle: { color: 'blue' }, }
    );
    return true;
  }
  const handleDelete = (mechanic) => {
    console.log(mechanic.email);
  
    const documentRef = db.collection('Registration').doc(mechanic.id);
    documentRef.delete().then(() => {
  
    util.successMsg("Mechanic Sucessfully Deleted")
          setDeleteCount((prev) => prev + 1); 
    })
    .catch((error) => {
      console.error('Error updating mechanic:', error);
    });

};
 
  const renderItem = ({ item }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
    
      <View style={{ flex: 1 , flexDirection:'row'}}>
    
   <Image source={require('../assets/User.png')} style={{width:50,height:50}}></Image>
          <Text style={{ fontWeight: 'bold', fontSize: 16,marginTop:20 }}>      {item.Name}</Text>

      </View>
    
      <TouchableOpacity style={{ padding: 8,paddingTop:20 }} onPress={() => handleAble(item)}>
        <Text style={{ color: 'green' ,fontSize:17}}>Enable</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 8,paddingTop:20 }} onPress={() => handleConfirm(item)}>
        <Text style={{ color: 'red' ,fontSize:17}}>Decline</Text>
      </TouchableOpacity>
     
  
    </View>
  );

  return ( 
    <View>
  <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 8,
          backgroundColor: '#fff',
          borderRadius: 8,
          margin: 16,
        }}
      >
        <Icon name="search" size={25} color="#ccc" style={{ padding: 8 }} />
        <TextInput
          style={{ flex: 1, height: 40, padding: 6 }}
          placeholder="            Search user by name"
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
    <FlatList
      data={filteredEngineers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  </View>
  );
}
