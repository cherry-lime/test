import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupsIcon from "@mui/icons-material/Groups";
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from "@mui/icons-material/ShowChart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PageCard from "./PageCard";
import testimageFigma from "./testimageFigma.png";


function EvaluationCard() {
    return(
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
    )
};

function TeamCard() {
    return(
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
    )
};
function ProgressCard() {
    return(
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
    )
};

function NotificationCard() {
    return(
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
    )
}
 

export {TeamCard, EvaluationCard, ProgressCard, NotificationCard}
