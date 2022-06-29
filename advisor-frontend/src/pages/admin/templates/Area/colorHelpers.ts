/* eslint-disable no-bitwise */
import { createTheme, Theme } from "@mui/material";

export const lightenDarkenColor = (color: string, amt: number) => {
  const colorNumber = parseInt(color.slice(1), 16);
  const newColor = (
    ((colorNumber & 0x0000ff) + amt) |
    ((((colorNumber >> 8) & 0x00ff) + amt) << 8) |
    (((colorNumber >> 16) + amt) << 16)
  ).toString(16);
  return `#${newColor}`;
};

export const getUpdatedTheme = (primaryColor: string, theme: Theme) =>
  createTheme(theme, {
    palette: {
      primary: {
        main: primaryColor,
        light: lightenDarkenColor(primaryColor, 20),
        dark: lightenDarkenColor(primaryColor, -20),
      },
    },
  });

export default getUpdatedTheme;
