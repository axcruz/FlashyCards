// StackDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import getStack from '../firebase/util/getStack';


const StackDetailScreen = ({ route, navigation }) => {
  const { stackId } = route.params;
  const [timePerCardInSeconds, setTimePerCardInSeconds] = useState('60');
  const [stack, setStack] = useState();
  const [cards, setCards] = useState();

  useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await getStack(stackId);
          setStack(result.stackData);
          setCards(result.cardsData);
        } catch (error) {
          // Handle error
        }
      };
      fetchData();
    }, [stackId]);

  const handleStartFlashcards = () => {
    const timeInSeconds = parseInt(timePerCardInSeconds, 10);
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
      return; // Ignore invalid or zero time
    }

    navigation.navigate('Cards', { stackId, timePerCardInSeconds: timeInSeconds, stackCards: cards });
  };

  const handleManageFlashCards = () => {
    navigation.navigate('Manage Cards', { stackId });
  };

  return (
    <View style={styles.container}>
    { stack ? 
<>
<Text>{stack.stackName}</Text>
<Text style={styles.labe}>Time Per Card (seconds):</Text>
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
<TouchableOpacity style={styles.manageButton} onPress={handleManageFlashCards}>
  <Text style={styles.startButtonText}>Manage Flashcards</Text>
</TouchableOpacity>
</>
      : (
        <Text>Loading...</Text>
  )    }
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
  manageButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#788eec',
  },
  manageButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default StackDetailScreen;
