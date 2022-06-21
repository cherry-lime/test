import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../../../App";
import { store } from "../../../../app/store";

test("app rendering/navigating from assessor view to specific team", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByTestId("assessor");
  fireEvent.click(button);
  const buttonTeams = screen.getByTestId("assessor-teams");
  fireEvent.click(buttonTeams);
  expect(screen.getByText(/List of Teams/i)).toBeInTheDocument();
  expect(screen.getByText(/assessor view/i)).toBeInTheDocument();

  const buttonTeam2 = screen.getByTestId("team-2");
  fireEvent.click(buttonTeam2);
  expect(screen.getByText(/A Specific Team with id 2/i)).toBeInTheDocument();
  expect(screen.getByText(/add new assessor/i)).toBeInTheDocument();
  expect(screen.getByText(/add new member/i)).toBeInTheDocument();
});

test("app rendering/navigating from user view to specific team", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByTestId("user");
  fireEvent.click(button);
  const buttonTeams = screen.getByTestId("user-teams");
  fireEvent.click(buttonTeams);
  expect(screen.getByText(/List of Teams/i)).toBeInTheDocument();

  const buttonTeam2 = screen.getByTestId("team-4");
  fireEvent.click(buttonTeam2);
  expect(screen.getByText(/A Specific Team with id 4/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
