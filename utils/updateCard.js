import { db } from '../firebase/config';

const updateCard = async (stackId, cardId, updatedCardData) => {
  try {
    const cardRef = db.collection('stacks').doc(stackId).collection('cards').doc(cardId);

    // Use the update method to update only the specified fields in updatedCardData
    await cardRef.update(updatedCardData);

    console.log('Card updated successfully');
  } catch (error) {
    console.error('Error updating card:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export default updateCard;
