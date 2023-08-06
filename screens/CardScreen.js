// CardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { flashcards } from '../cards';

const CardScreen = ({ route }) => {
  const { stackIndex } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentStack = flashcards[stackIndex];
  const cards = currentStack?.cards || [];

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  useEffect(() => {
    console.log('Stack Index:', stackIndex);
    console.log('Current Stack:', currentStack);
    console.log('Cards:', cards);
  }, [stackIndex, currentStack, cards]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => setShowAnswer(!showAnswer)}
      >
        <View style={[styles.card, showAnswer ? styles.flippedCard : null]}>
          <Text style={[styles.cardText, styles.frontText, showAnswer ? styles.hidden : null]}>
            {cards[currentIndex].question}
          </Text>
          <Text style={[styles.cardText, styles.backText, showAnswer ? null : styles.hidden]}>
            {cards[currentIndex].answer}
          </Text>
        </View>
      </TouchableOpacity>
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
    aspectRatio: 1.5, // Set aspect ratio to create a rectangular container for the card
    perspective: 1000, // Added perspective to create 3D effect
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
    transform: [{ rotateY: '180deg' }], // Rotate the card to show the back side
  },
  cardText: {
    fontSize: 18,
    textAlign: 'center',
    position: 'absolute', // Position the text to be centered on the card
    width: '100%',
  },
  frontText: {
    zIndex: 2, // Ensure the front text is above the back text
  },
  backText: {
    transform: [{ rotateY: '180deg' }], // Rotate the back text to appear correctly
  },
  hidden: {
    opacity: 0, // Hide the text when the card is flipped
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
