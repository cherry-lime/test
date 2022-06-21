import { Card, Grid, Pagination, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Checkpoint from "../../components/Checkpoint/Checkpoint";
import CheckpointGrid from "../../components/Grids/Specific/CheckpointGrid";
import RecommendationGrid from "../../components/Grids/Specific/RecommendationGrid";
import userTypes from "../../components/Sidebar/listUsersTypes";
import Subarea from "../../components/Subarea/Subarea";
import INGTheme from "../../Theme";
import PageLayout from "../PageLayout";

/**
 * Page with the feedback related to a self assessment
 * This should only be accessible to the user whose assement this belongs to
 */
function IndividualFeedback() {
  const location = useLocation();
  const data = location.state;
  const { assessmentId } = useParams();

  const templateId = 0;
  const categoryId = 0;
  const userId = 0;
  const userRole = "USER";

  const [value, setValue] = React.useState("Recommendations");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PageLayout
      title={`Recommendations for assessment with id ${assessmentId}`}
      sidebarType={userTypes.USER}
    >
      <Grid container direction="column" alignItems="left">
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
              <Tab value="Recommendations" label="Recommendations" />
              <Tab value="Checkpoints" label="Checkpoints" />
            </Tabs>
          </Stack>
        </Card>
        <br />
        <Grid item>
          <Subarea
            theme={INGTheme}
            title=""
            summary="Below you will find a list of items that you or your squad can review in order to start improving your testing maturity. This list is based on your answers and prioritized to maximize your testing maturity."
            description="TIP: only work on one or two items at a time. At any time, you can log back in using your username to review this feedback. Alternatively, you can fill out a new form to see how much you have already progressed and get updated recommendations."
          />
        </Grid>
        <Grid item>
          {value === "Recommendations" && (
            <RecommendationGrid
              theme={INGTheme}
              assessmentId={0}
              assessmentType="INDIVIDUAL"
              userId={userId}
              userRole={userRole}
            />
          )}
          {value === "Checkpoints" && (
            <CheckpointGrid
              theme={INGTheme}
              templateId={templateId}
              categoryId={categoryId}
            />
          )}
        </Grid>
      </Grid>
      <div>
        <p> {data} view </p>
        <Link to="/user/self_evaluations" state={data}>
          {" "}
          Go Back to Evaluations Page{" "}
        </Link>

        <h2> Recommendations for assessment with id {assessmentId} </h2>

        <h3>List of recommendations</h3>
      </div>
    </PageLayout>
  );
}

export default IndividualFeedback;
