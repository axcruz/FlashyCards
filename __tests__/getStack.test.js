import { getStack } from "../utils";
import { db } from "../firebase/config";

// Mock Firebase methods and data
jest.mock("../firebase/config", () => ({
  db: {
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => ({
          exists: true,
          data: () => ({
            title: "Test Stack",
          }),
        })),
        collection: jest.fn(() => ({
          get: jest.fn(() => ({
            docs: [
              {
                id: "1",
                data: () => ({
                  question: "Test Question 1",
                  answer: "Test Answer 1",
                }),
              },
            ],
          })),
        })),
      })),
    })),
  },
}));

describe("getStack function", () => {
  it("fetches a stack and its cards successfully", async () => {

    const stackId = "validStackId";
    const result = await getStack(stackId);

    // Assert that the result matches the expected structure
    expect(result).toEqual({
      stackData: {
        title: "Test Stack", 
      },
      cardsData: [
        {
          id: "1",
          question: "Test Question 1",
          answer: "Test Answer 1",
        },
      ],
    });
  });

});
