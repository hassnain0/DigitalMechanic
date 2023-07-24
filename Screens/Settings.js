import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Switch, Button } from 'react-native-paper';
import MainTextInput from '../components/MainTextInput';
import Icon from '../helpers/Icons';

const Settings = () => {
    const [state, setState] = React.useState({email: '', password: ''});
  return (
    <ScrollView style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userImage} />
                    
        <TouchableOpacity style={styles.editImageButton}>
          <Text style={styles.editImageText}>Edit Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
       
        <MainTextInput
          Icon={
            <Icon.FontAwesome5
              name="user-circle"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('email', t)}
          value={state.email}
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
          onChangeText={t => _handleTextChange('email', t)}
          value={state.email}
          label={'Email'}
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
          label={'Password'}
          // placeholder="**********"
          autoCapitalize={'none'}
          rightIcon={true}
          passowrdhide={true}
        />

<MainTextInput
          Icon={
            <Icon.FontAwesome5
              name="card"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('email', t)}
          value={state.email}
          label={'CNIC'}
          placeholder=""
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />
<MainTextInput
          Icon={
            <Icon.FontAwesome5
              name="phone"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('email', t)}
          value={state.email}
          label={'Phone1'}
          placeholder=""
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />
        
<MainTextInput
          Icon={
            <Icon.FontAwesome5
              name="phone"
              style={styles.iconStyle}
            />
          }
          onChangeText={t => _handleTextChange('email', t)}
          value={state.email}
          label={'Phone2'}
          placeholder=""
          keyboardType={'email-address'}
          autoCapitalize={'none'}
        />
      </View>

      

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => alert('Changes saved!')}
      >
        Save Changes
      </Button>

      <Button
        mode="contained"
        style={styles.logoutButton}
        onPress={() => alert('Logged out!')}
      >
        Log Out
      </Button>
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
});

export default Settings;
