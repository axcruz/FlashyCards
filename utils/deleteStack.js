import { db } from '../firebase/config';

const deleteStack = async (stackId) => {
  try {
    // Delete the entire stack document along with its subcollections (cards)
    await db.collection('stacks').doc(stackId).delete();

    console.log('Stack deleted successfully');
  } catch (error) {
    console.error('Error deleting stack:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export default deleteStack;
