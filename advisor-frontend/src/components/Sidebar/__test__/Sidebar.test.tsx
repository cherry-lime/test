import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../Sidebar";
import { user, assessor, admin } from "../listUsersTypes";

afterEach(cleanup);

it("user sidebar rendering without crash", () => {
  render(<Sidebar sidebarType={user} />);
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Home");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Evaluations");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Teams");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Settings");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Sign Out");
  expect(screen.getByTestId("Sidebar")).not.toHaveTextContent("Templates");
  fireEvent.click(screen.getByTestId("DrawerButton"));
});
it("assessor sidebar rendering without crash", () => {
  render(<Sidebar sidebarType={assessor} />);
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Home");
  expect(screen.getByTestId("Sidebar")).not.toHaveTextContent("Evaluations");
  expect(screen.getByTestId("Sidebar")).not.toHaveTextContent("Templates");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Teams");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Settings");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Sign Out");
  fireEvent.click(screen.getByTestId("DrawerButton"));
});
it("admin sidebar rendering without crash", () => {
  render(<Sidebar sidebarType={admin} />);
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Home");
  expect(screen.getByTestId("Sidebar")).not.toHaveTextContent("Evaluations");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Templates");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Teams");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Settings");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Sign Out");
  fireEvent.click(screen.getByTestId("DrawerButton"));
});
