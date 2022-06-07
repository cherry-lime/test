import { render, cleanup } from "@testing-library/react";
import Textfield from "../Textfield";

afterEach(cleanup);

it("Rendering without crash and check placeholdertext", () => {
  const { getByPlaceholderText } = render(
    <Textfield bodytext2="lorem ipsum" />
  );
  expect(getByPlaceholderText("lorem ipsum")).toBeInTheDocument();
});
