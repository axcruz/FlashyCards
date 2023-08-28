import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, TextInput, Modal, RefreshControl, useColorScheme } from 'react-native';
import getStack from '../utils/getStack';
import addCard from '../utils/addCard';
import updateCard from '../utils/updateCard';
import deleteCard from '../utils/deleteCard';

import SettingsModal from '../components/SettingsModal';
import Ionicons from '@expo/vector-icons/Ionicons';

import { getThemeStyles } from '../styles/theme';


const ManageCardsScreen = ({ route, navigation }) => {
  
  const { stackId} = route.params;
  
  const [refreshing, setRefreshing] = useState(false);
  const [cards, setCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false); // State to control the modal
  const [isEditingCard, setIsEditingCard] = useState(false); // State to control the modal
  const [isDeletingCard, setIsDeletingCard] = useState(false);
  const [cardId, setCardId] = useState('');
  const [question, setQuestion] = useState(''); // State to store the question input
  const [answer, setAnswer] = useState(''); // State to store the answer input

  const themeStyles = getThemeStyles(useColorScheme());

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
  }, [refreshing, stackId, cards]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleCancelModal = () => {
    setIsAddingCard(false); // Hide the modal after adding the card
    setIsEditingCard(false); // Hide the modal after adding the card
    setIsDeletingCard(false);
    setIsProcessing(false);
    setCardId('');
    setQuestion(''); // Clear the input fields
    setAnswer('');
  }

  const handleAddCard = async () => {
    setIsAddingCard(true); // Show the modal
  };

  const handleEditCard = (cardId, cardQuestion, cardAnswer) => {
    // Navigate to card editing screen, passing cardId
    setIsEditingCard(true);
    setCardId(cardId);
    setQuestion(cardQuestion);
    setAnswer(cardAnswer);
  };

  const handleDeleteCard = async (cardId) => {
    setIsDeletingCard(true);
    setCardId(cardId);
  };

  const handleSaveCard = async () => {
    setIsProcessing(true);

    if (isAddingCard || isEditingCard) {
      if (question.trim() === '' || answer.trim() === '') {
        alert('Please enter both a question and an answer.');
        return;
      }
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
      } else if (isDeletingCard) {
        await deleteCard(stackId, cardId);
      }
      setIsAddingCard(false); // Hide the modal after adding the card
      setIsEditingCard(false); // Hide the modal after adding the card
      setIsDeletingCard(false);
      setIsProcessing(false);
      setCardId('');
      setQuestion(''); // Clear the input fields
      setAnswer('');
      onRefresh();
    } catch (error) {
      console.error('Error adding new card:', error);
    }
  };

  return (
    <View style={themeStyles.container}>
      {cards ? (
        <>
          <View style={{ flexDirection: 'row', paddingBottom: 10, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }}>
            <TouchableOpacity style={[themeStyles.tertiaryButton, { marginHorizontal: 5 }]} onPress={() => navigation.navigate('Stacks')}>
              <Ionicons name="layers-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[themeStyles.primaryButton, { marginHorizontal: 5 }]} onPress={() => navigation.navigate('Stack Details', { stackId, theme })}>
              <Ionicons name="clipboard-sharp" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[themeStyles.secondaryButton, { marginHorizontal: 5 }]} onPress={handleAddCard}>
              <Ionicons name="add-circle-sharp" size={24} color="white" />
            </TouchableOpacity>
            <SettingsModal />
          </View>

          <FlatList
            data={cards}
            refreshControl={
              <RefreshControl refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={'gray'}
                title="Refreshing"
                titleColor={'gray'}
              />
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[themeStyles.card, { flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginVertical: 2 }]}>
                <Text style={[themeStyles.text, { width: '70%', marginRight: 5 }]} numberOfLines={1} ellipsizeMode='tail'>{item.question}</Text>

                <TouchableOpacity
                  style={[themeStyles.primaryButton, { marginHorizontal: 2 }]}
                  onPress={() => handleEditCard(item.id, item.question, item.answer)}
                >
                  <Ionicons name="create" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[themeStyles.dangerButton, { marginHorizontal: 2 }]}
                  onPress={() => handleDeleteCard(item.id)}
                >
                  <Ionicons name="close-circle-outline" size={24} color="white" />
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
            <View style={themeStyles.modalView}>
              {isAddingCard && (<Text style={[themeStyles.titleText]}>Add Card</Text>)}
              {isEditingCard && (<Text style={[themeStyles.titleText]}>Edit Card</Text>)}
              <Text style={[themeStyles.text, { alignSelf: 'flex-start' }]}>Question</Text>
              <TextInput
                style={[themeStyles.input, styles.input]}
                placeholder="Write your question here"
                value={question}
                onChangeText={(text) => setQuestion(text)}
                multiline={true}
                numberOfLines={5}
              />
              <Text style={[themeStyles.text, { alignSelf: 'flex-start' }]}>Answer</Text>
              <TextInput
                style={[themeStyles.input, styles.input]}
                placeholder="Write your answer here"
                value={answer}
                onChangeText={(text) => setAnswer(text)}
                multiline={true}
                numberOfLines={5}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={[themeStyles.configButton, { marginHorizontal: 5 }]}
                  onPress={handleCancelModal}
                  disabled={isProcessing}
                >
                  <Ionicons name="return-down-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[themeStyles.successButton, { marginHorizontal: 5 }]}
                  onPress={handleSaveCard}
                  disabled={isProcessing}
                >
                  <Text style={[themeStyles.buttonText]}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Modal for deleting cards */}
          <Modal
            visible={isDeletingCard}
            transparent={false}
            animationType="slide"
          >
            <View style={themeStyles.modalView}>
              <Text style={[themeStyles.titleText, { marginVertical: 10 }]}>Delete Card</Text>
              <Text style={themeStyles.text}>Are you sure you want to delete this card?</Text>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity onPress={handleCancelModal} style={[themeStyles.configButton, { marginHorizontal: 5 }]}>
                  <Ionicons name="return-down-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveCard} style={[themeStyles.dangerButton, { marginHorizontal: 5 }]}>
                  <Text style={themeStyles.buttonText}>Delete</Text>
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
  input: {
    width: '100%',
    height: 200,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});

export default ManageCardsScreen;
