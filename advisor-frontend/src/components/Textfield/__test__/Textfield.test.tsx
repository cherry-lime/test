import { createTheme } from "@mui/material";
import { render, cleanup } from "@testing-library/react";
import Textfield from "../Textfield";

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

//  test rendering of the noneditable textfield and check of bodytext
it("Rendering without crash and check placeholdertext", () => {
  const { getByText } = render(<Textfield text="lorem ipsum" theme={theme} />);
  expect(getByText("lorem ipsum")).toBeInTheDocument();
});
