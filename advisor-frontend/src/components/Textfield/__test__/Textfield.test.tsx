import { render, cleanup } from "@testing-library/react";
import Textfield from "../Textfield";

afterEach(cleanup);

it("Rendering without crash and check placeholdertext", () => {
  const { getByText } = render(<Textfield bodytext2="lorem ipsum" />);
  expect(getByText("lorem ipsum")).toBeInTheDocument();
});
