import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../../../../App";
import { store } from "../../../../app/store";

test("app rendering/navigating from user interface to self-evals", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByTestId("user");
  fireEvent.click(button);
  const buttonEvals = screen.getByTestId("user-evals");
  fireEvent.click(buttonEvals);
  expect(screen.getByText(/Ongoing Evaluations/i)).toBeInTheDocument();
  expect(screen.getByText(/Completed Evaluations/i)).toBeInTheDocument();
});
