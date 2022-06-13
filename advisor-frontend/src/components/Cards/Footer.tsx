import Paper from "@mui/material/Paper";
import { Box, Typography, Link } from "@mui/material";
import footerImg from "./footer_img.svg";

/**
 * Copyright function that will render the name, year and a link to the authors.
 * @returns A line at the bottom of the page that includes the Copyright informations
 */
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://tue.nl">
        TU/e
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

/**
 * A function to render a footer at the bottom of the page.ƒ
 * @returns A footer component, which contains the ING logo
 */

export default function Footer() {
  return (
    <Paper
      sx={{
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        backgroundColor: "primary.main",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "200px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: "auto",
        }}
      >
        <img src={footerImg} alt="ING logo" />
        <Copyright />
      </Box>
    </Paper>
  );
}
