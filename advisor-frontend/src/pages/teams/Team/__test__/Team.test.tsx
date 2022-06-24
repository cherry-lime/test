import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../app/store";
import Theme from "../../../../Theme";
import Team from "../Team";

const queryClient = new QueryClient();

test("app rendering/navigating from assessor view to specific team evaluation", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Team theme={Theme} />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
  expect(screen.getByText(/Team Information/i)).toBeInTheDocument();
  expect(screen.getByText(/Country/i)).toBeInTheDocument();
  expect(screen.getByText(/Members/i)).toBeInTheDocument();
  expect(screen.getByText(/Ongoing Evaluations/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
