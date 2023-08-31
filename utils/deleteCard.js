import { db } from "../firebase/config";

// Helper function to delete a card from a stack and decrement cardCount
const deleteCard = async (stackId, cardId) => {
  try {
    const stackRef = db.collection("stacks").doc(stackId);

    // Start a Firestore transaction to ensure data consistency
    await db.runTransaction(async (transaction) => {
      const stackDoc = await transaction.get(stackRef);

      if (!stackDoc.exists) {
        throw new Error("Stack not found");
      }

      const currentCardCount = stackDoc.data().cardCount || 0;
      const newCardCount = currentCardCount - 1;

      // Update the card count field in the stack document
      transaction.update(stackRef, { cardCount: newCardCount });

      // Reference to the stack's card collection
      const cardsCollection = stackRef.collection("cards");

      // Delete the card data from the collection
      await cardsCollection.doc(cardId).delete();
    });
  } catch (error) {
    throw error;
  }
};

export default deleteCard;
