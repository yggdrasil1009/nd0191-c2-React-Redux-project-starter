import * as React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "../reducers/appReducer";
import Leaderboard from "../components/LeaderBoard";

const initialState = {
  app: {
    auth: {
      isAuthenticated: true,
      user: { id: "user1", name: "Test User", answers: {}, questions: [] },
      loading: false,
      error: null,
    },
    polls: {
      poll1: {
        id: "poll1",
        question: "What's your favorite color?",
        options: { a: "Red", b: "Blue" },
        author: "user1",
        timestamp: Date.now(),
      },
    },
  },
};

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  preloadedState: initialState,
});

test("renders the leaderboard correctly", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <Leaderboard />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();
});
