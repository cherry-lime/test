import { Grid, Theme } from "@mui/material";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import AssessmentOngoingGrid from "../../../components/Grids/Specific/Assessment/AssessmentOngoing/AssessmentOngoingGrid";
import AssessmentCompletedGrid from "../../../components/Grids/Specific/Assessment/AssessmentCompleted/AssessmentCompletedGrid";

/**
 * Page with the list of self evaluations that belog to the user
 */
function ListOfSelfEvals({ theme }: { theme: Theme }) {
  const userId = "0";
  // only users sees this page, no need to fetch role
  const userRole = "USER";

  return (
    <PageLayout
      title="Individual Evaluations"
      sidebarType={userTypes[userRole]}
    >
      <Grid container direction="column" alignItems="left">
        <h2>Ongoing Evaluations</h2>
        <AssessmentOngoingGrid
          theme={theme}
          userRole={userRole}
          assessmentType="INDIVIDUAL"
        />

        <h2>Completed Evaluations</h2>
        <AssessmentCompletedGrid theme={theme} assessmentType="INDIVIDUAL" />
      </Grid>
    </PageLayout>
  );
}

export default ListOfSelfEvals;
