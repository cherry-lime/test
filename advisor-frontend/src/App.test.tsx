import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
const queryClient = new QueryClient();

test("app rendering/navigating to user interface", async () => {
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
});

test("app rendering/navigating to admin interface", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
  const button = screen.getByTestId("admin");
  fireEvent.click(button);
  expect(screen.getByText(/Admin Home/i)).toBeInTheDocument();
});

test("app rendering/navigating to assessor interface", async () => {
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
  const button = screen.getByTestId("assessor");
  fireEvent.click(button);
  expect(screen.getByText(/assessor Interface here/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases

describe("test suite of test cases", () => {
  test("testcase1", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    );
    // expect(to be tested function or component).toBe(expected result of the component);
    // example:
    // test('1 represents a true value', () => {
    //  expect(1).toBe(true)
    // }
    // test('in order to access the application, the user shall provide login credentials', () => {
    //  expect(login screen).toBe(displayed)
    // }
    // describe ('general', () => {
    //
    //    test('valid credentials1', () => {
    //      const {userName} = fetchUsername()
    //      expect(userName).toBeValid('true')
    //
    //    test('valid credentials2', () => {
    //      const {passWord} = fetchpassword()
    //      expect(passWord).toBeValid('true')
    //
    //
    // })
  });
});
