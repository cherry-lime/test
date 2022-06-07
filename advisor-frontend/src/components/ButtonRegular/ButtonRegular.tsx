import { createTheme, ThemeProvider, Button } from "@mui/material";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ff6200",
    },
  },
});

type Message = { name: string };

function ButtonRegular({ name }: Message) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          variant="contained"
          color="secondary"
          style={{ fontWeight: "600" }}
          onClick={() => {
            //  alert("Clicked") (action to be defined)
          }}
        >
          {name}
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default ButtonRegular;
