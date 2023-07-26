import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { db } from './Firebase';
import util from '../helpers/util';

const CustomDialog = ({ visible, onClose, services, onServiceSelect }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((item) => item !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleApply = () => {
  
    onServiceSelect(selectedServices);
    
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1} // Prevent other touch events while the modal is open
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onPress={onClose} // Close the modal when clicking outside
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 16,
            width: '80%',
            maxHeight: '80%',
          }}
        >
          {services.map((service) => (
            <View key={service} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                status={selectedServices.includes(service) ? 'checked' : 'unchecked'}
                onPress={() => toggleService(service)}
              />
              <Text>{service}</Text>
            </View>
          ))}

          <TouchableOpacity onPress={handleApply}>
            <Text style={{ color: 'blue', textAlign: 'center' }}>Send Request</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomDialog;
