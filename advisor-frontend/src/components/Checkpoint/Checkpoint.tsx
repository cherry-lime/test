import React, { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

//  coloring theme aligned with UI design
//  ING orange is ff6200
//  darkgray is 5a534f
//  the labels are darkgrey according style
//  the radio buttons are ING orange according style
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6200",
    },
    secondary: {
      main: "#5a534f",
    },
    text: {
      primary: "#5a534f",
    },
  },
});

//  passing parameter of the optional description of the checkpoints
//  description of checkpoint = description
//  description might be empty string
type Message = { description: string };

//  main function returning a checkpoint component
function Checkpoint({ description }: Message) {
  //  initial value of the checkpoint set to empty string
  //  using the State Hook in React
  //  set the value when clicking one of the radio-buttons
  const [value, setValue] = useState("");
  const doSomething = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    //  styling of the checkpoint
    //  there are three radio-buttons Yes, No and N/A in that order
    //  with horizontal direction (in a row)
    //  initially the value is empty string
    //  onClick update the value
    //  the styling of the checkpoint/radiobutton is in line with the color scheme
    //  darkgrey when not active and ING orange when selected/clicked
    <ThemeProvider theme={theme}>
      <Box>
        <FormControl>
          <FormLabel id="checkpointnamelabel" color="secondary">
            {description}
          </FormLabel>
          <RadioGroup
            color="text.primary"
            name="checkpointname"
            aria-labelledby="checkpointnamelabel"
            value={value}
            onChange={doSomething}
            row
          >
            <FormControlLabel
              control={<Radio color="primary" />}
              label="Yes"
              value="Yes"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              label="No"
              value="No"
            />
            <FormControlLabel
              control={<Radio color="primary" />}
              label="N/A"
              value="N/A"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}

export default Checkpoint;
