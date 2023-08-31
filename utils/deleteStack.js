import { db } from "../firebase/config";

// Helper function to delete a stack
const deleteStack = async (stackId) => {
  try {
    // Delete the entire stack document along with its subcollections (cards)
    await db.collection("stacks").doc(stackId).delete();
  } catch (error) {
    throw error;
  }
};

export default deleteStack;
