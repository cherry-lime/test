import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../../../App";
import { store } from "../../../../app/store";

const queryClient = new QueryClient();

test("app rendering/navigating from user interface to self-evals", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
  const button = screen.getByTestId("user");
  fireEvent.click(button);

  const buttonEvals = screen.getByTestId("user-evals");
  fireEvent.click(buttonEvals);

  const buttonEval = screen.getByTestId("user-eval-43");
  fireEvent.click(buttonEval);

  expect(
    screen.getByText(/An Individual Evaluation with id 43/i)
  ).toBeInTheDocument();
});

test("app rendering/navigating from user interface to feedback on self-eval", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
  const button = screen.getByTestId("user");
  fireEvent.click(button);

  const buttonEvals = screen.getByTestId("user-evals");
  fireEvent.click(buttonEvals);

  const buttonEval = screen.getByTestId("user-feedback-66");
  fireEvent.click(buttonEval);

  expect(
    screen.getByText(/Recommendations for assessment with id 66/i)
  ).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
