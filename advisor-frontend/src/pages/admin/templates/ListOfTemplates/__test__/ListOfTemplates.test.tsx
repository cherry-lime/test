import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../../app/store";
import Theme from "../../../../../Theme";
import ListOfTemplates from "../ListOfTemplates";

const queryClient = new QueryClient();

test("app render list of templates", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ListOfTemplates theme={Theme} />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
  expect(screen.getByText(/Individual Templates/i)).toBeInTheDocument();
  expect(screen.getByText(/Team Templates/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
