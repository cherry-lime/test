import { render, cleanup, fireEvent } from "@testing-library/react";
import TextfieldEdit from "../TextfieldEdit";

//  cleanup after each test case
afterEach(cleanup);

//  test rendering of the editable textfield and check of bodytext
it("Rendering without crash", () => {
  const { getByText } = render(<TextfieldEdit text="lorem ipsum" />);
  expect(getByText("lorem ipsum")).toBeInTheDocument();
});

//  test the change of the bodytext after editing in the textfield
it("Check input change", () => {
  const { getByText } = render(<TextfieldEdit text="lorem ipsum" />);
  const inputElement = getByText("lorem ipsum") as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: "lorem ipsum changed" } });
  expect(getByText("lorem ipsum changed")).toBeInTheDocument();
});
