import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../Sidebar";

afterEach(cleanup);

it("rendering without crash", () => {
  render(<Sidebar />);
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Home");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Evaluations");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Teams");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Settings");
  expect(screen.getByTestId("Sidebar")).toHaveTextContent("Sign Out"); // the correct one
  fireEvent.click(screen.getByTestId("DrawerButton"));

  // expect(container.classList.contains('MuiDrawer-root MuiDrawer-docked css-6d2i2j-MuiDrawer-docked"')).toBe(true)

  // expect(screen.getByTestId("DrawerButton")).toHaveClass("MuiDrawer-root MuiDrawer-docked css-6d2i2j-MuiDrawer-docked");
  // expect(screen.getByTestId('Sidebar')).toHaveTextContent("ClickButton2") // on purpose created an error
});
