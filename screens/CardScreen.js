// CardScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ProgressBarAndroid } from 'react-native';
import { flashcards } from '../cards';

const CardScreen = ({ route, navigation }) => {
  const { stackId, timePerCardInSeconds } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timePerCardInSeconds);
  const timerRef = useRef(null);

  const currentStack = flashcards.find((stack) => stack.id === stackId);
  const cards = currentStack?.cards || [];

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setTimeRemaining(timePerCardInSeconds);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleNextCard();
    }
  }, [timeRemaining]);

  const calculateProgress = () => {
    return timeRemaining / timePerCardInSeconds;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => setShowAnswer(!showAnswer)}
      >
        <View style={[styles.card]}>
          <Text style={[styles.cardLabel]}>
            {showAnswer ? 'Answer' : 'Question'}
          </Text>
          <Text style={[styles.cardText]}>
            {showAnswer ? cards[currentIndex].answer : cards[currentIndex].question}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.timerText}>{`Time Remaining: ${timeRemaining} seconds`}</Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleNextCard}>
        <Text style={styles.nextButtonText}>Next Card</Text>
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
  cardContainer: {
    width: '80%',
    aspectRatio: 1.5,
    perspective: 1000,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    elevation: 5,
  },
  flippedCard: {
    transform: [{ rotateY: '180deg' }],
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  },
//   questionLabel: {
//     transform: [{ rotateY: '180deg' }],
//   },
  answerLabel: {},
  frontText: {
    zIndex: 2,
  },
  backText: {
    transform: [{ rotateY: '180deg' }],
  },
  hidden: {
    opacity: 0,
  },
  progressBar: {
    height: 20,
    marginVertical: 10,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  nextButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  nextButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default CardScreen;
