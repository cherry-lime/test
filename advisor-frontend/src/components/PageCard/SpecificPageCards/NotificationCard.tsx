import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PageCard from "../PageCard";
import testimageFigma from "../Images/testimageFigma.png";

export default function NotificationCard() {
  return (
    <PageCard
      bodyText="View your updates and notifications"
      headerText="Notifications"
      cardHeight="15vh"
      icon={
        <NotificationsNoneIcon
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
