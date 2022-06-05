import Paper from "@mui/material/Paper";
import { Box, Typography, Link } from "@mui/material";
import footerImg from "./footer_img.svg";

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

export default function Footer() {
  return (
    <Paper
      sx={{
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        backgroundColor: "secondary.main",
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
