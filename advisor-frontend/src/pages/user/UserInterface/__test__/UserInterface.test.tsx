import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../../../../App";

test("app rendering/navigating from user interface to teams", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const button = screen.getByTestId("user");
  fireEvent.click(button);
  expect(screen.getByText(/Home User/i)).toBeInTheDocument();

  const buttonTeams = screen.getByTestId("user-teams");
  fireEvent.click(buttonTeams);
  expect(screen.getByText(/List of Teams/i)).toBeInTheDocument();
  expect(screen.getByText(/user view/i)).toBeInTheDocument();
});

test("app rendering/navigating from user interface to self-evals", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
