import React from "react";
import { render } from "@testing-library/react";
import Leaderboard from "../components/LeaderBoard";

it("renders the leaderboard correctly", () => {
  const { asFragment } = render(<Leaderboard />);
  expect(asFragment()).toMatchSnapshot();
});
