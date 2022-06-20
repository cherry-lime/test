import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "../Sidebar";
import userType from "../listUsersTypes";

afterEach(cleanup);

it("user sidebar rendering without crash", () => {
  render(
    <BrowserRouter>
      <Sidebar sidebarType={userType.USER} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Home");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Evaluations");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Teams");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Settings");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Sign Out");
  expect(screen.getByTestId("Sidebar")).not.toHaveTextContent("Templates");
  fireEvent.click(screen.getByTestId("DrawerButton"));
});
it("assessor sidebar rendering without crash", () => {
  render(
    <BrowserRouter>
      <Sidebar sidebarType={userType.ASSESSOR} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Home");
  expect(screen.getByTestId("Sidebar")).not.toHaveTextContent("Evaluations");
  expect(screen.getByTestId("Sidebar")).not.toHaveTextContent("Templates");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Teams");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Settings");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Sign Out");
  fireEvent.click(screen.getByTestId("DrawerButton"));
});
it("admin sidebar rendering without crash", () => {
  render(
    <BrowserRouter>
      <Sidebar sidebarType={userType.ADMIN} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Home");
  expect(screen.getByTestId("Sidebar")).not.toHaveTextContent("Evaluations");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Templates");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Teams");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Settings");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Sign Out");
  fireEvent.click(screen.getByTestId("DrawerButton"));
});
