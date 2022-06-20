import { Link, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import INGTheme from "../../../Theme";
import AssessmentOngoingGrid from "../../../components/Grids/Specific/AssessmentOngoingGrid";
import AssessmentCompletedGrid from "../../../components/Grids/Specific/AssessmentCompletedGrid";

/**
 * Page with the list of self evaluations that belog to the user
 */
function ListOfSelfEvals() {
  const location = useLocation();
  const data = location.state;
  const assessmentIds = [43, 67, 40];
  const feedbackIds = [35, 66, 39];

  const userId = 0;
  const userRole = "USER";
  const teamId = 0;
  const templateId = 0;
  const categoryId = 0;

  return (
    <PageLayout title="Individual Evaluations" sidebarType={userTypes.USER}>
      <Grid container direction="column" alignItems="left">
        <strong>Ongoing Evaluations (Individual)</strong>
        <AssessmentOngoingGrid
          theme={INGTheme}
          userId={userId}
          userRole={userRole}
          assessmentType="INDIVIDUAL"
        />

        <strong>Completed Evaluations (Individual)</strong>
        <AssessmentCompletedGrid
          theme={INGTheme}
          userId={userId}
          userRole={userRole}
          assessmentType="INDIVIDUAL"
        />

        {assessmentIds.map((assessmentId) => (
          <div key={`se-${assessmentId}`}>
            <Link
              to={`/user/self_evaluations/${assessmentId}`}
              state={data}
              data-testid={`user-eval-${assessmentId}`}
            >
              {" "}
              Evaluation with id {assessmentId}{" "}
            </Link>
            <br />
          </div>
        ))}

        {feedbackIds.map((feedbackId) => (
          <div key={`f-${feedbackId}`}>
            <Link
              to={`/user/self_evaluations/feedback/${feedbackId}`}
              state={data}
              data-testid={`user-feedback-${feedbackId}`}
            >
              {" "}
              Completed Evaluation with id {feedbackId}{" "}
            </Link>
            <br />
          </div>
        ))}
      </Grid>
    </PageLayout>
  );
}

export default ListOfSelfEvals;
