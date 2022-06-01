import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// describe block = test suite
// test block = test case
// test suite can have multiple test cases

describe("test suite of test cases", () => {
  test("testcase1", () => {
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
