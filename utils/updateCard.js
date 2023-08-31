import { db } from "../firebase/config";

// Helper function to update a card in a stack
const updateCard = async (stackId, cardId, updatedCardData) => {
  try {
    const cardRef = db
      .collection("stacks")
      .doc(stackId)
      .collection("cards")
      .doc(cardId);

    await cardRef.update(updatedCardData);
  } catch (error) {
    throw error;
  }
};

export default updateCard;
