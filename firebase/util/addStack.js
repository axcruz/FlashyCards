import { db, auth } from '../config'

// Helper function to add a new stack to Firestore
const addStack = async (stackData) => {
  try {
    stackData.author = auth.currentUser.uid;
    const stackRef = db.collection('stacks');
    const newStackRef = await stackRef.add(stackData);
    console.log('New stack added with ID:', newStackRef.id);
    return newStackRef.id;
  } catch (error) {
    console.error('Error adding stack:', error);
    throw error;
  }
};

export default addStack;
