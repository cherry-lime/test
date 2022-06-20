import { TextField, ThemeOptions, ThemeProvider } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

/**
 * An editable textfield made specifically for weight factors
 * It accepts only integers values and gives errors for non-integers and empty value
 * @param weightValue current weight value
 * @param setWeight function to set the weight
 * @param theme inherited
 */
function TextfieldEditWeight({
  weightValue,
  setWeight,
  theme,
}: {
  weightValue: number;
  theme: ThemeOptions;
  setWeight: (weight: number) => void;
}) {
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
        // changes the weight value inherited
        setWeight(newValue);
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

TextfieldEditWeight.propTypes = {
  weightValue: PropTypes.number.isRequired,
  theme: PropTypes.node.isRequired,
};

export default TextfieldEditWeight;
