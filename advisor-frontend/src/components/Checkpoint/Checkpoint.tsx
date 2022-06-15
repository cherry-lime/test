import React, { useCallback, useState } from "react";
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

/*
passing parameter of the optional description of the checkpoints
description of checkpoint = description
description might be empty string
main function returning a checkpoint component 
*/
function Checkpoint({
  description,
  number,
  checkpointlabels,
  checkpointvalues,
  theme,
}: {
  description: string;
  number: number;
  checkpointlabels: string[];
  checkpointvalues: number[];
  theme: ThemeOptions;
}) {
  /*
  initial value of the checkpoint set to empty string
  using the State Hook in React
  set the value when clicking one of the radio-buttons
  */

  const [value, setValue] = useState("");

  const handleClick = useCallback(
    (event) => {
      if (event.target.value === value) {
        setValue("");
      } else if (event.target.value !== undefined) {
        setValue(event.target.value);
      }
    },
    [value]
  );

  /*
  the following for loop is used to dynamically generate an amount of checkpoints
  the amount of checkpoints is defined in checkpointvalues, which is an array of strings
  */
  const items = [];

  for (let i = 0; i < checkpointvalues.length; i += 1) {
    items.push(
      <FormControlLabel
        control={<Radio color="primary" />}
        label={checkpointlabels[i]}
        value={checkpointvalues[i].toString()}
      />
    );
  }

  return (
    /*  
    styling of the checkpoint
    there are three radio-buttons Yes, No and N/A in that order
    with horizontal direction (in a row)
    initially the value is empty string
    onClick update the value
    the styling of the checkpoint/radiobutton is in line with the color scheme
    darkgrey when not active and ING orange when selected/clicked
    */
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
            onClick={handleClick}
            row
          >
            <div>{items}</div>
          </RadioGroup>
          {/* {console.log(value)}  */}
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

/*
Props of the checkpoints consisting of the description,
the id number,
the values of the checkpoints,
and theme
*/
Checkpoint.propTypes = {
  description: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  checkpointvalues: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  checkpointlabels: PropTypes.any.isRequired,
  theme: PropTypes.node.isRequired,
};

export default Checkpoint;
