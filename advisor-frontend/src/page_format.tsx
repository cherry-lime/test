import { Transform } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import Header from "./components/Cards/Header";
import Body from "./components/Cards/Body";
import Footer from "./components/Cards/Footer";

function BlankPage() {
  return (
    <>
      <Box>
        <Header name="Home" />
      </Box>
      <Body />
      <Footer />
    </>
  );
}

export default function TestPage() {
  return <BlankPage />;
}
