import PersonIcon from "@mui/icons-material/Person";
import PageCard from "../PageCard";
import testimageFigma from "../testimageFigma.png";

export default function IndividualCard() {
  return (
    <PageCard
      bodyText="View and start evaluations"
      headerText="Indivduals"
      cardHeight="15vh"
      icon={
        <PersonIcon
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
