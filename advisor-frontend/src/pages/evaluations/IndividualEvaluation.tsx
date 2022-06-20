import { Grid, Stack, Pagination } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import ButtonRegular from "../../components/ButtonRegular/ButtonRegular";
import ButtonView from "../../components/ButtonView/ButtonView";
import Checkpoint from "../../components/Checkpoint/Checkpoint";
import userTypes from "../../components/Sidebar/listUsersTypes";
import Subarea from "../../components/Subarea/Subarea";
import INGTheme from "../../Theme";
import PageLayout from "../PageLayout";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function IndividualEvaluation() {
  const location = useLocation();
  const data = location.state;
  const { assessmentId } = useParams();
  const assessmentItems = 12;

  return (
    <PageLayout
      title={`An Individual Evaluation with id ${assessmentId}`}
      sidebarType={userTypes.USER}
    >
      <Grid container direction="column" alignItems="left">
        <Grid item>
          <ButtonView title="View:" />
        </Grid>
        <br />
        <Grid item>
          <Subarea
            title={`An Individual Evaluation with id ${assessmentId}`}
            summary="Lorem ipsum"
            description="Lorem ipsum 2"
            theme={INGTheme}
          />
        </Grid>
        <Grid item>
          <Checkpoint
            number={1}
            theme={INGTheme}
            description="Lorem ipsum"
            checkpointvalues={[0, 1, 2]}
            checkpointlabels={["Yes", "No", "N/A"]}
          />
        </Grid>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Pagination count={assessmentItems} shape="rounded" />
            <ButtonRegular text="Finish Assessment" />
          </Stack>
        </Grid>
      </Grid>
      <div>
        <p> {data} view </p>
        <Link to="/user/self_evaluations" state={data}>
          {" "}
          Go Back to Evaluations Page{" "}
        </Link>

        <h2> An Individual Evaluation with id {assessmentId} </h2>

        <h3>List of checkpoints</h3>
      </div>
    </PageLayout>
  );
}

export default IndividualEvaluation;
