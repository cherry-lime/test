import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import { useState } from "react";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

type Message = { name: string };
const headerHeight = "10vh";

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
      <Box alignContent='center' sx={{
        height: "200px",
      }} >
        <Typography color="info.main">{text} </Typography>
        
      </Box>
    </Paper>
  );
}
