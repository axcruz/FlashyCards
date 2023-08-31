import { db, auth } from "../firebase/config";

// Helper function to add a new stack to Firestore
const addStack = async (stackData) => {
  try {
    stackData.author = auth.currentUser.uid;
    const stackRef = db.collection("stacks");
    const newStackRef = await stackRef.add(stackData);

    return newStackRef.id;
  } catch (error) {
    throw error;
  }
};

export default addStack;
