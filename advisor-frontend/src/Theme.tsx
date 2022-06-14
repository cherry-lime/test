import { createTheme } from "@mui/material";

const INGTheme = createTheme({
  palette: {
    primary: {
      light: "#FFD6B1", // Light Orange
      main: "#FF6200", // Orange
      dark: "#AA3909", // Dark Orange
    },
    secondary: {
      light: "#EDE6E2", // Light Grey
      main: "#8B817C", // Grey
      dark: "#5A534F", // Dark Grey
    },
    text: {
      secondary: "#5A534F", // Dark Grey
    },
    info: {
      light: "#FAF6F3", // Lightest Grey
      main: "#ffffff", // White color for icons.
    },
    background: {
      paper: "#ff6404", // Different shade of orange, used as opaque overlay color
    },
  },
});
export default INGTheme;
