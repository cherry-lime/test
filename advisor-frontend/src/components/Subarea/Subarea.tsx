import { ThemeOptions, ThemeProvider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

/*  
passing parameter of the title and description of the subarea
title of subarea
description of subarea = description
description might be empty string
theme of app
main function returning a subarea component
*/
function Subarea({
  title,
  description,
  theme,
}: {
  title: string;
  description: string;
  theme: ThemeOptions;
}) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ width: "95%", alignSelf: "center" }}>
        <CardContent>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "left",
              color: "primary.main",
            }}
            id="subarea-title"
          >
            {title}
          </Typography>
          <Typography sx={{ textAlign: "left" }} id="subarea-description">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
/*
props declarations:
subarea card that contains title, description with its theme
*/
Subarea.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  theme: PropTypes.node.isRequired,
};

export default Subarea;
