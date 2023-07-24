import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeUser from './Screens/HomeUser';
import HomeAdmin from './Screens/HomeAdmin';
import HomeMechanic from './Screens/HomeMechanic';
import Login from './Screens/Login'
import SignUp from './Screens/SignUp'
import SplashScreen from './Screens/SplashScreen'
import ForgotScreen from './Screens/ForgotScreen'
import DrawerNavigator from './DrawerNavigator';
import Locations from './Screens/Locations';
import CheckHistory from './Screens/CheckHistory';
import Request from './Screens/Requests';
import Rating from './Screens/Rating';
import Settings from './Screens/Settings';

const Stack=createNativeStackNavigator();

export default function App() {
 return (
   
    <NavigationContainer>
       
    <Stack.Navigator >
 <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown:false,statusBarColor:'#3A0A6A'}}/>
    <Stack.Screen name='HomeUser' component={HomeUser} options={( ) => ({headerBackVisible:false, headerTitleAlign: 'center', title:'Digital  Mechanic App',headerTitleAlign:'center',statusBarColor:'#3A0A6A',headerTintColor:'white',headerStyle: {
          backgroundColor: '#3A0A6A', // Set your desired header color
        }, headerTitleContainerStyle: {
            top: 800, // Adjust the top position to move the header title downward
          }, headerTitleStyle: {
            fontWeight: '600',fontSize:20 ,// Optionally customize the header title's style
          },
      })}/>
          <Stack.Screen name='HomeAdmin' component={HomeAdmin} options={( ) => ({headerBackVisible:false,title:'Home',headerTitleAlign:'center',statusBarColor:'#3A0A6A'
           
      })}/>
      <Stack.Screen name='HomeMechanic' component={HomeMechanic} options={( ) => ({headerTintColor:'white',headerBackVisible:false,title:'Digital Mechanic App',headerTitleAlign:'center',statusBarColor:'#3A0A6A',headerStyle: {
        backgroundColor: '#3A0A6A', // Set your desired header color
      }, headerTitleContainerStyle: {
          top: 800, // Adjust the top position to move the header title downward
        }, headerTitleStyle: {
          
          fontWeight: '600',fontSize:20 ,// Optionally customize the header title's style
        },           
})}/> 
<Stack.Screen name='Request' component={Request} options={( ) => ({headerTintColor:'black',title:'List Request',headerTitleAlign:'center',statusBarColor:'#3A0A6A',
})}/> 
<Stack.Screen name='Rating' component={Rating} options={( ) => ({headerTintColor:'black',title:'Rating List',headerTitleAlign:'center',statusBarColor:'#3A0A6A',
})}/> 
<Stack.Screen name='Locations' component={Locations} options={() => ({title:'Nearby Locations',headerTitleAlign:'center',statusBarColor:'#3A0A6A',headerStyle: {
          backgroundColor: '#3A0A6A', // Set your desired header color
        },
        headerTintColor:'white'
           
      })}/>
      <Stack.Screen name='Settings' component={Settings} options={() => ({title:'Profile Management',headerTitleAlign:'center',statusBarColor:'#3A0A6A',headerStyle: {
          backgroundColor: '#3A0A6A', // Set your desired header color
        },
        headerTintColor:'white'
           
      })}/> 
      <Stack.Screen name='CheckHistory' component={CheckHistory} options={() => ({title:'Check History',headerTitleAlign:'center',statusBarColor:'#3A0A6A',headerStyle: {
          backgroundColor: '#3A0A6A', // Set your desired header color
        },
        headerTintColor:'white'
           
      })}/> 
    <Stack.Screen name='Login' component={Login} options={{headerShown:false,statusBarColor:'#3A0A6A'}}/>
    <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false,statusBarColor:'#3A0A6A', headerTransparent: true,title:'',
           headerTintColor: 'white',}}
          />
           <Stack.Screen name='ForgotScreen' component={ForgotScreen} options={{statusBarColor:'#49B3AA', headerTransparent: true,title:'',
          headerTintColor: 'white',}}
          />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

