// HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate('StackScreen')}>
        <Text>Start Flashy Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddStackScreen')}>
        <Text>Add Cards</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
