import { useParams } from "react-router-dom";
import CategoryGrid from "../../../../components/Grids/Specific/CategoryGrid";
import userType from "../../../../components/Sidebar/listUsersTypes";
import TextfieldEdit from "../../../../components/TextfieldEdit/TextfieldEdit";
import Theme from "../../../../Theme";
import PageLayout from "../../../PageLayout";

/**
 * Page with details regarding a certain template
 * This should only be accessible to admins
 */
function Template() {
  const { templateId } = useParams();
  const templateName = "Random";

  return (
    <div>
      <PageLayout
        title={`Template "${templateName}"`}
        sidebarType={userType.ADMIN}
      >
        <h2> Feedback Textbox </h2>

        <TextfieldEdit theme={Theme} text="Get editable feedback text" />

        <h2> Areas </h2>

        <CategoryGrid theme={Theme} templateId={templateId} />

        <h2>Topics </h2>

        <h2> Maturity Levels </h2>

        <h2> Score Formula </h2>

        <h2> Weight Range </h2>

        <h2> Answer Type </h2>

        {/* {areaIds.map((areaId) => (
          <div key={`templ-${areaId}`}>
            <Link
              to={`/admin/templates/${templateId}/${areaId}`}
              state={data}
              data-testid={`template-${templateId}-a-${areaId}`}
            >
              {" "}
              Area with id {areaId}{" "}
            </Link>
            <br />
          </div>
        ))} */}
      </PageLayout>
    </div>
  );
}

export default Template;
