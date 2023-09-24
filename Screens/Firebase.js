import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'

import 'firebase/compat/firestore';


 const firebaseConfig = {
    apiKey: "AIzaSyD_Z6pRoJPM6hLZW7txy7VWwyG6U7Sqbb4",
    authDomain: "digitalmechanic-7dd1f.firebaseapp.com",
    projectId: "digitalmechanic-7dd1f",
    storageBucket: "digitalmechanic-7dd1f.appspot.com",
    messagingSenderId: "313705821946",
    appId: "1:313705821946:web:b7ad62c52596cb2c587b43",
    measurementId: "G-0HJ25PQQT3"

};

 const app=initializeApp(firebaseConfig)
    firebase.initializeApp(firebaseConfig)
   
   const db=firebase.firestore()

   const auth=getAuth(app);

   export  {db,auth,firebaseConfig};   