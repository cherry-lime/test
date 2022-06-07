import { TextField, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";

type Message = { bodytext: string };

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ff6200",
    },
  },
});

function TextfieldEdit({ bodytext }: Message) {
  const initialState = bodytext;
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
        color="secondary"
        multiline
        rows={5}
        size="small"
        InputProps={{ color: "secondary" }}
        value={value}
        onChange={doSomething}
      />
    </ThemeProvider>
  );
}

export default TextfieldEdit;
