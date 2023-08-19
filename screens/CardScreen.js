// CardScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CardScreen = ({ route, navigation }) => {
  const { stackId, timePerCardInSeconds, stackCards } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timePerCardInSeconds);
  const timerRef = useRef(null);
  const cards = stackCards;
  const totalCards = cards.length;

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) );
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


  return (
    <View style={styles.container}>
           {currentIndex < totalCards ? (
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
         ) : (
          <>
          <Text style={styles.reviewStatus}>You have reviewed all cards!</Text>
          <TouchableOpacity
          onPress={() => navigation.navigate('Stack Details', { stackId: stackId})}
        >
          <Text>Start Over</Text>
        </TouchableOpacity>
        </>
      )}
       {currentIndex < totalCards && (
      <Text style={styles.timerText}>{`Time Remaining: ${timeRemaining} seconds`}</Text>
       )}
         {currentIndex < totalCards && (
      <TouchableOpacity style={styles.nextButton} onPress={handleNextCard}>
        <Text style={styles.nextButtonText}>Next Card</Text>
      </TouchableOpacity>
         )}
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
    fontSize: 20,
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
  reviewStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default CardScreen;
