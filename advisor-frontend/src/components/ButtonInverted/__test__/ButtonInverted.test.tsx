import { render, cleanup, fireEvent } from "@testing-library/react";
import ButtonInverted from "../ButtonInverted";

afterEach(cleanup);

it("Rendering without crash and click", () => {
  const { getByText } = render(<ButtonInverted name2="ClickButton" />);
  expect(getByText("ClickButton")).toBeInTheDocument();
  fireEvent.click(getByText("ClickButton"));
});
