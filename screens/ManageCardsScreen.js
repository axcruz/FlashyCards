// screens/ManageCardsScreen.js

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Modal,
  RefreshControl,
  useColorScheme,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import SettingsModal from "../components/SettingsModal";

import { getStack, addCard, updateCard, deleteCard } from "../utils";

import { getThemeStyles } from "../styles/theme";

const ManageCardsScreen = ({ route, navigation }) => {
  const { stackId } = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [stack, setStack] = useState([]);
  const [cards, setCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isViewingCard, setIsViewingCard] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [isDeletingCard, setIsDeletingCard] = useState(false);
  const [cardId, setCardId] = useState("");
  const [question, setQuestion] = useState(""); // Store the question input
  const [answer, setAnswer] = useState(""); // Store the answer input

  const themeStyles = getThemeStyles(useColorScheme());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStack(stackId);
        setStack(result.stackData);
        setCards(result.cardsData);
      } catch (error) {
        alert("An unexpected issue occured. Unable to retrieve card data.");
      }
    };
    fetchData();
  }, [refreshing, stackId, cards]);

  // Handle refresh on FlatList
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // 2 seconds
  }, []);

  const handleCancelModal = () => {
    setIsViewingCard(false); // Hide the add modal after adding the card
    setIsAddingCard(false); // Hide the add modal after adding the card
    setIsEditingCard(false); // Hide the edit modal after editing the card
    setIsDeletingCard(false); // Hide the delete modal after deleting the card
    setIsProcessing(false);
    // Clear the input fields
    setCardId("");
    setQuestion("");
    setAnswer("");
  };

  const handleAddCard = async () => {
    setIsAddingCard(true); // Show the modal
  };

  const handleViewCard = (cardId, cardQuestion, cardAnswer) => {
    // Navigate to card editing screen, passing cardId
    setIsViewingCard(true);
    setCardId(cardId);
    setQuestion(cardQuestion);
    setAnswer(cardAnswer);
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
    // Validate card data on form
    if (isAddingCard || isEditingCard) {
      if (question.trim() === "" || answer.trim() === "") {
        alert("Please enter both a question and an answer.");
        return;
      }
    }
    // Create a new card object with the entered question and answer
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
      // Reset modal controls
      setIsAddingCard(false);
      setIsEditingCard(false);
      setIsDeletingCard(false);
      setIsProcessing(false);
      // Clear the input fields
      setCardId("");
      setQuestion("");
      setAnswer("");
      onRefresh();
    } catch (error) {
      alert("An unexpected error occured. Unable to save data for cards.");
    }
  };

  return (
    <View style={themeStyles.container}>
      {cards ? (
        <>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 10,
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "gray",
            }}
          >
            <TouchableOpacity
              style={[themeStyles.tertiaryButton, { marginHorizontal: 5 }]}
              onPress={() => navigation.navigate("Stacks")}
            >
              <Ionicons name="layers-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[themeStyles.primaryButton, { marginHorizontal: 5 }]}
              onPress={() => navigation.navigate("Stack Details", { stackId })}
            >
              <Ionicons name="clipboard-sharp" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[themeStyles.secondaryButton, { marginHorizontal: 5 }]}
              onPress={handleAddCard}
            >
              <Ionicons name="add-circle-sharp" size={24} color="white" />
            </TouchableOpacity>
            <SettingsModal />
          </View>
          <View style={{ margin: 5 }}>
            <Text
              style={[
                themeStyles.titleText,
                { marginLeft: 5, marginVertical: 5 },
              ]}
            >
              {stack.stackName}
            </Text>
            <Text
              style={[
                themeStyles.subText,
                { marginLeft: 15, marginVertical: 5 },
              ]}
            >
              {stack.category}
            </Text>
          </View>
          <FlatList
            data={cards}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={"gray"}
                title="Refreshing"
                titleColor={"gray"}
              />
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  handleViewCard(item.id, item.question, item.answer)
                }
              >
                <View
                  style={[
                    themeStyles.card,
                    {
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginVertical: 5,
                    },
                  ]}
                >
                  <Text
                    style={[themeStyles.text, { marginRight: 5 }]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.question}
                  </Text>

                  <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                    <TouchableOpacity
                      style={[
                        themeStyles.primaryButton,
                        { marginHorizontal: 5 },
                      ]}
                      onPress={() =>
                        handleEditCard(item.id, item.question, item.answer)
                      }
                    >
                      <Ionicons name="create" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        themeStyles.dangerButton,
                        { marginHorizontal: 5 },
                      ]}
                      onPress={() => handleDeleteCard(item.id)}
                    >
                      <Ionicons
                        name="close-circle-outline"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

          {/* Modal for viewing/adding/editing cards */}
          <Modal
            visible={isViewingCard || isAddingCard || isEditingCard}
            animationType="slide"
            transparent={false}
          >
            <KeyboardAwareScrollView
              contentContainerStyle={themeStyles.modalView}
            >
              {isViewingCard && (
                <Text style={themeStyles.titleText}>View Card</Text>
              )}
              {isAddingCard && (
                <Text style={themeStyles.titleText}>Add Card</Text>
              )}
              {isEditingCard && (
                <Text style={themeStyles.titleText}>Edit Card</Text>
              )}
              <Text style={[themeStyles.text, { alignSelf: "flex-start" }]}>
                Question
              </Text>
              <TextInput
                style={[themeStyles.input, styles.input]}
                placeholder="Write your question here"
                value={question}
                onChangeText={(text) => setQuestion(text)}
                multiline={true}
                numberOfLines={5}
                readOnly={isViewingCard}
                keyboardShouldPersistTaps={"never"}
              />
              <Text style={[themeStyles.text, { alignSelf: "flex-start" }]}>
                Answer
              </Text>
              <TextInput
                style={[themeStyles.input, styles.input]}
                placeholder="Write your answer here"
                value={answer}
                onChangeText={(text) => setAnswer(text)}
                multiline={true}
                numberOfLines={5}
                readOnly={isViewingCard}
                keyboardShouldPersistTaps={"never"}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={[themeStyles.configButton, { marginHorizontal: 5 }]}
                  onPress={handleCancelModal}
                  disabled={isProcessing}
                >
                  <Ionicons name="return-down-back" size={24} color="white" />
                </TouchableOpacity>
                {!isViewingCard && (
                  <TouchableOpacity
                    style={[themeStyles.successButton, { marginHorizontal: 5 }]}
                    onPress={handleSaveCard}
                    disabled={isProcessing}
                  >
                    <Text style={themeStyles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                )}
              </View>
            </KeyboardAwareScrollView>
          </Modal>

          {/* Modal for deleting cards */}
          <Modal
            visible={isDeletingCard}
            transparent={false}
            animationType="slide"
          >
            <View style={themeStyles.modalView}>
              <Text style={[themeStyles.titleText, { marginVertical: 10 }]}>
                Delete Card
              </Text>
              <Text style={themeStyles.text}>
                Are you sure you want to delete this card?
              </Text>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <TouchableOpacity
                  onPress={handleCancelModal}
                  style={[themeStyles.configButton, { marginHorizontal: 5 }]}
                >
                  <Ionicons name="return-down-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSaveCard}
                  style={[themeStyles.dangerButton, { marginHorizontal: 5 }]}
                >
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
    width: "100%",
    height: 200,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default ManageCardsScreen;
