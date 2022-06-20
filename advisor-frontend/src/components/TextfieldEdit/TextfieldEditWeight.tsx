import { TextField, ThemeOptions, ThemeProvider } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

/*
size of the textfield is specified with the parameter width (in characters)
default set to 50
and by the number of rows
default set to five
the background color of the text is white
text can be edited, after selection
*/
function TextfieldEditWeight({
  weightValue,
  theme,
}: {
  weightValue: number;
  theme: ThemeOptions;
}) {
  /*
  initial value of the textfield is set to the bodytext passed as parameter
  using the State Hook in React
  the value is updated when you are done entering and click outside the textfield
  */
  const initialState = weightValue.toString();
  const [error, setError] = useState(false);
  const [value, setValue] = useState(initialState);
  const doSomething = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setError(true);
      setValue("");
    } else {
      const newValue = Number(event.target.value);
      if (Number.isInteger(newValue)) {
        setError(false);
        setValue(newValue.toString());
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <TextField
        type="number"
        sx={{
          width: "160px",
          position: "relative",
        }}
        variant="outlined"
        label={error ? "Error" : ""}
        helperText={error ? "Fill in an integer value" : ""}
        value={value}
        onChange={doSomething}
        error={error}
      />
    </ThemeProvider>
  );
}
/*
Define proptypes for textfieldedit:
1) text (which will be seen in the textfield)
2) theme (according to UI)
*/
TextfieldEditWeight.propTypes = {
  weightValue: PropTypes.number.isRequired,
  theme: PropTypes.node.isRequired,
};

export default TextfieldEditWeight;
