// ManageCardsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebase/config';

import addCardToStack from '../firebase/util/addCardToStack';
import getStack from '../firebase/util/getStack';

const ManageCardsScreen = ({ route, navigation }) => {
  const { stackId } = route.params;
  const [stack, setStack] = useState([]);
  const [cards, setCards] = useState([]);

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
  }, [stackId, cards]);


  // Function to handle card editing
  const handleEditCard = (cardId) => {
    // Navigate to card editing screen, passing cardId
  };

  // Function to handle card deletion
  const handleDeleteCard = async (cardId) => {
    try {
      await db
        .collection('stacks')
        .doc(stackId)
        .collection('cards')
        .doc(cardId)
        .delete();
      console.log('Card deleted successfully');
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  // Function to add a new card
  const handleAddCard = async () => {
    try {
      const newCardData = {
        question: 'New Question 3',
        answer: 'New Answer 3',
      };
      await addCardToStack(stackId, newCardData);
    } catch (error) {
      console.error('Error adding new card:', error);
    }
  };

  return (
    <View style={styles.container}>
      {cards ? (
        <>
          <FlatList
            data={cards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardItem}>
                <Text>{item.question}</Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditCard(item.id)}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteCard(item.id)}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
            <Text>Add Card</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator size="large" color="#007AFF" />
      )

      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  editButton: {
    marginLeft: 'auto',
    marginRight: 10,
    padding: 5,
    backgroundColor: 'lightblue',
  },
  deleteButton: {
    padding: 5,
    backgroundColor: 'lightcoral',
  },
  addButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightgreen',
  },
});

export default ManageCardsScreen;
