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

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6200",
    },
    secondary: {
      main: "#5a534f",
    },
  },
});

type Message = { description: string };

function Checkpoint({ description }: Message) {
  const [value, setValue] = useState("");
  const doSomething = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <FormControl>
          <FormLabel id="checkpointnamelabel" color="secondary">
            {description}
          </FormLabel>
          <RadioGroup
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
