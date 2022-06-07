import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Divider from "@mui/material/Divider";
import logo from "./ING3.png";

type Message = { bodytext3: string };

export default function PageCard({ bodytext3 }: Message) {
  return (
    <Card sx={{ display: "flex", verticalAlign: "middle" }}>
      <Box width="1000px">
        <CardContent>
          <Typography align="left" variant="h6" sx={{ fontWeight: 600 }}>
            Individual Evaluation{" "}
            <AssessmentIcon fontSize="small" sx={{ color: "#ff6200" }} />
          </Typography>
          <Divider textAlign="left" />
          <Typography
            variant="subtitle1"
            align="left"
            color="text.secondary"
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
  );
}
