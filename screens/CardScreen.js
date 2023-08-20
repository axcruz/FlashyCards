// CardScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CardScreen = ({ route, navigation }) => {
  const { stackId, isUntimed, timePerCardInSeconds, stackCards } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timePerCardInSeconds);
  const timerRef = useRef(null);
  const cards = stackCards;
  const totalCards = cards.length;

  const handlePreviousCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1));
    setTimeRemaining(timePerCardInSeconds);
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1));
    setTimeRemaining(timePerCardInSeconds);
  };

  useEffect(() => {
    if (!isUntimed) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, []);

  useEffect(() => {
    if (!isUntimed) {
      if (timeRemaining <= 0) {
        handleNextCard();
      }
    }
  }, [timeRemaining]);


  return (
    <View style={styles.container}>
      {currentIndex < totalCards ? (
        <>
          {!isUntimed && (
            <Text style={styles.timerText}>{`Time Remaining: ${timeRemaining} seconds`}</Text>
          )}


          <Text style={[styles.cardLabel]}>
            {showAnswer ? 'Answer' : 'Question'}
          </Text>

          <View style={{ width: '90%', height: '50%', backgroundColor: 'white', borderRadius: 10 }}>
            <ScrollView>
              <Text style={[styles.cardText]}>
                {showAnswer ? cards[currentIndex].answer : cards[currentIndex].question}
              </Text>
            </ScrollView>
          </View>

          <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 25, marginTop: 10 }}
            onPress={() => setShowAnswer(!showAnswer)}
          >
            <Text style={[styles.footerLink]}>{showAnswer ? 'Show Question' : 'Show Answer'}</Text>
          </TouchableOpacity>

<View style={{flexDirection: 'row'}}>
          {currentIndex > 0 && (
            <TouchableOpacity style={styles.nextButton} onPress={handlePreviousCard}>
              <Text style={styles.nextButtonText}>Prev</Text>
            </TouchableOpacity>
          )
          }

          <TouchableOpacity style={styles.nextButton} onPress={handleNextCard}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.reviewStatus}>You have reviewed all cards!</Text>
          <TouchableOpacity style={{margin: 5}}
            onPress={() => navigation.navigate('Stack Details', { stackId: stackId })}
          >
            <Text style={[styles.footerLink]}>Start Over</Text>
          </TouchableOpacity>
        </>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    padding: 5,
    margin: 10
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 18,
    textAlign: 'left',
    padding: 15
  },
  cardLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    alignSelf: 'center',
    margin: 5
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
  },
  nextButton: {
    margin: 10,
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16
}
});

export default CardScreen;
