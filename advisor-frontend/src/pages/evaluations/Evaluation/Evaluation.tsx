import { Button, Theme } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ListOfCheckpoints from "../../../components/ListOfCheckpoints/ListOfCheckpoints";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import PageLayout from "../../PageLayout";
import { RootState } from "../../../app/store";
import ListOfRecommendations from "../../../components/ListOfRecommendations/ListOfRecommendations";
import {
  AssessmentAPP,
  useGetAssessment,
  usePostCompleteAssessment,
} from "../../../api/AssessmentAPI";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function Evaluation({ team, theme }: { team: boolean; theme: Theme }) {
  const { assessmentId, teamId } = useParams();
  const { userRole } = useSelector((state: RootState) => state.userData);
  const [checkpointView, setCheckpointView] = useState(true);

  const handleViewChange = () => {
    setCheckpointView((v) => !v);
  };

  const postCompleteEval = usePostCompleteAssessment(Number(assessmentId));

  const handleClickFinish = useCallback(() => {
    postCompleteEval.mutate();
  }, []);

  const [assessmentInfo, setAssessmentInfo] = useState<AssessmentAPP>();

  // get assessment information from API
  const {
    status: assessmentStatus,
    data: assessmentData,
    error: assessmentError,
  } = useGetAssessment(Number(assessmentId));

  // set assessment info value
  React.useEffect(() => {
    switch (assessmentStatus) {
      case "error":
        // eslint-disable-next-line no-console
        console.log(assessmentError);
        break;
      case "success":
        if (assessmentData) {
          setAssessmentInfo(assessmentData);
        }
        break;
      default:
        break;
    }
  }, [assessmentStatus, assessmentData]);

  return (
    <PageLayout
      title={team ? "Team Evaluation" : "Individual Evaluation"}
      sidebarType={userTypes[userRole]}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "inherit",
        }}
      >
        <Button onClick={handleViewChange} variant="contained">
          {checkpointView ? "See Recommendations" : "Go back to checkpoints"}
        </Button>
      </div>

      {checkpointView && assessmentInfo && (
        <ListOfCheckpoints
          feedback={false || (team && userRole === "USER")}
          theme={theme}
          assessmentInfo={assessmentInfo}
        />
      )}

      {!checkpointView && assessmentInfo && (
        <ListOfRecommendations
          theme={theme}
          assessmentId={Number(assessmentId)}
          templateId={assessmentInfo.templateId}
        />
      )}

      <div
        style={{
          width: "inherit",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link
          className="buttonLink"
          to={
            team
              ? `/teams/${teamId}/feedback/${assessmentId}`
              : `/user/self_evaluations/feedback/${assessmentId}`
          }
        >
          <Button variant="contained" onClick={handleClickFinish}>
            {" "}
            Finish Assessment{" "}
          </Button>
        </Link>
      </div>
    </PageLayout>
  );
}

export default Evaluation;
