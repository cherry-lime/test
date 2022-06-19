import BarChartIcon from "@mui/icons-material/BarChart";
import PageCard from "../PageCard";
import testimageFigma from "../testimageFigma.png";

export default function EvaluationCard() {
  return (
    <PageCard
      bodyText="View and start individual evaluations"
      headerText="Individual Evaluations"
      cardHeight="15vh"
      icon={
        <BarChartIcon
          color="info"
          fontSize="large"
          className="inverse_icon"
          sx={{
            bgcolor: "primary.main",
          }}
        />
      }
      image={testimageFigma}
      isImageLeft
    />
  );
}
