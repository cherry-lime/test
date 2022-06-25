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
  expect(
    screen.getByText(/View and start individual evaluations/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/View your teams/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
