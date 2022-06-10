import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import PageLayout from "./PageLayout";
import { user } from "../components/Sidebar/listUsersTypes";

afterEach(cleanup);

it("PageLayout rendering without crash", () => {
  render(
    <PageLayout title="test" sidebarType={user}>
      text
    </PageLayout>
  );
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Home");
});
