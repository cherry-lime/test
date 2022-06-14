import { render, cleanup } from "@testing-library/react";
import Textfield from "../Textfield";

//  cleanup after each test case
afterEach(cleanup);

//  test rendering of the noneditable textfield and check of bodytext
it("Rendering without crash and check placeholdertext", () => {
  const { getByText } = render(<Textfield text="lorem ipsum" />);
  expect(getByText("lorem ipsum")).toBeInTheDocument();
});
