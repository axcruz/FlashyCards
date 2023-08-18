import {db, auth} from '../config';

// Helper function to query for a stack and its cards from Firestore
const getStackWithCards = async (stackId) => {
  try {
    const stackRef = db.collection('stacks').doc(stackId);
    const stackDoc = await stackRef.get();

    if (!stackDoc.exists) {
      throw new Error('Stack not found');
    }

    const stackData = stackDoc.data();
    const cardsQuerySnapshot = await stackRef.collection('cards').get();
    const cardsData = cardsQuerySnapshot.docs.map((cardDoc) => ({
      id: cardDoc.id,
      ...cardDoc.data(),
    }));

    return { stackData, cardsData };
  } catch (error) {
    console.error('Error fetching stack with cards:', error);
    throw error;
  }
};

export default getStackWithCards;
