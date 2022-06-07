import { TextField, createTheme, ThemeProvider } from "@mui/material";

//  passing parameter of the bodytext of the textfield (noneditable)
//  body text might be empty string
type Message = { bodytext2: string };

//  coloring theme aligned with UI design
//  ING orange is ff6200
//  darkgray is 5a534f
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6200",
    },
    secondary: {
      main: "#5a534f",
    },
    text: {
      primary: "5a534f",
    },
  },
});

//  size of the textfield is specified with the parameter width (in characters)
//  default set to 50
//  and by the number of rows
//  default set to five
//  the background color of the text is white
//  text can not be edited, but can be selected
function Textfield({ bodytext2 }: Message) {
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
        InputProps={{ readOnly: true }}
        value={bodytext2}
      />
    </ThemeProvider>
  );
}

export default Textfield;
