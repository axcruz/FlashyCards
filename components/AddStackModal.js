import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, ActivityIndicator, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import addStack from '../utils/addStack';
import { getThemeStyles } from '../theme';

const SettingsModal = (props) => {

    const themeStyles = getThemeStyles(props.theme);
    const [modalVisible, setModalVisible] = useState(false);
  const [stackName, setStackName] = useState('');
  const [category, setCategory] = useState('');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }
  
    // Function to add a stack to Firestore database
    const handleAddStack = async () => {
      if (!stackName.trim() || !category.trim()) {
        alert('Please fill out all fields.');
        return;
      }
      try {
        const newStackId = await addStack({
          stackName: stackName,
          category: category,
          cardCount: 0,
        });
        if (newStackId) {
            setModalVisible(false);
            setStackName('');
            setCategory('');
        } else {
          alert('An unexpected issue occurred. Please try again later.');
        }
      } catch (error) {
        // Handle error
        alert(error);
      }
    };
  
    return (
        <View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
                    <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  }}>
      <View style={{    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,}}>
        <TextInput
          placeholder="Stack Name"
          value={stackName}
          onChangeText={setStackName}
        />
        <TextInput
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={themeStyles.primaryButton} onPress={toggleModal}>
          <Text style={themeStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={themeStyles.primaryButton} onPress={handleAddStack}>
          <Text style={themeStyles.buttonText}>Add Stack</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
</Modal>
      <TouchableOpacity
      style={themeStyles.dangerButton}
      onPress={toggleModal}>
      <Text style={themeStyles.buttonText}>Add Stack Modal</Text>
    </TouchableOpacity>

    </View>
    );
};



export default SettingsModal;