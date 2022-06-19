import GroupsIcon from "@mui/icons-material/Groups";
import PageCard from "../PageCard";
import testimageFigma from "../Images/testimageFigma.png";

export default function TeamCard() {
  return (
    <PageCard
      bodyText="View your teams"
      headerText="Teams "
      cardHeight="15vh"
      icon={
        <GroupsIcon
          color="info"
          fontSize="large"
          className="inverse_icon"
          sx={{
            bgcolor: "primary.main",
          }}
        />
      }
      image={testimageFigma}
      isImageRight
    />
  );
}
