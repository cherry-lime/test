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

//  passing parameter of the regular button text
//  button text = name
type Message = { name: string };

//  fill regular button with ING orange color according to style
//  fonttext is bold
//  style is filled with background fontcolor
//  size of the button is depending on the length of the button text string
function ButtonRegular({ name }: Message) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ fontWeight: "600" }}
          onClick={() => {
            //  alert("Clicked")
            //  action when clicking the button
          }}
        >
          {name}
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default ButtonRegular;
