import { createTheme } from "@mui/material";

/**
 * In this Theme.tsx file you can see the colors below that will be used
 * a lot in the front-end UI for TestING Advisor
 * for e.g.: colour of the texts in components and background colour
 */
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
      default: "#ffffff", // Used to define the custom sidebar text color.
    },
  },
});
export default INGTheme;
