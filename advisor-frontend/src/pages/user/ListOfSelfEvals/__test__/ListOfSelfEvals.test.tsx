import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../../../App";
import { store } from "../../../../app/store";

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

  const buttonEvals = screen.getByTestId("user-evals");
  fireEvent.click(buttonEvals);

  const buttonEval = screen.getByTestId("user-eval-43");
  fireEvent.click(buttonEval);

  expect(screen.getByText(/Individual Evaluation/i)).toBeInTheDocument();
});

test("app rendering/navigating from user interface to feedback on self-eval", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByTestId("user");
  fireEvent.click(button);

  const buttonEvals = screen.getByTestId("user-evals");
  fireEvent.click(buttonEvals);

  const buttonEval = screen.getByTestId("user-feedback-66");
  fireEvent.click(buttonEval);

  expect(
    screen.getByText(/Individual Evaluation Feedback/i)
  ).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
