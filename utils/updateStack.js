import { db } from "../firebase/config";

// Helper function to update stack data
const updateStack = async (stackId, updatedStackData) => {
  try {
    const stackRef = db.collection("stacks").doc(stackId);

    await stackRef.update(updatedStackData);
  } catch (error) {
    throw error;
  }
};

export default updateStack;
