import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import { useState } from "react";
import headerImg from "./header_img.svg";

type Message = { name: string; bgcolor?: string };

const defaultProps = {
  bgcolor: "secondary.main",
};

/**
 * 
 * @description Header function, which will display a header, with a speific title.
 * @param name used to display the header title.
 * @param bgcolor used to give a specific background color.
 * @returns React header component.
 */

export default function Header({ name, bgcolor }: Message) {
  const [text] = useState(name);
  return (
    <Paper
      sx={{
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        backgroundColor: bgcolor,
      }}
      data-testid="headerID"
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
Header.defaultProps = defaultProps;
