import { deleteStack } from "../utils"; // Updated import path
import { db, auth } from "../firebase/config";

// Mock the Firebase Firestore methods
jest.mock("../firebase/config", () => {
  const mFirestore = {
    // Resuable object to simulate nested calls
    collection: jest.fn(() => mFirestore),
    where: jest.fn(() => mFirestore),
    doc: jest.fn(() => mFirestore),
    get: jest.fn(),
    forEach: jest.fn(),
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

describe("deleteStack function", () => {
  it("should delete a stack", async () => {
    const stackId = "your-stack-id";

    // Call the deleteStack function
    await deleteStack(stackId);

    // Expect that the Firestore methods were called with the correct parameters
    expect(db.collection).toHaveBeenCalledWith("stacks");
    expect(db.collection("stacks").doc).toHaveBeenCalledWith(stackId);
    expect(db.collection("stacks").doc(stackId).delete).toHaveBeenCalled();
  });

  it("should throw an error if Firestore delete operation fails", async () => {
    const stackId = "your-stack-id";
    const errorMessage = "Firestore delete operation failed";

    // Mock the Firestore delete method to throw an error
    db.collection("stacks")
      .doc(stackId)
      .delete.mockRejectedValue(new Error(errorMessage));

    // Call the deleteStack function and expect it to throw an error
    await expect(deleteStack(stackId)).rejects.toThrow(errorMessage);
  });
});
