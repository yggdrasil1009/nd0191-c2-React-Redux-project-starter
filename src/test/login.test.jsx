import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import Login from "../components/Login";
import { login } from "../actions/action";
import * as React from "react";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

jest.mock("../database/_DATA", () => ({
  _getUsers: jest.fn(() =>
    Promise.resolve({
      user1: { id: "user1", name: "User One", password: "password1" },
      user2: { id: "user2", name: "User Two", password: "password2" },
    })
  ),
}));

jest.mock("../assets/logo.png", () => "test-file-stub");
describe("Login Component", () => {
  const store = mockStore({});

  test("should display an error for missing fields", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/err.missingFields/i)).toBeInTheDocument();
    });
  });
});
