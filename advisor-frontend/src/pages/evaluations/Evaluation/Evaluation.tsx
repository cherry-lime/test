import { Button, Theme } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import ErrorPopup, {
  handleError,
  RefObject,
} from "../../../components/ErrorPopup/ErrorPopup";

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

  // Ref for error popup
  const ref = useRef<RefObject>(null);
  const navigate = useNavigate();

  const postCompleteEval = usePostCompleteAssessment(Number(assessmentId), ref);

  const handleClickFinish = useCallback(() => {
    postCompleteEval.mutate(undefined, {
      onError: () => {
        handleError(
          ref,
          "Error: unable to complete the evaluation. Make sure you filled in all the checkpoints."
        );
      },
      onSuccess: () => {
        navigate(
          team
            ? `/teams/${teamId}/feedback/${assessmentId}`
            : `/user/self_evaluations/feedback/${assessmentId}`
        );
      },
    });
  }, []);

  const [assessmentInfo, setAssessmentInfo] = useState<AssessmentAPP>();

  // get assessment information from API
  const { status: assessmentStatus, data: assessmentData } = useGetAssessment(
    Number(assessmentId),
    ref
  );

  // set assessment info value
  React.useEffect(() => {
    if (assessmentData && assessmentStatus === "success") {
      setAssessmentInfo(assessmentData);
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
        <Button variant="contained" onClick={handleClickFinish}>
          {" "}
          Finish Evaluation{" "}
        </Button>
        <ErrorPopup ref={ref} />
      </div>
    </PageLayout>
  );
}

export default Evaluation;
