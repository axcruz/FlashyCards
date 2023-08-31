// screens/CardScreen.js

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import SettingsModal from "../components/SettingsModal";

import { getThemeStyles } from "../styles/theme";

const CardScreen = ({ route, navigation }) => {
  const { stackId, isUntimed, timePerCardInSeconds, stackCards } = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timePerCardInSeconds);

  const timerRef = useRef(null);
  const cards = stackCards;
  const totalCards = cards.length;

  const themeStyles = getThemeStyles(useColorScheme());

  const handlePreviousCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setTimeRemaining(timePerCardInSeconds);
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setTimeRemaining(timePerCardInSeconds);
  };

  // Decrement time by secs
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

  // If time is up go to next card
  useEffect(() => {
    if (!isUntimed) {
      if (timeRemaining <= 0) {
        handleNextCard();
      }
    }
  }, [timeRemaining]);

  // Main Render
  return (
    <View style={[themeStyles.container]}>
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
        <SettingsModal />
      </View>

      <View
        style={[
          themeStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        {currentIndex < totalCards ? (
          <>
            {!isUntimed && (
              <Text
                style={themeStyles.text}
              >{`Time Remaining: ${timeRemaining} seconds`}</Text>
            )}

            <Text style={[themeStyles.titleText, { margin: 10 }]}>
              {showAnswer ? "Answer" : "Question"}
            </Text>

            <View
              style={[
                themeStyles.card,
                { width: "100%", height: "50%" },
                showAnswer ? { borderColor: "green" } : { borderColor: "blue" },
              ]}
            >
              <ScrollView>
                <Text style={[themeStyles.text]}>
                  {showAnswer
                    ? cards[currentIndex].answer
                    : cards[currentIndex].question}
                </Text>
              </ScrollView>
            </View>

            <TouchableOpacity
              style={{ alignSelf: "flex-end", marginRight: 25, marginTop: 10 }}
              onPress={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? (
                <Text style={[themeStyles.text, { color: "blue" }]}>
                  Show Question
                </Text>
              ) : (
                <Text style={[themeStyles.text, { color: "green" }]}>
                  Show Answer
                </Text>
              )}
            </TouchableOpacity>

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              {currentIndex > 0 && (
                <TouchableOpacity
                  style={[themeStyles.primaryButton, { marginHorizontal: 5 }]}
                  onPress={handlePreviousCard}
                >
                  <Ionicons name="chevron-back-sharp" size={24} color="white" />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[themeStyles.primaryButton, { marginHorizontal: 5 }]}
                onPress={handleNextCard}
              >
                <Ionicons
                  name="chevron-forward-sharp"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={themeStyles.titleText}>
              You have reviewed all cards!
            </Text>
            <TouchableOpacity
              style={{ margin: 5 }}
              onPress={() =>
                navigation.navigate("Stack Details", { stackId: stackId })
              }
            >
              <Text style={[themeStyles.text, { color: "blue" }]}>
                Start Over
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default CardScreen;
