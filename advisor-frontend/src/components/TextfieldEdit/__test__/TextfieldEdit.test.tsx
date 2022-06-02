import {render, cleanup, fireEvent} from "@testing-library/react";
import TextfieldEdit from "../TextfieldEdit";

afterEach(cleanup);

it("Rendering without crash and check editable text and click", () => {
  const {getByText} = render(<TextfieldEdit bodytext="lorem ipsum"/>);
  expect(getByText("lorem ipsum")).toBeInTheDocument();
  fireEvent.click(getByText("lorem ipsum"));
});