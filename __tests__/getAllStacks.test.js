import { getAllStacks } from "../utils";
import { db, auth } from "../firebase/config";

// Mock the Firebase Firestore methods
jest.mock("../firebase/config", () => {
  const mFirestore = {
    collection: jest.fn(() => mFirestore),
    where: jest.fn(() => mFirestore),
    get: jest.fn(),
    forEach: jest.fn(),
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

describe("getAllStacks function", () => {
  it("should fetch all stacks authored by the current user", async () => {
    // Mock Firestore query snapshot
    const mockQuerySnapshot = [
      { id: "mockStackId1", data: () => ({ stackData1: "mockData1" }) },
      { id: "mockStackId2", data: () => ({ stackData2: "mockData2" }) },
    ];

    db.get.mockResolvedValueOnce(mockQuerySnapshot);

    const stacks = await getAllStacks();

    // Assertions
    expect(db.collection).toHaveBeenCalledWith("stacks");
    expect(db.where).toHaveBeenCalledWith("author", "==", "mockUserId");
    expect(db.get).toHaveBeenCalled();
    expect(stacks).toEqual([
      { id: "mockStackId1", stackData1: "mockData1" },
      { id: "mockStackId2", stackData2: "mockData2" },
    ]);
  });

  it("should handle errors gracefully", async () => {
    // Mock Firestore get to throw an error
    db.get.mockRejectedValueOnce(new Error("Mock Firestore Error"));

    // Assertions
    await expect(getAllStacks()).rejects.toThrow("Mock Firestore Error");
  });
});
