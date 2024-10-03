import { User } from "database/_DATA";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../reducers/store";
import {
  _saveQuestion,
  _saveQuestionAnswer,
  _getQuestions,
  _getUsers,
} from "../database/_DATA";

// Define action type
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const VOTE_ON_POLL = "VOTE_ON_POLL";
export const ADD_POLL = "ADD_POLL";

// Action creator for login
export const login = (user: User) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
};

// Action creator for logout
export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const voteOnPoll =
  (
    questionId: string,
    selectedOption: "optionOne" | "optionTwo",
    userId: string
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    try {
      // Call API to save the vote
      await _saveQuestionAnswer({
        authedUser: userId,
        qid: questionId,
        answer: selectedOption,
      });

      // Get the updated questions and users after the vote is saved
      const updatedQuestions = await _getQuestions();
      const updatedUsers = await _getUsers();

      // Find the updated poll and user based on questionId and userId
      const updatedPoll = updatedQuestions[questionId];
      const updatedUser = updatedUsers[userId];

      // Dispatch an action to update the state
      dispatch({
        type: VOTE_ON_POLL,
        payload: { updatedPoll, updatedUser },
      });
    } catch (error) {
      console.error("Failed to vote on poll:", error);
    }
  };

// Action creator for adding a new poll
export const addPoll =
  (newPoll: {
    optionOneText: string;
    optionTwoText: string;
    author: string;
  }): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      // Call the _saveQuestion API to add the new poll
      const saveQuestion = await _saveQuestion(newPoll);

      // Dispatch the action to update the store
      dispatch({
        type: ADD_POLL,
        payload: saveQuestion,
      });
    } catch (error) {
      console.error("Error adding new question:", error);
    }
  };
