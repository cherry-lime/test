import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ListOfTemplates from "../ListOfTemplates";

test("app render list of templates", async () => {
  render(
    <BrowserRouter>
      <ListOfTemplates />
    </BrowserRouter>
  );
  expect(screen.getByText(/Individual Templates/i)).toBeInTheDocument();
  expect(screen.getByText(/Team Templates/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
