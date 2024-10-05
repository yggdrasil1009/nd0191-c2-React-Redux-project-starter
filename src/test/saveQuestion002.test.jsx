import { _saveQuestion } from "database/_DATA";

describe("_saveQuestion", () => {
  it("should return a saved question with all expected fields when valid data is provided", async () => {
    const question = {
      optionOneText: "Option 1",
      optionTwoText: "Option 2",
      author: "author1",
    };

    const savedQuestion = await _saveQuestion(question);

    expect(savedQuestion).toHaveProperty("id");
    expect(savedQuestion).toHaveProperty("timestamp");
    expect(savedQuestion).toHaveProperty("author", question.author);
    expect(savedQuestion).toHaveProperty(
      "optionOne.text",
      question.optionOneText
    );
    expect(savedQuestion).toHaveProperty(
      "optionTwo.text",
      question.optionTwoText
    );
    expect(savedQuestion.optionOne.votes).toEqual([]);
    expect(savedQuestion.optionTwo.votes).toEqual([]);
  });
});
