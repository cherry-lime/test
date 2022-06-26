import { ThemeOptions, ThemeProvider } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import "./Subarea.css";

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
  summary,
  theme,
  tip,
}: {
  title: string;
  summary: string;
  description: string;
  theme: ThemeOptions;
  // eslint-disable-next-line react/require-default-props
  tip?: boolean;
}) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ width: "inherit", alignSelf: "center" }}>
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
          <Typography className="subareaText" id="subarea-summary">
            {summary}
          </Typography>
          <Typography
            className="subareaText"
            id="subarea-description"
            sx={{ color: "primary.main" }}
          >
            {tip && "TIP: "}
          </Typography>
          <Typography>{description}</Typography>
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
