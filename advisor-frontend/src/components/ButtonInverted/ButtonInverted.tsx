import { createTheme, ThemeProvider, Button } from "@mui/material";

//  coloring theme aligned with UI design
//  ING orange is ff6200
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6200",
    },
  },
});

//  function that returns component button in inverted color scheme
//  text = button text
//  size of the button is depending on the length of the button text string

function ButtonInverted({ text }: { text: string }) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          //  set background color of inverted button to white
          //  style is outlined
          //  fonttext is bold
          sx={{
            backgroundColor: "white",
          }}
          variant="outlined"
          color="primary"
          style={{ fontWeight: "600" }}
          onClick={() => {
            //  alert("Clicked");
            //  action when clicking the button
          }}
        >
          {text}{" "}
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default ButtonInverted;
