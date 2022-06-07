import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Divider from "@mui/material/Divider";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import logo from "./ING3.png";

type Message = { bodytext3: string };

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6200",
    },
    secondary: {
      main: "#5a534f",
    },
    text: {
      primary: "5a534f",
    },
  },
});

export default function PageCard({ bodytext3 }: Message) {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ display: "flex", verticalAlign: "middle" }}>
        <Box width="1000px">
          <CardContent>
            <Typography
              color="text"
              align="left"
              sx={{ fontWeight: 600 }}
              variant="h6"
            >
              Individual Evaluation{" "}
              <AssessmentIcon color="primary" fontSize="small" />
            </Typography>
            <Divider textAlign="left" />
            <Typography
              variant="subtitle1"
              align="left"
              color="text.primary"
              component="div"
            >
              {bodytext3}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }} />
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 120 }}
          image={logo}
          alt="ING logo"
        />
      </Card>
    </ThemeProvider>
  );
}
