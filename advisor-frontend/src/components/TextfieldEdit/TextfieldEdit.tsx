import { TextField, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";

/*
coloring theme aligned with UI design
ING orange is ff6200
darkgray is 5a534f
*/
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

/*
size of the textfield is specified with the parameter width (in characters)
default set to 50
and by the number of rows
default set to five
the background color of the text is white
text can be edited, after selection
*/
function TextfieldEdit({ text }: { text: string }) {
  /*
  initial value of the textfield is set to the bodytext passed as parameter
  using the State Hook in React
  the value is updated when you are done entering and click outside the textfield
  */
  const initialState = text;
  const [value, setValue] = useState(initialState);
  const doSomething = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <TextField
        sx={{
          backgroundColor: "white",
          width: "50ch",
        }}
        variant="outlined"
        color="primary"
        multiline
        rows={5}
        size="small"
        value={value}
        onChange={doSomething}
      />
    </ThemeProvider>
  );
}

export default TextfieldEdit;
