import { Theme } from "@mui/material";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import AssessmentOngoingGrid from "../../../components/Grids/Specific/Assessment/AssessmentOngoing/AssessmentOngoingGrid";
import AssessmentCompletedGrid from "../../../components/Grids/Specific/Assessment/AssessmentCompleted/AssessmentCompletedGrid";

/**
 * Page with the list of self evaluations that belong to the user
 */
function ListOfSelfEvals({ theme }: { theme: Theme }) {
  // only users can see this page, no need to fetch role
  const userRole = "USER";
  /**
   * return page with individual evaluations as title
   * together with the ongoing evaluation grid and
   * completed evaluations grid
   */
  return (
    <PageLayout
      title="Individual Evaluations"
      sidebarType={userTypes[userRole]}
    >
      <h2>Ongoing Evaluations</h2>
      <AssessmentOngoingGrid
        theme={theme}
        userRole={userRole}
        assessmentType="INDIVIDUAL"
      />

      <h2>Completed Evaluations</h2>
      <AssessmentCompletedGrid theme={theme} assessmentType="INDIVIDUAL" />
    </PageLayout>
  );
}

export default ListOfSelfEvals;
