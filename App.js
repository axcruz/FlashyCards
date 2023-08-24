// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen name="Stacks" component={StackListScreen} options={{
            headerRight: () => (
              <UserModal user={user} />
            ),
          }} />
          <Stack.Screen name="Stack Details" component={StackDetailScreen} options={{ title: 'Details' }} />
          <Stack.Screen name="Add Stack" component={AddStackScreen} />
          <Stack.Screen name="Manage Cards" component={ManageCardsScreen} />
          <Stack.Screen name="Cards" component={CardScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Log in" component={LoginScreen} options={{ animationTypeForReplace: user ? 'pop' : 'push', }} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
      )
      }
    </NavigationContainer>
  );
};

export default App;
