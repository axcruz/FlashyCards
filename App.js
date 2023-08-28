// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext, createContext} from 'react';
import { View, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  NavigationContainer, DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { decode, encode } from 'base-64';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }
import { auth } from './firebase/config';

import CardScreen from './screens/CardScreen';
import StackListScreen from './screens/StackListScreen';
import StackDetailScreen from './screens/StackDetailScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ManageCardsScreen from './screens/ManageCardsScreen';


const Stack = createStackNavigator();

const App = () => {

  const [initializing, setInitializing] = useState(true);

  const [theme, setTheme] = useState(useColorScheme());
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged(() => {
      setCurrentUser(auth.currentUser);
      if (initializing) setInitializing(false);
    })
  }, []);

  if (initializing) return null;

  return (
      <View style={{ flex: 1 }}>
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
          {currentUser ? (
            <Stack.Navigator screenOptions={{
              headerBackTitleVisible: false,
            }} >
              <Stack.Screen name="Stacks" component={StackListScreen} options={{ title: 'My Stacks'}} />
              <Stack.Screen name="Stack Details" component={StackDetailScreen} options={{ title: 'Details', }} />
              <Stack.Screen name="Manage Cards" component={ManageCardsScreen} />
              <Stack.Screen name="Cards" component={CardScreen} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="Log in" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
            </Stack.Navigator>
          )
          }
        </NavigationContainer>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      </View>
  );
};

export default App;
