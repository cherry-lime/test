import userType from "../../../../components/Sidebar/listUsersTypes";
import Theme from "../../../../Theme";
import PageLayout from "../../../PageLayout";
import TemplateGrid from "../../../../components/Grids/Specific/TemplateGrid";

/**
 * Page containing the list of all existing templates
 * This should only be accessible to admins
 */
function ListOfTemplates() {
  return (
    <div>
      <PageLayout title="Templates" sidebarType={userType.ADMIN}>
        <h2>Individual Templates</h2>
        <TemplateGrid theme={Theme} assessmentType="INDIVIDUAL" />
        <h2>Team Templates</h2>
        <TemplateGrid theme={Theme} assessmentType="TEAM" />
      </PageLayout>
    </div>
  );
}

export default ListOfTemplates;
