// StackScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { flashcards } from '../cards';

const StackScreen = ({ navigation }) => {
  const renderStack = ({ item, index }) => { // Add index to the function parameters
    return (
      <TouchableOpacity onPress={() => navigation.navigate('CardScreen', { stackIndex: index })}>
        <Text style={{ fontSize: 18, paddingVertical: 10 }}>{item.stackName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Flashcard Stacks</Text>
      <FlatList
        data={flashcards}
        renderItem={renderStack}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default StackScreen;
