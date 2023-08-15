// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Stacks')}>
        <Text>Start Flashy Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Add Stack')}>
        <Text>Add a Stack</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
