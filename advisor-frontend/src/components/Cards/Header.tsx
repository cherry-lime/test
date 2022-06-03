import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import headerImg from "./header_img.svg"

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

type Message = { name: string };
const headerHeight = 200;

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
          flexDirection: "column"
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
        <img src={headerImg} alt="Title bar"/>
      </Box>
    </Paper>
  );
}
