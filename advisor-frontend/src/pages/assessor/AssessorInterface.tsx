import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLayout from "../PageLayout";
import TeamCard from "../../components/PageCard/SpecificPageCards/TeamCard";
import userTypes from "../../components/Sidebar/listUsersTypes";
import { RootState } from "../../app/store";

/**
 * Home page for anyone with the assessor role
 */
function AssessorInterface() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId } = useSelector((state: RootState) => state.userData);
  const pageTitle = `Assessor Home`;

  return (
    <PageLayout title={pageTitle} footer sidebarType={userTypes.USER}>
      <Link to="/teams" data-testid="assessor-teams">
        <TeamCard />
      </Link>
    </PageLayout>
  );
}

export default AssessorInterface;
