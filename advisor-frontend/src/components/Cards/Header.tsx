import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import { useState } from "react";
import headerImg from "./header_img.svg";

type Message = { name: string };

export default function Header({ name }: Message) {
  const [text, setText] = useState(name);
  return (
    <Paper
      sx={{
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        backgroundColor: "secondary.main",
      }}
    >
      <Box
        alignContent="center"
        sx={{
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h3"
          color="info.main"
          sx={{
            marginTop: "-90px",
          }}
        >
          {text}
        </Typography>
        <img src={headerImg} alt="Title bar" />
      </Box>
    </Paper>
  );
}
