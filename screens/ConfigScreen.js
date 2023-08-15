// ConfigScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ConfigScreen = ({ route, navigation }) => {
  const { stackId } = route.params;
  const [timePerCardInSeconds, setTimePerCardInSeconds] = useState('60');

  const handleStartFlashcards = () => {
    const timeInSeconds = parseInt(timePerCardInSeconds, 10);
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
      return; // Ignore invalid or zero time
    }

    navigation.navigate('Cards', { stackId, timePerCardInSeconds: timeInSeconds });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Time Per Card (seconds):</Text>
      <TextInput
        style={styles.configInput}
        value={timePerCardInSeconds}
        onChangeText={setTimePerCardInSeconds}
        keyboardType="numeric"
        placeholder="Enter time per card"
      />

      <TouchableOpacity style={styles.startButton} onPress={handleStartFlashcards}>
        <Text style={styles.startButtonText}>Start Flashcards</Text>
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
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  configLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  configInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  startButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  startButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default ConfigScreen;
