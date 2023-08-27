import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, TextInput, Modal, ScrollView } from 'react-native';
import { getThemeStyles } from '../theme';
import getStack from '../utils/getStack';
import addCard from '../utils/addCard';
import updateCard from '../utils/updateCard';
import deleteCard from '../utils/deleteCard';

const ManageCardsScreen = ({ route, navigation }) => {
  const { stackId, theme } = route.params;
  // Get theme styling
  const themeStyles = getThemeStyles(theme);
  const [cards, setCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false); // State to control the modal
  const [isEditingCard, setIsEditingCard] = useState(false); // State to control the modal
  const [cardId, setCardId] = useState('');
  const [question, setQuestion] = useState(''); // State to store the question input
  const [answer, setAnswer] = useState(''); // State to store the answer input

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStack(stackId);
        setCards(result.cardsData);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [stackId, cards]);

  const handleCancelModal = () => {
    setIsAddingCard(false); // Hide the modal after adding the card
    setIsEditingCard(false); // Hide the modal after adding the card
    setIsProcessing(false);
    setCardId('');
    setQuestion(''); // Clear the input fields
    setAnswer('');
  }

  const handleEditCard = (cardId, cardQuestion, cardAnswer) => {
    // Navigate to card editing screen, passing cardId
    setIsEditingCard(true);
    setCardId(cardId);
    setQuestion(cardQuestion);
    setAnswer(cardAnswer);
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCard(stackId, cardId);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleAddCard = async () => {
    setIsAddingCard(true); // Show the modal
  };

  const handleSaveCard = async () => {
    setIsProcessing(true);
    // You can add validation here if needed
    if (question.trim() === '' || answer.trim() === '') {
      alert('Please enter both a question and an answer.');
      return;
    }

    // Create a new card with the entered question and answer
    const newCardData = {
      question: question,
      answer: answer,
    };

    try {
      if (isAddingCard) {
        await addCard(stackId, newCardData);
      } else if (isEditingCard) {
        await updateCard(stackId, cardId, newCardData);
      }
      setIsAddingCard(false); // Hide the modal after adding the card
      setIsEditingCard(false); // Hide the modal after adding the card
      setIsProcessing(false);
      setCardId('');
      setQuestion(''); // Clear the input fields
      setAnswer('');
    } catch (error) {
      console.error('Error adding new card:', error);
    }
  };

  return (
    <View style={themeStyles.container}>
      {cards ? (
        <>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={themeStyles.primaryButton} onPress={() => navigation.navigate('Stack Details' , {stackId})}>
            <Text>Stack Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={themeStyles.secondaryButton} onPress={handleAddCard}>
            <Text>Add Card</Text>
          </TouchableOpacity>
          </View>

          <FlatList
            data={cards}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardItem}>
                <Text style={{ width: '65%' }} numberOfLines={1} ellipsizeMode='tail'>{item.question}</Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditCard(item.id, item.question, item.answer)}
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

          {/* Modal for adding cards */}
          <Modal
            visible={isAddingCard || isEditingCard}
            animationType="slide"
            transparent={false}
          >
            <View style={styles.modalView}>
              {isAddingCard && (<Text style={[styles.modalTitle]}>Add a New Card</Text>)}
              {isEditingCard && (<Text style={[styles.modalTitle]}>Edit Card</Text>)}
              <Text style={{ alignSelf: 'flex-start' }}>Question</Text>
              <TextInput
                style={styles.input}
                placeholder="Write your question here"
                value={question}
                onChangeText={(text) => setQuestion(text)}
                multiline={true}
                numberOfLines={5}
              />
              <Text style={{ alignSelf: 'flex-start' }}>Answer</Text>
              <TextInput
                style={styles.input}
                placeholder="Write your answer here"
                value={answer}
                onChangeText={(text) => setAnswer(text)}
                multiline={true}
                numberOfLines={5}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={isProcessing ? styles.disabledButton : styles.cancelButton}
                  onPress={handleCancelModal}
                  disabled={isProcessing}
                >
                  <Text style={[styles.buttonText]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={isProcessing ? styles.disabledButton : styles.saveButton}
                  onPress={handleSaveCard}
                  disabled={isProcessing}
                >
                  <Text style={[styles.buttonText]}>Save</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>
        </>
      ) : (
        <ActivityIndicator size="large" color="#007AFF" />
      )}
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
    borderRadius: 5
  },
  deleteButton: {
    padding: 5,
    backgroundColor: 'lightcoral',
    borderRadius: 5
  },
  addButton: {
    alignSelf: 'flex-end',
    margin: 10,
    padding: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 5
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    margin: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ManageCardsScreen;
