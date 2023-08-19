// AddStackScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import addStack from '../firebase/util/addStack';

const AddStackScreen = ({ route, navigation }) => {
    const [stackName, setStackName] = useState('');
    const [category, setCategory] = useState('');
  
    // Function to add the stack and card data to Firestore
    const handleAddStack = async () => {
      // Validate inputs (you can add more validation logic as needed)
      if (!stackName.trim() || !category.trim()) {
        alert('Please fill all fields.');
        return;
      }
      try {
        const newStackId = await addStack({
          stackName: stackName,
          category: category,
          cardCount: 0,
          // Add any other stack properties here
        });

        if (newStackId) {
        navigation.navigate('Manage Cards', { stackId: newStackId });
        } else {
          console.error('Error unable to navigate to Manage Cards screen.');
          alert('An unexpected error occurred.');
        }
      } catch (error) {
        // Handle error
        console.error(error);
        alert(error);
      }
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddStack}>
          <Text style={styles.addButtonText}>Add Stack</Text>
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
  