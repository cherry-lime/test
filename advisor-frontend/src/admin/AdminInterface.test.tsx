import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

test("app rendering/navigating from admin interface to templates", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const button = screen.getByTestId("admin");
  fireEvent.click(button);
  expect(screen.getByText(/admin Interface/i)).toBeInTheDocument();

  const buttonTeams = screen.getByTestId("templates");
  fireEvent.click(buttonTeams);
  expect(screen.getByText(/List of Templates/i)).toBeInTheDocument();
});

test("app rendering/navigating from admin interface to individuals", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const button = screen.getByTestId("admin");
  fireEvent.click(button);
  const buttonIndividuals = screen.getByTestId("individuals");
  fireEvent.click(buttonIndividuals);
  expect(screen.getByText(/List of Individuals/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
