// screens/StackDetailScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Modal,
  useColorScheme,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import LoadingIndicator from "../components/LoadingIndicator";
import StackModal from "../components/StackModal";
import SettingsModal from "../components/SettingsModal";

import { getStack, deleteStack } from "../utils";

import { getThemeStyles } from "../styles/theme";

const StackDetailScreen = ({ route, navigation }) => {
  const { stackId } = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [timePerCardInSeconds, setTimePerCardInSeconds] = useState("60");
  const [randomOrder, setRandomOrder] = useState(false);
  const [untimed, setUntimed] = useState(false);
  const [stack, setStack] = useState();
  const [cards, setCards] = useState();

  const themeStyles = getThemeStyles(useColorScheme());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStack(stackId);
        setStack(result.stackData);
        if (randomOrder) {
          setCards(shuffleArray(result.cardsData));
        } else {
          setCards(result.cardsData.sort((a, b) => a.order - b.order));
        }
      } catch (error) {
        // Handle error
        alert("Stack not found. Navigating back to list.");
        navigation.navigate("Stacks");
      }
    };
    fetchData();
    setRefreshing(false);
  },  [stackId, randomOrder, navigation]);

  // Helper function to shuffle the ordering of cards
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  // Toggle untimed state
  const toggleUntimed = () => {
    setUntimed(!untimed);
  };

  // Toggle random order state
  const toggleRandomOrder = () => {
    setRandomOrder(!randomOrder);
  };

  // When play/start is clicked set the configs and nav to the cards screen
  const handleStartFlashcards = () => {
    const timeInSeconds = parseInt(timePerCardInSeconds, 10);
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) {
      return; // Ignore invalid or zero time
    }
    // If random order is true, shuffle cards, otherwise order them
    if (randomOrder) {
      setCards(shuffleArray(cards));
    } else {
      setCards(cards.sort((a, b) => a.order - b.order));
    }
    navigation.navigate("Cards", {
      stackId,
      isUntimed: untimed,
      timePerCardInSeconds: timeInSeconds,
      stackCards: cards,
    });
  };

  // When manage flash cards button is clicked
  const handleManageFlashCards = () => {
    navigation.navigate("Manage Cards", { stackId });
  };

  // Toggle the delete modal
  const toggleDeleteModal = () => {
    setDeleteModalVisible(!deleteModalVisible);
  };

  // Handle a submission on the delete modal
  const handleDeleteStack = async () => {
    try {
      await deleteStack(stackId);
      navigation.navigate("Stacks");
    } catch (error) {
      console.error("Error adding deleting stack:", error);
    }
  };

  // Main Render
  return (
    <>
      {stack ? (
        <View style={themeStyles.container}>
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
              style={[themeStyles.primaryButton, { marginHorizontal: 5 }]}
              onPress={() => navigation.navigate("Stacks")}
            >
              <Ionicons name="layers-outline" size={24} color="white" />
            </TouchableOpacity>
            <StackModal mode={"update"} stackId={stackId} stackData={stack} />
            <TouchableOpacity
              style={[themeStyles.secondaryButton, { marginHorizontal: 5 }]}
              onPress={handleManageFlashCards}
            >
              <Ionicons name="grid-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[themeStyles.dangerButton, { marginHorizontal: 5 }]}
              onPress={toggleDeleteModal}
            >
              <Ionicons name="backspace-outline" size={24} color="white" />
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
            <Text
              style={[
                themeStyles.subText,
                { marginLeft: 15, marginVertical: 5 },
              ]}
            >
              {stack.cardCount} Cards
            </Text>
          </View>
          <View
            style={[
              themeStyles.card,
              { marginHorizontal: 10, marginVertical: 15 },
            ]}
          >
            <View style={styles.option}>
              <Text style={themeStyles.subText}>Untimed</Text>
              <Switch
                style={{ margin: 5 }}
                onValueChange={toggleUntimed}
                value={untimed}
              />
            </View>
            <View style={styles.option}>
              <Text style={themeStyles.subText}>Time Per Card (secs) </Text>
              <TextInput
                style={[
                  themeStyles.input,
                  { width: 50, height: 30, padding: 5, margin: 5 },
                  untimed ? styles.disabledInput : null,
                ]}
                value={timePerCardInSeconds}
                onChangeText={setTimePerCardInSeconds}
                keyboardType="numeric"
                placeholder="Time per card"
                editable={!untimed} // Disable the input when untimed is true
              />
            </View>
            <View style={styles.option}>
              <Text style={themeStyles.subText}>Randomize</Text>
              <Switch
                style={{ margin: 5 }}
                onValueChange={toggleRandomOrder}
                value={randomOrder}
              />
            </View>
          </View>
          <TouchableOpacity
            style={themeStyles.infoButton}
            onPress={handleStartFlashcards}
          >
            <Ionicons name="play" size={30} color="white" />
          </TouchableOpacity>

          {/* Modal for deleting stack*/}
          <Modal
            visible={deleteModalVisible}
            transparent={false}
            animationType="slide"
          >
            <View style={themeStyles.modalView}>
              <Text style={[themeStyles.titleText, { marginVertical: 10 }]}>
                Delete Stack
              </Text>
              <Text style={themeStyles.text}>
                Are you sure you want to delete this stack?
              </Text>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <TouchableOpacity
                  onPress={toggleDeleteModal}
                  style={[themeStyles.configButton, { marginHorizontal: 5 }]}
                >
                  <Ionicons name="return-down-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeleteStack}
                  style={[themeStyles.dangerButton, { marginHorizontal: 5 }]}
                >
                  <Text style={themeStyles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 2,
  },
  disabledInput: {
    backgroundColor: "#f0f0f0", // Use a light gray color
    borderColor: "#ccc", // Use a light gray border color
    color: "#888", // Use a gray text color
  },
});

export default StackDetailScreen;
