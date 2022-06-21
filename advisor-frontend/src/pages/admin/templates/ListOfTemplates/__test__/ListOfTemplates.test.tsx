import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../../app/store";
import ListOfTemplates from "../ListOfTemplates";

test("app render list of templates", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ListOfTemplates />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Individual Templates/i)).toBeInTheDocument();
  expect(screen.getByText(/Team Templates/i)).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
