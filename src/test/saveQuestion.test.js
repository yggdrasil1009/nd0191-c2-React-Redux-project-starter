import { _saveQuestion } from "../database/_DATA";

describe("_saveQuestion", () => {
  it("should return saved question with correct fields when data is formatted properly", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "mtsamis",
    };

    const result = await _saveQuestion(question);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("author", "mtsamis");
    expect(result).toHaveProperty("optionOne");
    expect(result).toHaveProperty("optionTwo");
  });

  it("should throw an error if incorrect data is provided", async () => {
    const question = {
      optionOneText: "",
      optionTwoText: "Option Two",
      author: "mtsamis",
    };

    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
