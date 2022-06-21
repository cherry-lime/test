import { Card, Grid, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import RecommendationGrid from "../../components/Grids/Specific/RecommendationGrid";
import userTypes from "../../components/Sidebar/listUsersTypes";
import Subarea from "../../components/Subarea/Subarea";
import INGTheme from "../../Theme";
import PageLayout from "../PageLayout";
import ListOfCheckpoints from "../../components/ListOfCheckpoints/ListOfCheckpoints";
import TextfieldEdit from "../../components/TextfieldEdit/TextfieldEdit";

/**
 * Page with the feedback related to a self assessment
 * This should only be accessible to the user whose assement this belongs to
 */
function Feedback({ team }: { team: boolean }) {
  const { assessmentId } = useParams();

  const userId = 0;
  const userRole = "USER";

  const [value, setValue] = React.useState("Recommendations");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <PageLayout
      title={
        team ? "Team Evaluation Feedback" : "Individual Evaluation Feedback"
      }
      sidebarType={userTypes.USER}
    >
      <Grid container direction="column" alignItems="left" spacing="20px">
        <Grid item>
          <Card
            sx={{
              backgroundColor: "white",
              width: "inherit",
              borderRadius: "5px",
            }}
          >
            <Stack direction="row" justifyContent="left" alignItems="center">
              <Tabs value={value} onChange={handleChange} textColor="primary">
                <Tab value="Recommendations" label="Recommendations" />
                <Tab value="Checkpoints" label="Checkpoints" />
              </Tabs>
            </Stack>
          </Card>
        </Grid>
        <Grid item>
          <Subarea
            theme={INGTheme}
            title=""
            summary="Below you will find a list of items that you or your squad can review in order to start improving your testing maturity. This list is based on your answers and prioritized to maximize your testing maturity."
            description="TIP: only work on one or two items at a time. At any time, you can log back in using your username to review this feedback. Alternatively, you can fill out a new form to see how much you have already progressed and get updated recommendations."
          />
        </Grid>
        {!team && (
          <Grid item>
            <h2>Assessor Feedback</h2>
            <TextfieldEdit theme={INGTheme} text="assessor feedback here" />
          </Grid>
        )}

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
            <ListOfCheckpoints
              feedback
              theme={INGTheme}
              assessmentId={assessmentId}
            />
          )}
        </Grid>
        <Grid item>
          <Stack>
            <CloudDownloadOutlinedIcon sx={{ fontSize: 40 }} />
            Download as PDF
          </Stack>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default Feedback;
