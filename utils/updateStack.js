import { db } from '../firebase/config';

const updateStack = async (stackId, updatedStackData) => {
  try {
    const stackRef = db.collection('stacks').doc(stackId);

    // Use the update method to update only the specified fields in updatedCardData
    await stackRef.update(updatedStackData);

    console.log('Stack updated successfully');
  } catch (error) {
    console.error('Error updating stack:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export default updateStack;
