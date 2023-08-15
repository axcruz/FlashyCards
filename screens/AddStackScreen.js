// AddStackScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddStackScreen = () => {
    const [stackName, setStackName] = useState('');
    const [category, setCategory] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
  
    // Function to add the stack and card data to Firestore
    const handleAddStack = () => {
      // Validate inputs (you can add more validation logic as needed)
      if (!stackName.trim() || !category.trim() || !question.trim() || !answer.trim()) {
        alert('Please fill all fields.');
        return;
      }
  
      // Add the stack to Firestore
      firestore()
        .collection('stacks')
        .add({
          stackName,
          category,
          cards: [{ question, answer }],
        })
        .then(() => {
          alert('Stack and card added successfully!');
          setStackName('');
          setCategory('');
          setQuestion('');
          setAnswer('');
        })
        .catch((error) => {
          console.error('Error adding stack:', error);
          alert('An error occurred. Please try again.');
        });
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Stack Name"
          value={stackName}
          onChangeText={setStackName}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Question"
          value={question}
          onChangeText={setQuestion}
        />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          value={answer}
          onChangeText={setAnswer}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddStack}>
          <Text style={styles.addButtonText}>Add Stack and Card</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 15,
      marginBottom: 10,
      backgroundColor: 'white',
    },
    addButton: {
      // backgroundColor: '#4CAF50',
       padding: 10,
      // borderRadius: 5,
      backgroundColor: '#788eec',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      height: 48,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center'
    },
    addButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  export default AddStackScreen;
  