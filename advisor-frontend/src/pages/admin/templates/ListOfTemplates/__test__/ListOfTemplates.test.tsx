import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../../../../App";
import { store } from "../../../../../app/store";

test("app rendering/navigating from admin interface to speficictemplates", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByTestId("admin");
  fireEvent.click(button);
  expect(screen.getByText(/admin Interface/i)).toBeInTheDocument();

  const buttonTemplates = screen.getByTestId("templates");
  fireEvent.click(buttonTemplates);
  expect(screen.getByText(/List of Templates/i)).toBeInTheDocument();

  const buttonTemplate = screen.getByTestId("template-21");
  fireEvent.click(buttonTemplate);
  expect(
    screen.getByText(/Template options for template id 21/i)
  ).toBeInTheDocument();
});

// describe block = test suite
// test block = test case
// test suite can have multiple test cases
