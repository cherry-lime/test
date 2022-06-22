import { Grid, Theme, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import TextField from "../../../components/Textfield/Textfield";
import MemberGrid from "../../../components/Grids/Specific/MemberGrid";
import AssessmentOngoingGrid from "../../../components/Grids/Specific/AssessmentOngoingGrid";
import AssessmentCompletedGrid from "../../../components/Grids/Specific/AssessmentCompletedGrid";
import { RootState } from "../../../app/store";

/**
 * Page providing team details
 * This should only be accessible to the users and assessors in the team
 * Assessors can modify team details
 */
function Team({ theme }: { theme: Theme }) {
  const { teamId } = useParams();

  const { userId } = useSelector((state: RootState) => state.userData);
  const tmId = 4;
  // fetch user role
  const userRole = "ASSESSOR";

  return (
    <PageLayout title={`Team ${teamId}`} sidebarType={userTypes[userRole]}>
      <Grid container direction="column" alignItems="left">
        <strong> Team Information </strong>
        <br />
        <Grid item>
          <Typography variant="h6" fontWeight={600}>
            Country
          </Typography>
        </Grid>
        <TextField text="Netherlands" theme={theme} rows={1} columns="25ch" />
        <br />
        <Grid item>
          <Typography variant="h6" fontWeight={600}>
            IT Area / Department
          </Typography>
        </Grid>
        <TextField text="Department A" theme={theme} rows={1} columns="25ch" />
        <br />
        <strong>Assessors</strong>

        <MemberGrid
          theme={theme}
          userId={userId}
          userRole={userRole}
          teamId={tmId}
          forAssessors={false}
        />
        <strong>Members</strong>
        <MemberGrid
          theme={theme}
          userId={userId}
          userRole={userRole}
          teamId={tmId}
          forAssessors={false}
        />

        <strong>Ongoing Evaluations (Team)</strong>
        <AssessmentOngoingGrid
          theme={theme}
          userId={userId}
          userRole={userRole}
          assessmentType="TEAM"
        />

        <strong>Completed Evaluations (Team)</strong>
        <AssessmentCompletedGrid
          theme={theme}
          userId={userId}
          userRole={userRole}
          assessmentType="TEAM"
        />
      </Grid>
    </PageLayout>
  );
}

export default Team;
