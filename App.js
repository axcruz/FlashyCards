// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme,
  DarkTheme, } from '@react-navigation/native';
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

import SettingsModal from './components/SettingsModal';

const Stack = createStackNavigator();

const App = ({theme}) => {

  //const [scheme, setScheme] = useState(useColorScheme());
  const [scheme, setScheme] = useState('dark');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(auth.currentUser);
      if (initializing) setInitializing(false);
    })
  }, []);

  if (initializing) return null;

  return (
    <View style={{ flex: 1 }}>
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user ? (
        <Stack.Navigator screenOptions={{
          headerRight: () => (<SettingsModal user={user} theme={scheme} themeHandler={(newTheme) => 
            setScheme(newTheme)
          } />),
        }}>
          <Stack.Screen name="Stacks" component={StackListScreen} initialParams={{ theme : scheme }}/>
          <Stack.Screen name="Stack Details" component={StackDetailScreen} initialParams={{ theme }} options={{ title: 'Details', }} />
          <Stack.Screen name="Manage Cards" component={ManageCardsScreen} initialParams={{ theme }} />
          <Stack.Screen name="Cards" component={CardScreen} initialParams={{ theme }}/>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Log in" component={LoginScreen} options={{ animationTypeForReplace: user ? 'pop' : 'push', }} initialParams={{ theme }}/>
          <Stack.Screen name="Registration" component={RegistrationScreen} initialParams={{ theme }}/>
        </Stack.Navigator>
      )
      }
    </NavigationContainer>
    <StatusBar style="light" />
    </View>
   
  );
};

export default App;
