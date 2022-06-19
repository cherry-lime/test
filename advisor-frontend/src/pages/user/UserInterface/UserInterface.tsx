import { Link, useLocation } from "react-router-dom";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import EvaluationCard from "../../../components/PageCard/SpecificPageCards/EvaluationCard";
import TeamCard from "../../../components/PageCard/SpecificPageCards/TeamCard";
import ProgressCard from "../../../components/PageCard/SpecificPageCards/ProgressCard";
import NotificationCard from "../../../components/PageCard/SpecificPageCards/NotificationCard";
import IndividualCard from "../../../components/PageCard/SpecificPageCards/IndividualCard";
import TemplateCard from "../../../components/PageCard/SpecificPageCards/TemplateCard";

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

      <Link
        to="/user/self_evaluations/:assessmentId"
        state={data}
        data-testid="user-progress"
      >
        <IndividualCard />{" "}
      </Link>

      <Link
        to="/user/self_evaluations/:assessmentId"
        state={data}
        data-testid="user-progress"
      >
        <TemplateCard />
      </Link>

      <h3>Notifications</h3>
    </PageLayout>
  );
}

export default UserInterface;
