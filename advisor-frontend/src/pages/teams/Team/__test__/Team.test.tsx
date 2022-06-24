import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../../../App";
import { store } from "../../../../app/store";

test("app rendering/navigating from assessor view to specific team evaluation", async () => {
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
  const buttonTeam2 = screen.getByTestId("team-2");
  fireEvent.click(buttonTeam2);
  const buttonTeamEval = screen.getByTestId("team-eval-234");
  fireEvent.click(buttonTeamEval);
  expect(screen.getByText(/Team Evaluation/i)).toBeInTheDocument();
});

test("app rendering/navigating from user view to specific team evaluation", async () => {
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
  const buttonTeam2 = screen.getByTestId("team-4");
  fireEvent.click(buttonTeam2);
  const buttonTeamEval = screen.getByTestId("team-eval-56");
  fireEvent.click(buttonTeamEval);
  expect(screen.getByText(/Team Evaluation/i)).toBeInTheDocument();
});

test("app rendering/navigating from assessor view to specific team evaluation", async () => {
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
  const buttonTeam2 = screen.getByTestId("team-2");
  fireEvent.click(buttonTeam2);
  const buttonTeamEval = screen.getByTestId("team-eval-234");
  fireEvent.click(buttonTeamEval);
  expect(screen.getByText(/Team Evaluation/i)).toBeInTheDocument();
});

test("app rendering/navigating from user view to specific team evaluation", async () => {
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
  const buttonTeam2 = screen.getByTestId("team-4");
  fireEvent.click(buttonTeam2);
  const buttonTeamEval = screen.getByTestId("team-eval-56");
  fireEvent.click(buttonTeamEval);
  expect(screen.getByText(/Team Evaluation/i)).toBeInTheDocument();
});

test("app rendering/navigating from assessor view to specific team feedback", async () => {
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
  const buttonTeam2 = screen.getByTestId("team-2");
  fireEvent.click(buttonTeam2);
  const buttonTeamEval = screen.getByTestId("team-feedback-123");
  fireEvent.click(buttonTeamEval);
  expect(screen.getByText(/Team Evaluation Feedback/i)).toBeInTheDocument();
});

test("app rendering/navigating from user view to specific team evaluation", async () => {
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
  const buttonTeam2 = screen.getByTestId("team-4");
  fireEvent.click(buttonTeam2);
  const buttonTeamEval = screen.getByTestId("team-feedback-555");
  fireEvent.click(buttonTeamEval);
  expect(screen.getByText(/Team Evaluation Feedback/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
