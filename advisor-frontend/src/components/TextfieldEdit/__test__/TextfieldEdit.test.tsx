import { render, cleanup, fireEvent } from "@testing-library/react";
import TextfieldEdit from "../TextfieldEdit";

afterEach(cleanup);

it("Rendering without crash", () => {
  const { getByText } = render(<TextfieldEdit bodytext="lorem ipsum" />);
  expect(getByText("lorem ipsum")).toBeInTheDocument();
});

it("Check input change", () => {
  const { getByText } = render(<TextfieldEdit bodytext="lorem ipsum" />);
  const inputElement = getByText("lorem ipsum") as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: "lorem ipsum changed" } });
  expect(getByText("lorem ipsum changed")).toBeInTheDocument();
});
