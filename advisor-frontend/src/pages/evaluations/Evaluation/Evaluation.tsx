import { Button, Theme, ThemeProvider } from "@mui/material";
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
import { getUpdatedTheme } from "../../admin/templates/Area/colorHelpers";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function Evaluation({ team, theme }: { team: boolean; theme: Theme }) {
  const { assessmentId, teamId } = useParams();
  const { userRole } = useSelector((state: RootState) => state.userData);
  const [checkpointView, setCheckpointView] = useState(true);
  const [primaryColor, setPrimaryColor] = useState(theme.palette.primary.main);
  const [currentTheme, setCurrentTheme] = useState(theme);

  React.useEffect(() => {
    setCurrentTheme(() => getUpdatedTheme(primaryColor, theme));
  }, [primaryColor]);

  const handleViewChange = () => {
    setCheckpointView((v) => {
      setPrimaryColor(theme.palette.primary.main);
      return !v;
    });
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
      if (assessmentData.completedAt) {
        navigate(
          team
            ? `/teams/${teamId}/feedback/${assessmentId}`
            : `/user/self_evaluations/feedback/${assessmentId}`
        );
      }
    }
  }, [assessmentStatus, assessmentData]);

  return (
    <PageLayout
      title={team ? "Team Evaluation" : "Individual Evaluation"}
      sidebarType={userTypes[userRole]}
      headerColor={primaryColor}
    >
      <ThemeProvider theme={checkpointView ? currentTheme : theme}>
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
            theme={currentTheme}
            assessmentInfo={assessmentInfo}
            setPrimaryColor={setPrimaryColor}
          />
        )}

        {!checkpointView && assessmentInfo && (
          <ListOfRecommendations
            theme={theme}
            assessmentId={Number(assessmentId)}
            templateId={assessmentInfo.templateId}
            completedAt={assessmentInfo.completedAt}
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
      </ThemeProvider>
    </PageLayout>
  );
}

export default Evaluation;
