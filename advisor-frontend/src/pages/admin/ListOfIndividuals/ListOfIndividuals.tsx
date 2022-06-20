import PageLayout from "../../PageLayout";
import userType from "../../../components/Sidebar/listUsersTypes";
import IndividualGrid from "../../../components/Grids/Specific/IndividualGrid";
import Theme from "../../../Theme";

/**
 * Page listing all users registered in the tool
 * This page should only be accessible to admins
 */
function ListOfIndividuals() {
  return (
    <div>
      <PageLayout title="Individuals" sidebarType={userType.ADMIN}>
        <IndividualGrid theme={Theme} />
      </PageLayout>
    </div>
  );
}

export default ListOfIndividuals;
