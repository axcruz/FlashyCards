import { db } from "../firebase/config";

// Helper function to query for a stack and its cards
const getStack = async (stackId) => {
  try {
    // Retrieve stack data
    const stackRef = db.collection("stacks").doc(stackId);
    const stackDoc = await stackRef.get();

    if (!stackDoc.exists) {
      throw new Error("Stack not found");
    }
    const stackData = stackDoc.data();

    // Retrieve card data
    const cardsQuerySnapshot = await stackRef.collection("cards").get();
    const cardsData = cardsQuerySnapshot.docs.map((cardDoc) => ({
      id: cardDoc.id,
      ...cardDoc.data(),
    }));

    return { stackData, cardsData }; // Return separate objects for stack and cards
  } catch (error) {
    throw error;
  }
};

export default getStack;
