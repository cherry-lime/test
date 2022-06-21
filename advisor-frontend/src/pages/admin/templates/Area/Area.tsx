import { useParams } from "react-router-dom";
import SubareaGrid from "../../../../components/Grids/Specific/SubareaGrid";
import Theme from "../../../../Theme";
import userType from "../../../../components/Sidebar/listUsersTypes";
import PageLayout from "../../../PageLayout";
import CheckpointGrid from "../../../../components/Grids/Specific/CheckpointGrid";

/**
 * Page with details regarding an area beloging to a certain template
 * This should only be accessible to admins
 */
function Area() {
  const { templateId } = useParams();
  const { areaId } = useParams();

  return (
    <div>
      <PageLayout title={`Subarea "${areaId}"`} sidebarType={userType.ADMIN}>
        <h2>Subareas</h2>
        <SubareaGrid
          theme={Theme}
          templateId={templateId}
          categoryId={areaId}
        />
        <h2>Checkpoints</h2>
        <CheckpointGrid
          theme={Theme}
          templateId={templateId}
          categoryId={areaId}
        />
      </PageLayout>
    </div>
  );
}

export default Area;
