import { createTheme } from "@mui/material";
import { grey, orange } from "@mui/material/colors";

const INGTheme = createTheme({
    palette: {
      primary: {
        main: grey[500],
      },
      secondary: {
        main: orange[500],
      },
      info: {
        light: "#ff7961",
        main: "#ffffff",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
  export default INGTheme;