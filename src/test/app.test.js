import { render, fireEvent } from "@testing-library/react";
import App from "../App";

test("check if clicking the button increments count", () => {
  const { getByText } = render(<App />);

  const button = getByText("Increment");
  fireEvent.click(button);

  expect(getByText("Count: 1")).toBeInTheDocument();
});
