import {
  ClickAwayListener,
  TextField,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
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
function TextfieldEdit({
  text,
  theme,
  rows,
}: {
  text: string;
  theme: ThemeOptions;
  rows: number;
}) {
  /*
  initial value of the textfield is set to the bodytext passed as parameter
  using the State Hook in React
  the value is updated when you are done entering and click outside the textfield
  */
  const initialState = text;
  const [, setValue] = useState(initialState);
  const [intermediateValue, setIntermediateValue] = useState(initialState);

  const handleSave = () => {
    // here you save the new text
    // that is contained in intermediateValue
    setValue(intermediateValue);
  };

  const handleModify = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntermediateValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <ClickAwayListener onClickAway={handleSave}>
        <TextField
          sx={{
            backgroundColor: "white",
            width: "inherit",
            marginTop: "10px",
          }}
          variant="outlined"
          multiline
          rows={rows}
          size="small"
          value={intermediateValue}
          onChange={handleModify}
        />
      </ClickAwayListener>
    </ThemeProvider>
  );
}
/*
Define proptypes for textfieldedit:
1) text (which will be seen in the textfield)
2) theme (according to UI)
*/
TextfieldEdit.propTypes = {
  text: PropTypes.string.isRequired,
  theme: PropTypes.node.isRequired,
};

export default TextfieldEdit;
