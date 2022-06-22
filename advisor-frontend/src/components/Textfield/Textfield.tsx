import { TextField, ThemeProvider, ThemeOptions } from "@mui/material";
import PropTypes from "prop-types";
/*
size of the textfield is specified with the parameter width (in characters)
default set to 50
and by the number of rows
default set to five
the background color of the text is white
text can not be edited, but can be selected
*/
function Textfield({
  text,
  theme,
  rows,
  columns,
}: {
  text: string;
  theme: ThemeOptions;
  rows: number;
  columns: string;
}) {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        sx={{
          backgroundColor: "white",
          width: columns
        }}
        color="secondary"
        variant="outlined"
        multiline
        rows={rows}
        InputProps={{ readOnly: true }}
        value={text}
      />
    </ThemeProvider>
  );
}
/*
Define proptypes for textfield:
1) text (which will be seen in the textfield)
2) theme (according to UI)
*/
Textfield.propTypes = {
  text: PropTypes.string.isRequired,
  theme: PropTypes.node.isRequired,
  rows: PropTypes.number.isRequired,
  columns: PropTypes.string.isRequired,
};

export default Textfield;
