import { useParams } from "react-router-dom";
import AnswerTypeGrid from "../../../../components/Grids/Specific/AnswerTypeGrid";
import CategoryGrid from "../../../../components/Grids/Specific/CategoryGrid";
import MaturityGrid from "../../../../components/Grids/Specific/MaturityGrid";
import TopicGrid from "../../../../components/Grids/Specific/TopicGrid";
import userType from "../../../../components/Sidebar/listUsersTypes";
import TextfieldEdit from "../../../../components/TextfieldEdit/TextfieldEdit";
import TextfieldEditWeight from "../../../../components/TextfieldEdit/TextfieldEditWeight";
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

        <TopicGrid theme={Theme} templateId={templateId} />

        <h2> Maturity Levels </h2>

        <MaturityGrid theme={Theme} templateId={templateId} />

        <h2> Score Formula </h2>

        <h2> Weight Range </h2>
        <div
          style={{
            width: "inherit",
            display: "inline-grid",
            gridTemplateColumns: "repeat(2, 250px [col-start])",
            rowGap: "10px",
          }}
        >
          <div>Start</div>
          <div>End</div>
          <TextfieldEditWeight theme={Theme} weightValue={0} />
          <TextfieldEditWeight theme={Theme} weightValue={100} />
        </div>
        <h2> Answer Type </h2>

        <AnswerTypeGrid theme={Theme} templateId={templateId} />

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
