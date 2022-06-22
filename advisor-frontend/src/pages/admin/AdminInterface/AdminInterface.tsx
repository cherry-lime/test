import { Link, useLocation } from "react-router-dom";
import userType from "../../../components/Sidebar/listUsersTypes";
import PageLayout from "../../PageLayout";
import IndividualCard from "../../../components/PageCard/SpecificPageCards/IndividualCard";
import TemplateCard from "../../../components/PageCard/SpecificPageCards/TemplateCard";

/**
 * Home page visible to anyone with the admin role
 */
function AdminInterface() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <PageLayout title="Admin Home" footer sidebarType={userType.ADMIN}>
        <Link to="/admin/individuals" state={data} data-testid="individuals">
          <IndividualCard />
        </Link>

        <br />

        <Link to="/admin/templates" state={data} data-testid="templates">
          <TemplateCard />
        </Link>
      </PageLayout>
    </div>
  );
}

export default AdminInterface;
