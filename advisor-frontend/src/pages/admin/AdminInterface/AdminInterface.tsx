import { Link, useLocation } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PageCard from "../../../components/PageCard/PageCard";
import testimageFigma from "../../../components/PageCard/testimageFigma.png";
import userType from "../../../components/Sidebar/listUsersTypes";
import PageLayout from "../../PageLayout";

/**
 * Home page visible to anyone with the admin role
 */
function AdminInterface() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <PageLayout title="Home" footer sidebarType={userType.ADMIN}>
        <h2> Admin Interface </h2>

        <Link to="/admin/individuals" state={data} data-testid="individuals">
          <PageCard
            bodyText="View and edit list of individuals"
            headerText="Individuals"
            cardHeight="15vh"
            // eslint-disable-next-line react/jsx-no-undef
            icon={<AssessmentIcon color="primary" fontSize="large" />}
            image={testimageFigma}
            isImageLeft
          />
        </Link>

        <br />

        <Link to="/admin/templates" state={data} data-testid="templates">
          <PageCard
            bodyText="View, create, and edit evaluation templates"
            headerText="Templates"
            cardHeight="15vh"
            // eslint-disable-next-line react/jsx-no-undef
            icon={<AssessmentIcon color="primary" fontSize="large" />}
            image={testimageFigma}
            isImageRight
          />
        </Link>
      </PageLayout>
    </div>
  );
}

export default AdminInterface;
