import { Box, Button, Stack, TextField, Theme } from "@mui/material";
import { useSelector } from "react-redux";
import { useCallback, useState } from "react";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import TeamGrid from "../../../components/Grids/Specific/Team/TeamGrid";
import { RootState } from "../../../app/store";
import { useJoinInviteTokenTeam } from "../../../api/TeamAPI";

/**
 * Page with the list of teams that the user or assessor is part of
 */
function TeamList({ theme }: { theme: Theme }) {
  const { userRole, userId } = useSelector(
    (state: RootState) => state.userData
  );

  const [token, setToken] = useState("");
  const saveToken = (newToken: string) => {
    setToken(newToken);
  };

  const patchToken = useJoinInviteTokenTeam(token);

  const handleJoinTeam = useCallback(() => {
    patchToken.mutate();
  }, []);

  return (
    <PageLayout title="Teams" sidebarType={userTypes[userRole]}>
      {userRole !== "ADMIN" && (
        <Stack direction="row" sx={{ width: "inherit" }}>
          <Box>
            <TextField
              value={token}
              onChange={(e) => setToken(e.target.value)}
              label="Enter token"
              rows={1}
            />
          </Box>
          <Box sx={{ p: 1.5 }}>
            <Button variant="contained" onClick={handleJoinTeam}>
              Join Team With Token
            </Button>
          </Box>
        </Stack>
      )}

      <TeamGrid theme={theme} userRole={userRole} userId={Number(userId)} />
    </PageLayout>
  );
}

export default TeamList;
