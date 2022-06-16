import { Link, useLocation } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupsIcon from "@mui/icons-material/Groups";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import PageCard from "../../../components/PageCard/PageCard";
import testimageFigma from "../../../components/PageCard/testimageFigma.png";

/**
 * Home page visible to anyone with the user role
 */
function UserInterface() {
  const location = useLocation();
  const data = location.state;

  return (
    <PageLayout title="Home User" footer sidebarType={userTypes.USER}>
      <Link to="/user/self_evaluations" state={data} data-testid="user-evals">
        <PageCard
          bodyText="View and start individual evaluations"
          headerText="Individual Evaluations"
          cardHeight="15vh"
          icon={<AssessmentIcon color="primary" fontSize="large" />}
          image={testimageFigma}
          isImageLeft
        />
      </Link>
      <Link to="/teams" state={data} data-testid="user-teams">
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
      </Link>

      <Link
        to="/user/self_evaluations/:assessmentId"
        state={data}
        data-testid="user-progress"
      >
        <PageCard
          bodyText="View your current progress"
          headerText="Evaluations"
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
        />
      </Link>
      <Link
        to="/user/self_evaluations/:assessmentId"
        state={data}
        data-testid="user-progress"
      >
        <PageCard
          bodyText="View your current progress"
          headerText="Evaluations"
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
        />
      </Link>
      <Link
        to="/user/self_evaluations/:assessmentId"
        state={data}
        data-testid="user-progress"
      >
        <PageCard
          bodyText="View your current progress"
          headerText="Evaluations"
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
        />
      </Link>
      <Link
        to="/user/self_evaluations/:assessmentId"
        state={data}
        data-testid="user-progress"
      >
        <PageCard
          bodyText="View your current progress"
          headerText="Evaluations"
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
        />
      </Link>

      <h3>Notifications</h3>
    </PageLayout>
  );
}

export default UserInterface;
