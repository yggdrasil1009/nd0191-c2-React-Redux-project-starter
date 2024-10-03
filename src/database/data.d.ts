declare module "database/_DATA" {
  interface Question {
    id: string;
    author: string;
    timestamp: number;
    optionOne: {
      votes: string[];
      text: string;
    };
    optionTwo: {
      votes: string[];
      text: string;
    };
  }

  interface Questions {
    [questionId: string]: Question; // A dictionary of questions, keyed by their unique ID
  }

  interface Answers {
    [questionId: string]: "optionOne" | "optionTwo";
  }

  interface User {
    id: string;
    password: string;
    name: string;
    avatarURL: string;
    answers: Answers;
    questions: string[];
  }

  export function _getQuestions(): Promise<Questions>;
  export function _getUsers(): Promise<User[]>;
  export function _saveQuestion(question: Question): Promise<Question>;
  export function _saveQuestionAnswer({
    authedUser,
    qid,
    answer,
  }: {
    authedUser: string;
    qid: string;
    answer: string;
  }): Promise<void>;
}
