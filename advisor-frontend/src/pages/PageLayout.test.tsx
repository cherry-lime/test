import { render, cleanup, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import PageLayout from "./PageLayout";
import userTypes from "../components/Sidebar/listUsersTypes";
import { store } from "../app/store";

afterEach(cleanup);

it("PageLayout rendering without crash", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <PageLayout title="test" sidebarType={userTypes.ADMIN}>
          text
        </PageLayout>
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Home");
});
