import { Link, useLocation } from "react-router-dom";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import {
  TeamCard,
  EvaluationCard,
  ProgressCard,
  NotificationCard,
} from "../../../components/PageCard/SpecificPageCards";

/**
 * Home page visible to anyone with the user role
 */
function UserInterface() {
  const location = useLocation();
  const data = location.state;

  return (
    <PageLayout title="Home User" footer sidebarType={userTypes.USER}>
      <Link to="/user/self_evaluations" state={data} data-testid="user-evals">
        <EvaluationCard />
      </Link>
      <Link to="/teams" state={data} data-testid="user-teams">
        <TeamCard />
      </Link>
      <Link
        to="/user/self_evaluations/:assessmentId"
        state={data}
        data-testid="user-progress"
      >
        <ProgressCard />
      </Link>
      <Link
        to="/user/self_evaluations/:assessmentId"
        state={data}
        data-testid="user-progress"
      >
        <NotificationCard />
      </Link>

      <h3>Notifications</h3>
    </PageLayout>
  );
}

export default UserInterface;
