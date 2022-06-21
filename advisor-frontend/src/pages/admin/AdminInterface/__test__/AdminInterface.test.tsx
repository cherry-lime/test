import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../../../../App";
import { store } from "../../../../app/store";

test("app rendering/navigating from admin interface to individuals", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByTestId("admin");
  fireEvent.click(button);
  expect(screen.getByText(/Admin Home/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
