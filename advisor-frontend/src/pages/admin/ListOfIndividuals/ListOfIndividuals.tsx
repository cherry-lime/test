import { Link, useLocation } from "react-router-dom";
import PageLayout from "../../PageLayout";
import userType from "../../../components/Sidebar/listUsersTypes";

/**
 * Page listing all users registered in the tool
 * This page should only be accessible to admins
 */
function ListOfIndividuals() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <PageLayout title="Individuals" footer sidebarType={userType.ADMIN}>
        <p> {data} view </p>
        <Link to="/admin" state={data}>
          {" "}
          Go Back to Admin Interface{" "}
        </Link>

        <h2> List of Individuals</h2>
      </PageLayout>
    </div>
  );
}

export default ListOfIndividuals;
