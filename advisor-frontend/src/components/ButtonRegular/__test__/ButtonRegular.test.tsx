import { render, cleanup, fireEvent } from "@testing-library/react";
import ButtonRegular from "../ButtonRegular";

afterEach(cleanup);

it("Rendering without crash and click", () => {
  const { getByText } = render(<ButtonRegular name="ClickButton" />);
  expect(getByText("ClickButton")).toBeInTheDocument();
  fireEvent.click(getByText("ClickButton"));
});
