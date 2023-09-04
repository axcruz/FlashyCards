import { deleteCard } from "../utils";
import { db } from "../firebase/config";

// Mock the Firebase Firestore methods
jest.mock("../firebase/config", () => {
  const mFirestore = {
    // Resuable object to simulate nested calls
    collection: jest.fn(() => mFirestore),
    doc: jest.fn(() => mFirestore),
    get: jest.fn(() =>
      Promise.resolve({ exists: true, data: () => ({ cardCount: 1 }) })
    ),
    runTransaction: jest.fn((callback) =>
      callback({
        get: jest.fn(() =>
          Promise.resolve({ exists: true, data: () => ({ cardCount: 2 }) })
        ),
        update: jest.fn(),
      })
    ),
    delete: jest.fn(),
  };

  return {
    db: mFirestore,
    auth: {
      currentUser: {
        uid: "mockUserId",
      },
    },
  };
});

describe("deleteCard function", () => {
  it("should delete a card from a stack and decrement cardCount", async () => {
    const stackId = "your-stack-id";
    const cardId = "your-card-id";

    await deleteCard(stackId, cardId);

    // Assertions
    expect(db.collection).toHaveBeenCalledWith("stacks");
    expect(db.runTransaction).toHaveBeenCalled();
    expect(db.runTransaction.mock.calls[0][0]).toBeInstanceOf(Function);

    const transactionCallback = db.runTransaction.mock.calls[0][0];
    const transaction = {
      get: jest.fn(() =>
        Promise.resolve({ exists: true, data: () => ({ cardCount: 2 }) })
      ),
      update: jest.fn(),
    };

    await transactionCallback(transaction);

    // Assertions
    expect(transaction.update).toHaveBeenCalledWith(
      db.doc(`stacks/${stackId}`),
      { cardCount: 1 }
    );
  });
});
