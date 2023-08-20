// StackDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Switch } from 'react-native';
import getStack from '../utils/getStack';


const StackDetailScreen = ({ route, navigation }) => {
  const { stackId } = route.params;
  const [timePerCardInSeconds, setTimePerCardInSeconds] = useState('60');
  const [randomOrder, setRandomOrder] = useState(false);
  const [untimed, setUntimed] = useState(false);
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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  const toggleUntimed = () => {
    setUntimed(!untimed);
  };

  const toggleRandomOrder = () => {
    setRandomOrder(!randomOrder);
    if (randomOrder) {
      setCards(shuffleArray(cards));
    } else {

    }
  };

  const handleStartFlashcards = () => {
    const timeInSeconds = parseInt(timePerCardInSeconds, 10);
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
      return; // Ignore invalid or zero time
    }
    navigation.navigate('Cards', { stackId, isUntimed: untimed, timePerCardInSeconds: timeInSeconds, stackCards: cards });
  };

  const handleManageFlashCards = () => {
    navigation.navigate('Manage Cards', { stackId });
  };

  return (
    <>
      {stack ?
        <View style={styles.container}>
          <Text style={styles.pageTitle}>{stack.stackName}</Text>
          <Text style={styles.pageSubtitle}>{stack.category}</Text>

          <View style={styles.option}>
            <Text>Untimed</Text>
            <Switch
              style={{ margin: 5 }}
              trackColor={{ false: '#767577', true: '#788eec' }}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleUntimed}
              value={untimed}
            />
          </View>

          <View style={styles.option}>
            <Text>Time Per Card (seconds):</Text>
            <TextInput
              style={[
                styles.configInput,
                untimed ? styles.disabledInput : null, // Apply disabled style if untimed is true
              ]}
              value={timePerCardInSeconds}
              onChangeText={setTimePerCardInSeconds}
              keyboardType="numeric"
              placeholder="Enter time per card"
              editable={!untimed} // Disable the input when untimed is true
            />
          </View>
          <View style={styles.option}>
            <Text>Randomize</Text>
            <Switch
              style={{ margin: 5 }}
              trackColor={{ false: '#767577', true: '#788eec' }}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleRandomOrder}
              value={randomOrder}
            />
          </View>

          <TouchableOpacity style={styles.startButton} onPress={handleStartFlashcards}>
            <Text style={styles.startButtonText}>Start Flashcards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.manageButton} onPress={handleManageFlashCards}>
            <Text style={styles.manageButtonText}>Manage Flashcards</Text>
          </TouchableOpacity>
        </View>
        : (
          <View style={[styles.container, { alignItems: 'center' }]}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        )}
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pageSubtitle: {
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 20,
  },
  configLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  configInput: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
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
    fontWeight: 'bold',
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
    fontWeight: 'bold'
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 2,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0', // Use a light gray color
    borderColor: '#ccc', // Use a light gray border color
    color: '#888', // Use a gray text color
  }

});

export default StackDetailScreen;
