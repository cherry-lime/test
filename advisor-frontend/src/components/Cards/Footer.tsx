import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import footerImg from "./footer_img.svg"
import { display } from "@mui/system";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const headerHeight = "10vh";

export default function Footer() {
  return (
    <Paper
      sx={{
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        backgroundColor: "secondary.main",
        position: "bottom"
      }}
    >
      <Box alignContent='bottom' sx={{
        height: "200px",
        overflow: 'auto',
        justifyContent: 'center',
        alignItems: "center",
        display: 'flex'
      }} >
        <img src={footerImg} alt="ING logo"/>
      </Box>
    </Paper>
  );
}
