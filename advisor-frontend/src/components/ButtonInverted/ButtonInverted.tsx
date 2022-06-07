import { createTheme, ThemeProvider, Button } from "@mui/material";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ff6200",
    },
  },
});

type Message = { name2: string };

function ButtonInverted({ name2 }: Message) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          sx={{
            backgroundColor: "white",
          }}
          variant="outlined"
          color="secondary"
          style={{ fontWeight: "600" }}
          onClick={() => {
            //  alert("Clicked"); action to be defined
          }}
        >
          {name2}{" "}
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default ButtonInverted;
