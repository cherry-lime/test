import { createTheme } from "@mui/material";

const INGTheme = createTheme({
  palette: {
    primary: {
      light: "#FFD6B1", // Light Orange
      main: "#FF6200", // Orange
      dark: "#AA3909", // Dark Orange
    },
    secondary: {
      // Lightest Grey: #FAF6F3
      light: "#EDE6E2", // Light Grey
      main: "#8B817C", // Grey
      dark: "#5A534F", // Dark Grey
    },
    text: {
      primary: "#5A534F", // Dark Grey
    },
    info: {
      main: "#ffffff", // White color for icons.
    }
  },
});
export default INGTheme;
