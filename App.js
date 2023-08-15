// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

import HomeScreen from './screens/HomeScreen';
import CardScreen from './screens/CardScreen';
import StackScreen from './screens/StackScreen';
import ConfigScreen from './screens/ConfigScreen';
import AddStackScreen from './screens/AddStackScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

import { db, auth } from './firebase/config';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(auth.currentUser);
    if (initializing) setInitializing(false);
  })
}, []);

if (initializing) return null;

function SignOut() {
  auth.signOut();
}

function CardStack() {
  return(
  <Stack.Navigator>
  <Stack.Screen name="Stacks" component={StackScreen} />
  <Stack.Screen name="Stack Settings" component={ConfigScreen} />
  <Stack.Screen name="Cards" component={CardScreen} />
  <Stack.Screen name="Add Stack" component={AddStackScreen} />
  </Stack.Navigator>
  );
}

  return (
    <NavigationContainer>

{ user ? (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Flash Cards" component={CardStack} />
          <Tab.Screen name="Logout" component={SignOut} />
        </Tab.Navigator>
) : (
  <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen}  options={{animationTypeForReplace: user ? 'pop' : 'push',}} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          </Stack.Navigator>
)
}

    </NavigationContainer>
  );
};

export default App;
