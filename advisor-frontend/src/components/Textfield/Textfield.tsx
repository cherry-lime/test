import { TextField, createTheme, ThemeProvider } from "@mui/material";

type Message = { bodytext2: string };

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
