import { render, cleanup, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PageLayout from "./PageLayout";
import userTypes from "../components/Sidebar/listUsersTypes";

afterEach(cleanup);

it("PageLayout rendering without crash", () => {
  render(
    <BrowserRouter>
      <PageLayout title="test" sidebarType={userTypes.ADMIN}>
        text
      </PageLayout>
    </BrowserRouter>
  );
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Home");
});
