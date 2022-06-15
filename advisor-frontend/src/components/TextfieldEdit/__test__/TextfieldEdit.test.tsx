import { createTheme } from "@mui/material";
import { render, cleanup, fireEvent } from "@testing-library/react";
import TextfieldEdit from "../TextfieldEdit";

//  cleanup after each test case
afterEach(cleanup);

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6200",
    },
    secondary: {
      main: "#5a534f",
    },
    text: {
      primary: "#5a534f",
    },
  },
});

//  test rendering of the editable textfield and check of bodytext
it("Rendering without crash", () => {
  const { getByText } = render(
    <TextfieldEdit text="lorem ipsum" theme={theme} />
  );
  expect(getByText("lorem ipsum")).toBeInTheDocument();
});

//  test the change of the bodytext after editing in the textfield
it("Check input change", () => {
  const { getByText } = render(
    <TextfieldEdit text="lorem ipsum" theme={theme} />
  );
  const inputElement = getByText("lorem ipsum") as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: "lorem ipsum changed" } });
  expect(getByText("lorem ipsum changed")).toBeInTheDocument();
});
