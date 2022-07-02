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
 * This should only be accessible to the user/team whose assement this belongs to
 */
function Evaluation({ team, theme }: { team: boolean; theme: Theme }) {
  // get assessment id and team id from routing
  const { assessmentId, teamId } = useParams();
  // get the role of the user logged in
  const { userRole } = useSelector((state: RootState) => state.userData);

  // if checkpointview is true, then th checkpoints are displayed
  // otherwise recommendations are displayed
  const [checkpointView, setCheckpointView] = useState(true);

  // main primary color of the palette
  // this will change based on area selected  in the checkpoint view
  const [primaryColor, setPrimaryColor] = useState(theme.palette.primary.main);

  // theme of the page, this will change when the primary color changes
  const [currentTheme, setCurrentTheme] = useState(theme);

  // when the primary color changes, update theme
  React.useEffect(() => {
    setCurrentTheme(() => getUpdatedTheme(primaryColor, theme));
  }, [primaryColor]);

  // handle toggling between list of checkpoints and recommendations
  // revert back to regular primary color when switching to recommendations
  const handleViewChange = () => {
    setCheckpointView((v) => {
      if (v) setPrimaryColor(theme.palette.primary.main);
      return !v;
    });
  };

  // Ref for error popup
  const refErrorEvaluation = useRef<RefObject>(null);
  const onErrorEvaluation = getOnError(refErrorEvaluation);

  // object used to navigate to another address
  const navigate = useNavigate();

  // fuction to complete the assessment
  const postCompleteEval = usePostCompleteAssessment(
    Number(assessmentId),
    onErrorEvaluation
  );

  // when user clicks the "finish evaluation" button,
  // save the assessment on the database
  // if there is an error, it might be because not all checkpoints
  // have been filled in
  const handleClickFinish = () => {
    postCompleteEval.mutate(undefined, {
      onError: () => {
        onErrorEvaluation(
          "Error: unable to complete the evaluation. Make sure you filled in all the checkpoints."
        );
      },
      // if it's saved successfully, redirect to feedback page
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

    // check validity of routing
    const rerouting = checkAssessmentRouting({
      assessmentResponse,
      team,
      completed: false,
      teamId,
      assessmentId,
    });

    // if there is some issue, rerout the user
    if (rerouting) {
      navigate(rerouting);
    }
  }, [assessmentResponse]);

  if (team) {
    // if it's a team assessment, check that user is part of the team
    // otherwise redirect
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
