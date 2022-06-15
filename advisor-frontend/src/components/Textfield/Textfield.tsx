import { TextField } from "@mui/material";

/*
size of the textfield is specified with the parameter width (in characters)
default set to 50
and by the number of rows
default set to five
the background color of the text is white
text can not be edited, but can be selected
*/
function Textfield({ text }: { text: string }) {
  return (
    <TextField
      sx={{
        backgroundColor: "white",
        width: "50ch",
      }}
      variant="outlined"
      multiline
      rows={5}
      InputProps={{ readOnly: true }}
      value={text}
    />
  );
}
export default Textfield;
