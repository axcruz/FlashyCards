// App.js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CardScreen from './screens/CardScreen';
import StackScreen from './screens/StackScreen';
import ConfigScreen from './screens/ConfigScreen';
// import AddStackScreen from './screens/AddStackScreen';

import * as firebase from 'firebase/app';
import 'firebase/database'; // Import the specific service you want to use (e.g., database)

const firebaseConfig =  {
  apiKey: "AIzaSyCbk13FSTXWtcH4gFUH3ciRTLGPnpArj50",
  authDomain: "flashycards-fa22f.firebaseapp.com",
  projectId: "flashycards-fa22f",
  storageBucket: "flashycards-fa22f.appspot.com",
  messagingSenderId: "598528385258",
  appId: "1:598528385258:web:ce9e6fc65c433020e43793",
  measurementId: "G-KB529PP80Q"
};

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StackScreen" component={StackScreen} /> 
        <Stack.Screen name="ConfigScreen" component={ConfigScreen} />
        <Stack.Screen name="CardScreen" component={CardScreen} />
        {/* <Stack.Screen name="AddStackScreen" component={AddStackScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
