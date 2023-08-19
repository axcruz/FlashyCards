import {db} from '../config';

// Helper function to get all stacks
const getAllStacks = async () => {
  try {
    const stacksCollection = db.collection('stacks');
    const querySnapshot = await stacksCollection.get();

    const stacks = [];
    querySnapshot.forEach((doc) => {
      stacks.push({ id: doc.id, ...doc.data() });
    });

    return stacks;
  } catch (error) {
    console.error('Error getting stacks:', error);
    throw error;
  }
};

export default getAllStacks;
