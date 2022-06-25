// import { useParams } from "react-router-dom";
import { Theme } from "@mui/material";
import SubareaGrid from "../../../../components/Grids/Specific/Subarea/SubareaGrid";
import userType from "../../../../components/Sidebar/listUsersTypes";
import PageLayout from "../../../PageLayout";
import CheckpointGrid from "../../../../components/Grids/Specific/Checkpoint/CheckpointGrid";

/**
 * Page with details regarding an area beloging to a certain template
 * This should only be accessible to admins
 */
function Area({ theme }: { theme: Theme }) {
  // const { templateId } = useParams();
  // const { areaId } = useParams();
  const templateId = 1;
  const areaId = 1;

  return (
    <div>
      <PageLayout title={`Subarea "${areaId}"`} sidebarType={userType.ADMIN}>
        <h2>Subareas</h2>
        <SubareaGrid theme={theme} categoryId={areaId} />
        <h2>Checkpoints</h2>
        <CheckpointGrid
          theme={theme}
          templateId={templateId}
          categoryId={areaId}
        />
      </PageLayout>
    </div>
  );
}

export default Area;
