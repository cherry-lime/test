import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../../App";
import { store } from "../../../app/store";

test("app rendering/navigating from assessor interface to teams", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByTestId("assessor");
  fireEvent.click(button);
  expect(screen.getByText(/assessor Interface here/i)).toBeInTheDocument();

  const buttonTeams = screen.getByTestId("assessor-teams");
  fireEvent.click(buttonTeams);
  expect(screen.getByText(/List of Teams/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
