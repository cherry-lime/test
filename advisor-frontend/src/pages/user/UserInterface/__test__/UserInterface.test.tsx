import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../../../App";
import { store } from "../../../../app/store";

test("app rendering/navigating from user interface to teams", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByTestId("user");
  fireEvent.click(button);
  expect(screen.getByText(/Home User/i)).toBeInTheDocument();

  const buttonTeams = screen.getByTestId("user-teams");
  fireEvent.click(buttonTeams);
  expect(screen.getByText(/List of Teams/i)).toBeInTheDocument();
});

test("app rendering/navigating from user interface to self-evals", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByTestId("user");
  fireEvent.click(button);
  expect(screen.getByText(/Home User/i)).toBeInTheDocument();

  const buttonEvals = screen.getByTestId("user-evals");
  fireEvent.click(buttonEvals);
  expect(screen.getByText(/List of evaluations/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
