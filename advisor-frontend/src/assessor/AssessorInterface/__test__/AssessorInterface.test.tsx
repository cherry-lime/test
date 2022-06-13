import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../../../App";

test("app rendering/navigating from assessor interface to teams", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const button = screen.getByTestId("assessor");
  fireEvent.click(button);
  expect(screen.getByText(/assessor Interface here/i)).toBeInTheDocument();

  const buttonTeams = screen.getByTestId("assessor-teams");
  fireEvent.click(buttonTeams);
  expect(screen.getByText(/List of Teams/i)).toBeInTheDocument();
  expect(screen.getByText(/assessor view/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
