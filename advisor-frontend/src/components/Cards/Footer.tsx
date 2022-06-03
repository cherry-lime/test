import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import footerImg from "./footer_img.svg";

export default function Footer() {
  return (
    <Paper
      sx={{
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        backgroundColor: "secondary.main",
        position: "bottom",
      }}
    >
      <Box
        alignContent="bottom"
        sx={{
          height: "200px",
          overflow: "auto",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <img src={footerImg} alt="ING logo" />
      </Box>
    </Paper>
  );
}
