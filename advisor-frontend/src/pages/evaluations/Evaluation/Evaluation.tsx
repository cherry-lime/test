import { Button, Theme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useRef, useState } from "react";
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
} from "../../../api/AssessmentAPI/AssessmentAPI";
import ErrorPopup, {
  getOnError,
  RefObject,
} from "../../../components/ErrorPopup/ErrorPopup";
import { getUpdatedTheme } from "../../admin/templates/Area/colorHelpers";
import { useGetTeam } from "../../../api/TeamAPI/TeamAPI";
import checkAssessmentRouting, { checkTeamRouting } from "../../routingHelpers";

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
  const refErrorEvaluation = useRef<RefObject>(null);
  const onErrorEvaluation = getOnError(refErrorEvaluation);

  const navigate = useNavigate();

  const postCompleteEval = usePostCompleteAssessment(
    Number(assessmentId),
    onErrorEvaluation
  );

  const handleClickFinish = () => {
    postCompleteEval.mutate(undefined, {
      onError: () => {
        onErrorEvaluation(
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
  };

  const [assessmentInfo, setAssessmentInfo] = useState<AssessmentAPP>();

  // get assessment information from API
  const assessmentResponse = useGetAssessment(
    Number(assessmentId),
    onErrorEvaluation
  );

  // set assessment info value
  React.useEffect(() => {
    if (assessmentResponse.status === "success" && assessmentResponse.data) {
      setAssessmentInfo(assessmentResponse.data);
    }
    const rerouting = checkAssessmentRouting(
      assessmentResponse,
      team,
      false,
      teamId,
      assessmentId
    );
    if (rerouting) {
      navigate(rerouting);
    }
  }, [assessmentResponse]);

  if (team) {
    const teamResponse = useGetTeam(Number(teamId), onErrorEvaluation);
    React.useEffect(() => {
      const rerouting = checkTeamRouting(teamResponse);
      if (rerouting) {
        navigate(rerouting);
      }
    }, [teamResponse]);
  }

  return (
    <div>
      {assessmentResponse.status === "success" && (
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
                {checkpointView
                  ? "See Recommendations"
                  : "Go back to checkpoints"}
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
              <ErrorPopup ref={refErrorEvaluation} />
            </div>
          </ThemeProvider>
        </PageLayout>
      )}
    </div>
  );
}

export default Evaluation;
