import {addStack} from '../utils';
import { db, auth } from '../firebase/config';

// Mock Firebase functions
jest.mock('../firebase/config', () => ({
  db: {
    collection: jest.fn(),
  },
  auth: {
    currentUser: {
      uid: 'testUserId',
    },
  },
}));

describe('addStack', () => {
  it('should add a new stack to Firestore', async () => {
    // Mock Firestore collection functions
    const stackRefMock = {
      add: jest.fn(() => ({ id: 'testStackId' })), // Mock the addition of a new stack
    };

    // Mock Firestore stack reference
    db.collection.mockReturnValue(stackRefMock);

    const stackData = {
      stackName: 'Test Stack',
      category: 'Test Category',
    };

    const newStackId = await addStack(stackData);

    // Assertions
    expect(db.collection).toHaveBeenCalledWith('stacks');
    expect(stackRefMock.add).toHaveBeenCalledWith({
      ...stackData,
      author: 'testUserId',
    });
    expect(newStackId).toBe('testStackId');
  });

  it('should throw an error if adding the stack fails', async () => {
    // Mock Firestore collection functions to simulate an error
    const stackRefMock = {
      add: jest.fn(() => {
        throw new Error('Error adding stack');
      }),
    };

    // Mock Firestore stack reference
    db.collection.mockReturnValue(stackRefMock);

    const stackData = {
      stackName: 'Test Stack',
      category: 'Test Category',
    };

    try {
      await addStack(stackData);
    } catch (error) {
      expect(error.message).toBe('Error adding stack');
    }
  });
});
