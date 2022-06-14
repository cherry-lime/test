import { render, cleanup, screen } from "@testing-library/react";
import PageLayout from "./PageLayout";
import userTypes from "../components/Sidebar/listUsersTypes";

afterEach(cleanup);

it("PageLayout rendering without crash", () => {
  render(
    <PageLayout title="test" sidebarType={userTypes.ADMIN}>
      text
    </PageLayout>
  );
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Home");
});
