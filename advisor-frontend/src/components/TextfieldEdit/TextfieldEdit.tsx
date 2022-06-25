import {
  ClickAwayListener,
  TextField,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
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
  handleSave,
}: {
  text: string;
  theme: ThemeOptions;
  rows: number;
  handleSave: (intermediateValue: string) => void;
}) {
  /*
  initial value of the textfield is set to the bodytext passed as parameter
  using the State Hook in React
  the value is updated when you are done entering and click outside the textfield
  */
  const [intermediateValue, setIntermediateValue] = useState(text);
  let multiline = false;

  const handleModify = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntermediateValue(event.target.value);
  };

  const handleSaveDecorator = () => {
    handleSave(intermediateValue);
  };

  /*
  if the textfield has only one row then
  multiline must be disabled,
  e.g,. in country + IT department textfields
  */
  if (rows > 1) {
    multiline = true;
  } else {
    multiline = false;
  }

  React.useEffect(() => {
    setIntermediateValue(text);
  }, [text]);

  return (
    <ThemeProvider theme={theme}>
      <ClickAwayListener onClickAway={handleSaveDecorator}>
        <TextField
          sx={{
            backgroundColor: "white",
            width: "inherit",
            marginTop: "10px",
          }}
          variant="outlined"
          multiline={multiline}
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
  rows: PropTypes.number.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default TextfieldEdit;
