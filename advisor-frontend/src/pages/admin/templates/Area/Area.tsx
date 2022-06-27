// import { useParams } from "react-router-dom";
import { Theme } from "@mui/material";
import { useParams } from "react-router-dom";
import SubareaGrid from "../../../../components/Grids/Specific/Subarea/SubareaGrid";
import userType from "../../../../components/Sidebar/listUsersTypes";
import PageLayout from "../../../PageLayout";
import CheckpointGrid from "../../../../components/Grids/Specific/Checkpoint/CheckpointGrid";

/**
 * Page with details regarding an area beloging to a certain template
 * This should only be accessible to admins
 */
function Area({ theme }: { theme: Theme }) {
  const { templateId } = useParams();
  const { areaId } = useParams();

  return (
    <div>
      <PageLayout title={`Area "${areaId}"`} sidebarType={userType.ADMIN}>
        <h2>Subareas</h2>
        <SubareaGrid theme={theme} categoryId={Number(areaId)} />
        <h2>Checkpoints</h2>
        <CheckpointGrid
          theme={theme}
          templateId={Number(templateId)}
          categoryId={Number(areaId)}
        />
      </PageLayout>
    </div>
  );
}

export default Area;
