// App.js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CardScreen from './screens/CardScreen';
import StackScreen from './screens/StackScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StackScreen" component={StackScreen} /> 
        <Stack.Screen name="CardScreen" component={CardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
