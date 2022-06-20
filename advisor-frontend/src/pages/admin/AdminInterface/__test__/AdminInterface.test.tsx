import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../../../../App";

test("app rendering/navigating from admin interface to individuals", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const button = screen.getByTestId("admin");
  fireEvent.click(button);
  expect(screen.getByText(/Admin Home/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
