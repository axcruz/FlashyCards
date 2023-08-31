import { db, auth } from "../firebase/config";

// Helper function to add a card to a stack and increment cardCount
const addCard = async (stackId, cardData) => {
  try {
    const stackRef = db.collection("stacks").doc(stackId);

    // Start a Firestore transaction to ensure data consistency
    await db.runTransaction(async (transaction) => {
      const stackDoc = await transaction.get(stackRef);

      if (!stackDoc.exists) {
        throw new Error("Stack not found");
      }
      const currentCardCount = stackDoc.data().cardCount || 0;
      const newCardCount = currentCardCount + 1;

      // Update the card count field in the stack document
      transaction.update(stackRef, { cardCount: newCardCount });

      // Reference to the stack's card collection
      const cardsCollection = stackRef.collection("cards");

      // Add the card data to the collection
      cardData.author = auth.currentUser.uid;
      cardData.order = currentCardCount;
      await cardsCollection.add(cardData);
    });
  } catch (error) {
    throw error;
  }
};

export default addCard;
