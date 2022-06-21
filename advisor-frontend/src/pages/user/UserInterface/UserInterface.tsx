import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import EvaluationCard from "../../../components/PageCard/SpecificPageCards/EvaluationCard";
import TeamCard from "../../../components/PageCard/SpecificPageCards/TeamCard";
import ProgressCard from "../../../components/PageCard/SpecificPageCards/ProgressCard";
import NotificationCard from "../../../components/PageCard/SpecificPageCards/NotificationCard";
import IndividualCard from "../../../components/PageCard/SpecificPageCards/IndividualCard";
import TemplateCard from "../../../components/PageCard/SpecificPageCards/TemplateCard";
import { RootState } from "../../../app/store";

/**
 * Home page visible to anyone with the user role
 */
function UserInterface() {
  const { userID } = useSelector((state: RootState) => state.userData);
  const pageTitle = `Home User ${userID}`;

  return (
    <PageLayout title={pageTitle} footer sidebarType={userTypes.USER}>
      <Link to="/user/self_evaluations" data-testid="user-evals">
        <EvaluationCard />
      </Link>
      <Link to="/teams" data-testid="user-teams">
        <TeamCard />
      </Link>
      <Link
        to="/user/self_evaluations/:assessmentId"
        data-testid="user-progress"
      >
        <ProgressCard />
      </Link>
      <Link
        to="/user/self_evaluations/:assessmentId"
        data-testid="user-progress"
      >
        <NotificationCard />
      </Link>

      <Link
        to="/user/self_evaluations/:assessmentId"
        data-testid="user-progress"
      >
        <IndividualCard />{" "}
      </Link>

      <Link
        to="/user/self_evaluations/:assessmentId"
        data-testid="user-progress"
      >
        <TemplateCard />
      </Link>

      <h3>Notifications</h3>
    </PageLayout>
  );
}

export default UserInterface;
