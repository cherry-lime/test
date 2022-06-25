import { Theme } from "@mui/material";
import { useSelector } from "react-redux";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import TeamGrid from "../../../components/Grids/Specific/Team/TeamGrid";
import { RootState } from "../../../app/store";

/**
 * Page with the list of teams that the user or assessor is part of
 */
function TeamList({ theme }: { theme: Theme }) {
  const { userId, userRole } = useSelector(
    (state: RootState) => state.userData
  );

  return (
    <PageLayout title="Teams" sidebarType={userTypes[userRole]}>
      <TeamGrid theme={theme} userId={userId} userRole={userRole} />
    </PageLayout>
  );
}

export default TeamList;
