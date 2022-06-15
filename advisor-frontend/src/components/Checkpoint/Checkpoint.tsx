import React, { useState } from "react";
import {
  ThemeProvider,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { ThemeOptions } from "@mui/material/styles/experimental_extendTheme";

//  passing parameter of the optional description of the checkpoints
//  description of checkpoint = description
//  description might be empty string
//  main function returning a checkpoint component
function Checkpoint({
  description,
  number,
  theme,
}: {
  description: string;
  number: number;
  theme: ThemeOptions;
}) {
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
      <Card sx={{ width: "95%", alignSelf: "center" }}>
        <CardContent>
          <Typography
            sx={{
              width: "5%",
              minWidth: "60px",
              float: "left",
              fontSize: "24px",
              fontWeight: "bold",
            }}
            id="checkpointnrlabel"
          >
            {number}
          </Typography>
          <Typography sx={{ textAlign: "left" }} id="checkpointnamelabel">
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
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
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

Checkpoint.propTypes = {
  description: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  theme: PropTypes.node.isRequired,
};

export default Checkpoint;
