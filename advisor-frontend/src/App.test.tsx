import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("app rendering/navigating to user interface", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const button = screen.getByTestId("user");
  fireEvent.click(button);
  expect(screen.getByText(/Home User/i)).toBeInTheDocument();
});

test("app rendering/navigating to admin interface", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const button = screen.getByTestId("admin");
  fireEvent.click(button);
  expect(screen.getByText(/Admin Interface/i)).toBeInTheDocument();
});

test("app rendering/navigating to assessor interface", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
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
      <BrowserRouter>
        <App />
      </BrowserRouter>
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
