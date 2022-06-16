import { Grid, Typography } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import ExampleButton from "../../../components/ExampleButton/ExampleButton";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import TextField from "../../../components/Textfield/Textfield";
import INGTheme from "../../../Theme";
import MemberGrid from "../../../components/Grids/Specific/MemberGrid";
import AssessmentOngoingGrid from "../../../components/Grids/Specific/AssessmentOngoingGrid";
import AssessmentCompletedGrid from "../../../components/Grids/Specific/AssessmentCompletedGrid";

/**
 * Page providing team details
 * This should only be accessible to the users and assessors in the team
 * Assessors can modify team details
 */
function Team() {
  const location = useLocation();
  const data = location.state;

  const { teamId } = useParams();

  const assessmentIds = [234, 56, 76];
  const feedbackIds = [123, 555, 23];

  const userId = 0;
  const tmId = 4;
  const userRole = "USER";

  return (
    <PageLayout title={`Team ${teamId}`} sidebarType={userTypes.USER}>
      <Grid container direction="column" alignItems="left">
        <strong> Team Information </strong>
        <br />
        <Grid item>
          <Typography variant="h6" fontWeight={600}>
            Country
          </Typography>
        </Grid>
        <TextField
          text="Netherlands"
          theme={INGTheme}
          rows={1}
          columns="25ch"
        />
        <br />
        <Grid item>
          <Typography variant="h6" fontWeight={600}>
            IT Area / Department
          </Typography>
        </Grid>
        <TextField
          text="Department A"
          theme={INGTheme}
          rows={1}
          columns="25ch"
        />
        <br />
        <strong>Assessors</strong>

        <MemberGrid
          theme={INGTheme}
          userId={userId}
          userRole={userRole}
          teamId={tmId}
          forAssessors={false}
        />
        <strong>Members</strong>
        <MemberGrid
          theme={INGTheme}
          userId={userId}
          userRole={userRole}
          teamId={tmId}
          forAssessors={false}
        />

        <strong>Ongoing Evaluations (Team)</strong>
        <AssessmentOngoingGrid
          theme={INGTheme}
          userId={userId}
          userRole={userRole}
          assessmentType="TEAM"
        />

        <strong>Completed Evaluations (Team)</strong>
        <AssessmentCompletedGrid
          theme={INGTheme}
          userId={userId}
          userRole={userRole}
          assessmentType="TEAM"
        />

        <div>
          <p> {data} view </p>
          <Link to="/teams" state={data}>
            {" "}
            Go Back to List of Teams{" "}
          </Link>

          <h2 data-testid="team-id"> A Specific Team with id {teamId} </h2>
          {data === "assessor" && <p> Editable team info </p>}

          {data === "user" && <p> Non-editable team info </p>}

          <h3>List of assessors</h3>

          {data === "assessor" && <ExampleButton name="Add New Assessor" />}

          <h3>List of members</h3>

          {data === "assessor" && <ExampleButton name="Add New Member" />}

          <h3>Evaluations in progress</h3>

          {assessmentIds.map((assessmentId) => (
            <div key={`t-${teamId}-a-${assessmentId}`}>
              <Link
                to={`/teams/${teamId}/${assessmentId}`}
                state={data}
                data-testid={`team-eval-${assessmentId}`}
              >
                {" "}
                Team Evaluation with id {assessmentId}{" "}
              </Link>
              <br />
            </div>
          ))}

          <h3>Completed evaluations</h3>

          {feedbackIds.map((feedbackId) => (
            <div key={`t-${teamId}-f-${feedbackId}`}>
              <Link
                to={`/teams/${teamId}/feedback/${feedbackId}`}
                state={data}
                data-testid={`team-feedback-${feedbackId}`}
              >
                {" "}
                Team Feedback with id {feedbackId}{" "}
              </Link>
              <br />
            </div>
          ))}
        </div>
      </Grid>
    </PageLayout>
  );
}

export default Team;
