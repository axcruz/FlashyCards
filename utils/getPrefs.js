import { db, auth } from "../firebase/config";

// Helper function to get user preferences
const getPrefs = async (userId) => {
  try {
    const prefsCollection = db.collection('prefs');
    const querySnapshot = await prefsCollection.where("uid", "==", userId).limit(1).get();

    const prefs = [];
    querySnapshot.forEach((doc) => {
      prefs.push({ id: doc.id, ...doc.data() });
    });

    return prefs[0];
  } catch (error) {
    console.error('Error getting preferences:', error);
    throw error;
  }
};

export default getPrefs;
