// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState }  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();

const App = () => {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="StackScreen" component={StackScreen} />
            <Stack.Screen name="ConfigScreen" component={ConfigScreen} />
            <Stack.Screen name="CardScreen" component={CardScreen} />
            <Stack.Screen name="AddStackScreen" component={AddStackScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
