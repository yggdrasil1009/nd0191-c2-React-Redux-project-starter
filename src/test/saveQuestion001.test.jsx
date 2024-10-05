import { _saveQuestion } from "../database/_DATA";

describe("_saveQuestion", () => {
  it("should return an error when incorrect or missing data is provided", async () => {
    const invalidQuestion = {
      optionOneText: "",
      optionTwoText: "Option 2",
      author: "",
    };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
