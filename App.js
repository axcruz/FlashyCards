// App.js
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Button, LogoTitle } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { decode, encode } from 'base-64';
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }
import { auth } from './firebase/config';

import HomeScreen from './screens/HomeScreen';
import CardScreen from './screens/CardScreen';
import StackListScreen from './screens/StackListScreen';
import StackDetailScreen from './screens/StackDetailScreen';
import AddStackScreen from './screens/AddStackScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ManageCardsScreen from './screens/ManageCardsScreen';

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
  <Stack.Screen name="Stacks" component={StackListScreen} options={{
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Profile"
              color="#000"
            />
          ),
        }}/>
  <Stack.Screen name="Stack Details" component={StackDetailScreen} />
  <Stack.Screen name="Add Stack" component={AddStackScreen} />
  <Stack.Screen name="Manage Cards" component={ManageCardsScreen}/>
  <Stack.Screen name="Cards" component={CardScreen} />
  </Stack.Navigator>
  );
}

  return (
    <NavigationContainer>

{ user ? (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Cards Stacks" component={CardStack} />

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
