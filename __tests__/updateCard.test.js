import { updateCard } from "../utils";
import { db } from "../firebase/config";

// Mock the Firebase database methods
jest.mock("../firebase/config", () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    update: jest.fn(),
  },
}));

describe("updateCard", () => {
  const stackId = "mockStackId";
  const cardId = "mockCardId";
  const updatedCardData = { question: "mock test" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a card in the stack", async () => {
    await updateCard(stackId, cardId, updatedCardData);

    // Verify that the Firebase methods were called with the correct arguments
    expect(db.collection).toHaveBeenCalledWith("stacks");
    expect(db.doc).toHaveBeenCalledWith(stackId);
    expect(db.collection().doc().collection).toHaveBeenCalledWith("cards");
    expect(db.collection().doc().collection().doc).toHaveBeenCalledWith(cardId);
    expect(
      db.collection().doc().collection().doc().update
    ).toHaveBeenCalledWith(updatedCardData);
  });

  it("should throw an error if the update fails", async () => {
    const mockError = new Error("Mock update error");
    db.collection()
      .doc()
      .collection()
      .doc()
      .update.mockRejectedValueOnce(mockError);

    // Ensure that the function throws an error
    await expect(updateCard(stackId, cardId, updatedCardData)).rejects.toThrow(
      mockError
    );
  });
});
