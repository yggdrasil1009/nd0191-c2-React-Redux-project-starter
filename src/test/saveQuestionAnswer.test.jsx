import { _saveQuestionAnswer } from "../database/_DATA";

describe("_saveQuestionAnswer", () => {
  it("should return true when correct data is passed", async () => {
    const answerData = {
      authedUser: "mtsamis",
      qid: "loxhs1bqm25b708cmbf3g",
      answer: "optionOne",
    };

    const result = await _saveQuestionAnswer(answerData);

    expect(result).toBe(true);
  });

  it("should throw an error if incorrect data is provided", async () => {
    const answerData = {
      authedUser: "mtsamis",
      qid: "loxhs1bqm25b708cmbf3g",
      answer: "",
    };

    await expect(_saveQuestionAnswer(answerData)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
