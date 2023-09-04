import { updateStack } from "../utils"; // Adjust the import path as needed
import { db } from "../firebase/config";

// Mock the Firebase database methods
jest.mock("../firebase/config", () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    update: jest.fn(),
  },
}));

describe("updateStack", () => {
  const stackId = "mockStackId";
  const updatedStackData = { name: "Updated Stack" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update a stack's data", async () => {
    await updateStack(stackId, updatedStackData);

    // Verify that the Firebase methods were called with the correct arguments
    expect(db.collection).toHaveBeenCalledWith("stacks");
    expect(db.doc).toHaveBeenCalledWith(stackId);
    expect(db.doc().update).toHaveBeenCalledWith(updatedStackData);
  });

  it("should throw an error if the update fails", async () => {
    const mockError = new Error("Mock update error");
    db.doc().update.mockRejectedValueOnce(mockError);

    // Ensure that the function throws an error
    await expect(updateStack(stackId, updatedStackData)).rejects.toThrow(
      mockError
    );
  });
});
