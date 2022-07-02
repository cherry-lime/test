import {
  ClickAwayListener,
  TextField,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";

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
  error,
}: {
  weightValue: number;
  theme: ThemeOptions;
  setWeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  error: boolean;
}) {
  const initialState = weightValue.toString();
  const [blankError, setBlankError] = useState(false);
  const [value, setValue] = useState(initialState);

  const handleChangeWeight = () => {
    if (value === "") {
      setBlankError(true);
    } else {
      const newValue = Number(value);
      setBlankError(false);
      // changes the weight value inherited
      setWeight(newValue);
    }
  };

  const handleIntermediateChange = (newValue: string) => {
    setValue(newValue);
    setBlankError(!newValue);
  };

  const blankErrorLabel = "Fill in a positive integer value.";

  return (
    <ThemeProvider theme={theme}>
      <ClickAwayListener onClickAway={handleChangeWeight}>
        <TextField
          type="number"
          sx={{
            width: "170px",
            position: "relative",
          }}
          variant="outlined"
          label={error || blankError ? "Invalid input (not saved)" : ""}
          helperText={blankError ? blankErrorLabel : ""}
          value={value}
          onChange={(e) => handleIntermediateChange(e.target.value)}
          error={error || blankError}
        />
      </ClickAwayListener>
    </ThemeProvider>
  );
}

export default TextfieldEditWeight;
