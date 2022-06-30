import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PageCard from "../PageCard";
import testimageFigma from "../Images/testimageFigma.png";

export default function ProgressOverallCard() {
  const ops = 11;
  const bodytext = `Overall: ${ops} %`;

  return (
    <PageCard
      bodyText={bodytext}
      headerText="Overall Progress Score"
      cardHeight="15vh"
      icon={
        <TrendingUpIcon
          color="info"
          fontSize="large"
          className="inverse_icon"
          sx={{
            bgcolor: "primary.main",
          }}
        />
      }
      image={testimageFigma}
      isImageLeft={false}
      isImageRight={false}
    />
  );
}
