import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../../../App";
import client from "../../../../app/client";
import { store } from "../../../../app/store";

const queryClient = new QueryClient();

test("app rendering/navigating from assessor view to specific team", async () => {
  render(
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
  const button = screen.getByTestId("assessor");
  fireEvent.click(button);
  const buttonTeams = screen.getByTestId("assessor-teams");
  fireEvent.click(buttonTeams);
  // expect(screen.getByText(/Create new team/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
