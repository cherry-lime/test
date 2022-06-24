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
  expect(screen.getByText(/Create new team/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
