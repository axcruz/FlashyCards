import { db, auth } from "../firebase/config";

// Helper function to get all stacks authored by current user
const getAllStacks = async () => {
  try {
    const stacksCollection = db.collection("stacks");
    const querySnapshot = await stacksCollection
      .where("author", "==", auth.currentUser.uid)
      .get();

    const stacks = [];
    querySnapshot.forEach((doc) => {
      stacks.push({ id: doc.id, ...doc.data() });
    });

    return stacks;
  } catch (error) {
    throw error;
  }
};

export default getAllStacks;
