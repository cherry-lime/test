import { TextField, createTheme, ThemeProvider } from "@mui/material";

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
function Textfield({ text }: { text: string }) {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        sx={{
          backgroundColor: "white",
          width: "50ch",
        }}
        variant="outlined"
        color="secondary"
        multiline
        rows={5}
        InputProps={{ readOnly: true }}
        value={text}
      />
    </ThemeProvider>
  );
}

export default Textfield;
