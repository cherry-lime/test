import { Grid, Theme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import TextfieldEdit from "../../../components/TextfieldEdit/TextfieldEdit";
import MemberGrid from "../../../components/Grids/Specific/MemberGrid";
import AssessmentOngoingGrid from "../../../components/Grids/Specific/AssessmentOngoingGrid";
import AssessmentCompletedGrid from "../../../components/Grids/Specific/AssessmentCompletedGrid";
import { RootState } from "../../../app/store";
// import Textfield from "../../../components/Textfield/Textfield";

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
      <Grid sx={{width: "100vw"}} container direction="column" alignItems="left" xl="auto">
        <Grid item> 
        <h2> Team Information </h2>
        </Grid>
        <Grid item>
          <h3>
            Country
          </h3>
        </Grid>
        <Grid item xl="auto">
        {userRole === "ASSESSOR" && <TextfieldEdit text="Netherlands" theme={theme} rows={1} />}
        {/* {userRole === "USER" && <Textfield text="Netherlands" theme={theme} rows={1} columns="inherit" />} */}
        </Grid>
        <br />
        <Grid item>
          <h3> IT Area / Department </h3>
        </Grid>
        <Grid item>
        {/* {userRole === "ASSESSOR" && <TextfieldEdit text="Department A" theme={theme} rows={1} />}
        {userRole === "USER" && <Textfield text="Department A" theme={theme} rows={1} columns="inherit" />} */}

        </Grid>
        {userRole === "ASSESSOR" && <TextfieldEdit text="Department A" theme={theme} rows={1} />}
        {/* {userRole === "USER" && <Textfield text="Department A" theme={theme} rows={1} columns="inherit" />} */}
        <br />
        <h3>Assessors</h3>

        <MemberGrid
          theme={theme}
          userId={userId}
          userRole={userRole}
          teamId={tmId}
          forAssessors={false}
        />
        <h3>Members</h3>
        <MemberGrid
          theme={theme}
          userId={userId}
          userRole={userRole}
          teamId={tmId}
          forAssessors={false}
        />

        <h3>Ongoing Evaluations</h3>
        <AssessmentOngoingGrid
          theme={theme}
          userId={userId}
          userRole={userRole}
          assessmentType="TEAM"
        />

        <h3>Completed Evaluations</h3>
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
