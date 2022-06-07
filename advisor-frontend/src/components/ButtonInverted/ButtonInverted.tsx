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

//  passing parameter of the inverted button text
//  button text = name2
type Message = { name2: string };

//  function that returns component button in inverted color scheme
//  name2 = button text
//  size of the button is depending on the length of the button text string

function ButtonInverted({ name2 }: Message) {
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
          {name2}{" "}
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default ButtonInverted;
