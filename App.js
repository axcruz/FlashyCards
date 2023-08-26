// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
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
import AddStackScreen from './screens/AddStackScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ManageCardsScreen from './screens/ManageCardsScreen';

import UserModal from './components/UserModal';

const Stack = createStackNavigator();

const App = ({theme}) => {

  const [scheme, setScheme] = useState(useColorScheme());

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
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen name="Stacks" component={StackListScreen} initialParams={{ theme : scheme }}
            options={{
              headerRight: () => (<UserModal user={user} />),
            }} />
          <Stack.Screen name="Stack Details" component={StackDetailScreen} initialParams={{ theme }} options={{ title: 'Details' }} />
          <Stack.Screen name="Add Stack" component={AddStackScreen} initialParams={{ theme }} />
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
  );
};

export default App;
