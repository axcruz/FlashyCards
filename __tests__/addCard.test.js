import { addCard } from "../utils";
import { db, auth } from "../firebase/config";

// Mock Firebase functions
jest.mock("../firebase/config", () => ({
  db: {
    collection: jest.fn(),
    runTransaction: jest.fn(),
  },
  auth: {
    currentUser: {
      uid: "testUserId",
    },
  },
}));

describe("addCard", () => {
  it("should add a card to a stack and increment cardCount", async () => {
    // Mock Firestore transaction functions
    const transactionMock = {
      get: jest.fn(() => ({
        exists: true,
        data: () => ({ cardCount: 2 }), // Mock the current card count
      })),
      update: jest.fn(),
    };

    // Mock Firestore collection functions
    const cardsCollectionMock = {
      add: jest.fn(),
    };

    // Mock Firestore stack reference
    db.collection.mockReturnValue({
      doc: jest.fn().mockReturnValue({
        collection: jest.fn(() => cardsCollectionMock),
      }),
      get: jest.fn(),
    });

    // Mock Firestore transaction
    db.runTransaction.mockImplementation(async (callback) => {
      await callback(transactionMock);
    });

    const stackId = "testStackId";
    const cardData = { question: "Test Question", answer: "Test Answer" };

    await addCard(stackId, cardData);

    // Assertions
    expect(db.collection).toHaveBeenCalledWith("stacks");
    expect(db.collection().doc).toHaveBeenCalledWith(stackId);
    expect(db.runTransaction).toHaveBeenCalled();
    expect(transactionMock.get).toHaveBeenCalled();
    expect(transactionMock.update).toHaveBeenCalledWith(expect.any(Object), {
      cardCount: 3, // Expected incremented card count
    });
    expect(cardsCollectionMock.add).toHaveBeenCalledWith({
      ...cardData,
      author: "testUserId",
      order: 2, // Expected order based on current card count
    });
  });

  it("should throw an error if the stack does not exist", async () => {
    // Mock Firestore transaction functions to simulate stack not found
    const transactionMock = {
      get: jest.fn(() => ({ exists: false })), // Simulate stack not found
    };

    // Mock Firestore stack reference
    db.collection.mockReturnValue({
      doc: jest.fn().mockReturnValue({
        collection: jest.fn(),
      }),
    });

    // Mock Firestore transaction
    db.runTransaction.mockImplementation(async (callback) => {
      await callback(transactionMock);
    });

    const stackId = "testStackId";
    const cardData = { question: "Test Question", answer: "Test Answer" };

    try {
      await addCard(stackId, cardData);
    } catch (error) {
      expect(error.message).toBe("Stack not found");
    }
  });
});
