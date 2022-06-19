import ShowChartIcon from "@mui/icons-material/ShowChart";
import PageCard from "../PageCard";
import testimageFigma from "../Images/testimageFigma.png";

export default function ProgressCard() {
  return (
    <PageCard
      bodyText="View your current progress"
      headerText="Progress"
      cardHeight="15vh"
      icon={
        <ShowChartIcon
          color="info"
          fontSize="large"
          className="inverse_icon"
          sx={{
            bgcolor: "primary.main",
          }}
        />
      }
      image={testimageFigma}
    />
  );
}
