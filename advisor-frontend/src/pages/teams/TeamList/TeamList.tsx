import { Box, Stack, Theme } from "@mui/material";
import { useSelector } from "react-redux";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import TeamGrid from "../../../components/Grids/Specific/Team/TeamGrid";
import { RootState } from "../../../app/store";
import TextfieldEdit from "../../../components/TextfieldEdit/TextfieldEdit";
import ButtonRegular from "../../../components/ButtonRegular/ButtonRegular";

/**
 * Page with the list of teams that the user or assessor is part of
 */
function TeamList({ theme }: { theme: Theme }) {
  const { userRole } = useSelector((state: RootState) => state.userData);

  return (
    <PageLayout title="Teams" sidebarType={userTypes[userRole]}>
      {userRole !== "ADMIN" && (
        <Stack direction="row" sx={{ width: "inherit" }}>
          <Box>
            <TextfieldEdit text="Enter token here" theme={theme} rows={1} />
          </Box>
          <Box sx={{ p: 1.5 }}>
            <ButtonRegular text="Join Team With Token" />
          </Box>
        </Stack>
      )}

      <TeamGrid theme={theme} userRole={userRole} />
    </PageLayout>
  );
}

export default TeamList;
