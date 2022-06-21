import { Grid, Stack, Pagination, Card, Tab, Tabs } from "@mui/material";
import React from "react";
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
  const checkpointlist = [];
  const subareaname = "Subarea Name";

  const [page, setPage] = React.useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  for (let i = 1; i < assessmentItems + 1; i += 1) {
    checkpointlist.push(
      <Checkpoint
        number={i}
        theme={INGTheme}
        description="Lorem ipsum"
        checkpointvalues={[0, 1, 2]}
        checkpointlabels={["Yes", "No", "N/A"]}
      />
    );
  }

  const [value, setValue] = React.useState("Single");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PageLayout
      title={`An Individual Evaluation with id ${assessmentId}`}
      sidebarType={userTypes.USER}
    >
      <Grid container direction="column" alignItems="left">
        <Grid item>
          <Card
            sx={{
              backgroundColor: "white",
              width: "20vw",
              borderRadius: "5px",
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              VIEW:
              <Tabs value={value} onChange={handleChange} textColor="primary">
                <Tab value="Single" label="Single" />
                <Tab value="List" label="List" />
              </Tabs>
            </Stack>
          </Card>
        </Grid>
        <br />
        <Grid item>
          <Subarea
            theme={INGTheme}
            title={subareaname}
            summary="Lorem ipsum"
            description="Lorem ipsum 2"
          />
        </Grid>
        <Grid item>
          {value === "Single" && (
            <Checkpoint
              number={page}
              theme={INGTheme}
              description="Lorem ipsum"
              checkpointvalues={[0, 1, 2]}
              checkpointlabels={["Yes", "No", "N/A"]}
            />
          )}
          {value === "List" && <Grid item>{checkpointlist}</Grid>}
        </Grid>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            {value === "Single" && (
              <Pagination
                onChange={handlePageChange}
                count={assessmentItems}
                shape="rounded"
                color="primary"
                page={page}
              />
            )}
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
