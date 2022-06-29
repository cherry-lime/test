import { Card, Stack, Tab, Tabs, Theme, Button, Box } from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import userTypes from "../../components/Sidebar/listUsersTypes";
import Subarea from "../../components/Subarea/Subarea";
import PageLayout from "../PageLayout";
import ListOfCheckpoints from "../../components/ListOfCheckpoints/ListOfCheckpoints";
import TextfieldEdit from "../../components/TextfieldEdit/TextfieldEdit";
import Textfield from "../../components/Textfield/Textfield";
import { RootState } from "../../app/store";
import createPDF from "./pdf";
import ProgressEvaluationCard from "../../components/PageCard/SpecificPageCards/ProgressEvaluationCard";
import ListOfRecommendations from "../../components/ListOfRecommendations/ListOfRecommendations";
import {
  AssessmentAPP,
  AssessmentCheckpointAPP,
  useGetAssessment,
  useGetSaveAssessment,
  usePostFeedbackAssessment,
} from "../../api/AssessmentAPI";
import { CategoryAPP, useGetCategories } from "../../api/CategoryAPI";
import { AnswerAPP, useGetAnswers } from "../../api/AnswerAPI";
import { TopicAPP, useGetTopics } from "../../api/TopicAPI";
import ErrorPopup, { RefObject } from "../../components/ErrorPopup/ErrorPopup";

const showFeedbackTextUser = (
  team: boolean,
  userRole: string,
  value: string,
  assessmentInfo: AssessmentAPP
) =>
  team &&
  userRole === "USER" &&
  value === "Recommendations" &&
  assessmentInfo &&
  assessmentInfo.feedbackText;

const showFeedbackTextAssessor = (
  team: boolean,
  userRole: string,
  value: string,
  assessmentInfo: AssessmentAPP
) =>
  team &&
  userRole === "ASSESSOR" &&
  value === "Recommendations" &&
  assessmentInfo;

/**
 * Page with the feedback related to a self assessment
 * This should only be accessible to the user whose assement this belongs to
 */
function Feedback({ team, theme }: { team: boolean; theme: Theme }) {
  const { assessmentId, teamId } = useParams();

  const { userRole } = useSelector((state: RootState) => state.userData);

  const [value, setValue] = useState("Recommendations");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Ref for error popup
  const ref = useRef<RefObject>(null);
  const navigate = useNavigate();

  const [assessmentInfo, setAssessmentInfo] = useState<AssessmentAPP>();

  const assessmentResponse = useGetAssessment(Number(assessmentId), ref);

  React.useEffect(() => {
    if (assessmentResponse.status === "success" && assessmentResponse.data) {
      setAssessmentInfo(assessmentResponse.data);
      if (!assessmentResponse.data.completedAt) {
        navigate(
          team
            ? `/teams/${teamId}/${assessmentId}`
            : `/user/self_evaluations/${assessmentId}`
        );
      }
    }
  }, [assessmentResponse.status, assessmentResponse.data]);

  const postFeedback = usePostFeedbackAssessment(Number(assessmentId), ref);

  const changeFeedback = (newFeedback: string) => {
    postFeedback.mutate(newFeedback, {
      onSuccess: (newAssessmentInfo: AssessmentAPP) => {
        setAssessmentInfo(newAssessmentInfo);
      },
    });
  };

  const [areaList, setAreaList] = useState<CategoryAPP[]>();
  const [answerList, setAnswerList] = useState<AnswerAPP[]>();
  const [checkpointAnswerList, setCheckpointAnswerList] =
    useState<Record<number, number | undefined>>();

  // get area list from API
  const areasResponse = useGetCategories(
    Number(assessmentInfo?.templateId),
    true,
    ref
  );

  // get answer list from API
  const answersResponse = useGetAnswers(
    Number(assessmentInfo?.templateId),
    true,
    ref
  );

  // get checkpoint answer list from API
  const checkpointAnswerResponse = useGetSaveAssessment(
    Number(assessmentInfo?.id),
    ref
  );

  // set the area list value
  React.useEffect(() => {
    if (areasResponse.data && areasResponse.status === "success") {
      setAreaList(areasResponse.data);
    }
  }, [areasResponse]);

  // set the answer list value
  React.useEffect(() => {
    if (answersResponse.data && answersResponse.status === "success") {
      setAnswerList(answersResponse.data);
    }
  }, [answersResponse]);

  React.useEffect(() => {
    if (
      checkpointAnswerResponse.data &&
      checkpointAnswerResponse.status === "success"
    ) {
      const answerDictionary: Record<number, number | undefined> = {};
      checkpointAnswerResponse.data.forEach((a: AssessmentCheckpointAPP) => {
        answerDictionary[a.checkpointId] = a.answerId;
      });
      setCheckpointAnswerList(answerDictionary);
    }
  }, [checkpointAnswerResponse.status, checkpointAnswerResponse.data]);

  const [topicList, setTopicList] = useState<TopicAPP[]>([]);
  const topicResponse = useGetTopics(
    Number(assessmentInfo?.templateId),
    true,
    ref
  );

  // set assessment info value
  React.useEffect(() => {
    if (topicResponse.status === "success" && topicResponse.data) {
      setTopicList(topicResponse.data);
    }
  }, [topicResponse.status, topicResponse.data]);

  const download = () => {
    if (
      assessmentId &&
      areaList &&
      answerList &&
      checkpointAnswerList &&
      topicList
    ) {
      createPDF(
        Number(assessmentId),
        areaList,
        checkpointAnswerList,
        topicList,
        answerList
      );
    }
  };
  /*
  return page with title,
  tabs for recommendations + checkpoints + progress (from left to right)
  followed by (automated) feedback
  An import note is that once you receive automated feedback,
  the checkpoint answers are not editable
  */
  return (
    <PageLayout
      title={
        team ? "Team Evaluation Feedback" : "Individual Evaluation Feedback"
      }
      sidebarType={userTypes[userRole]}
    >
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
            {userRole === "ASSESSOR" && (
              <Tab value="Progress" label="Progress" />
            )}
          </Tabs>
        </Stack>
      </Card>

      {/* this is not actually a subarea, it's the automated feedback */}
      {value !== "Progress" &&
        assessmentInfo &&
        assessmentInfo.information !== "" && (
          <Subarea
            theme={theme}
            title=""
            summary=""
            description={assessmentInfo.information}
          />
        )}

      {team && value === "Recommendations" && <h2>Facilitator Feedback</h2>}

      {assessmentInfo &&
        showFeedbackTextAssessor(team, userRole, value, assessmentInfo) && (
          <TextfieldEdit
            rows={5}
            theme={theme}
            text={assessmentInfo.feedbackText}
            handleSave={changeFeedback}
          />
        )}

      {assessmentInfo &&
        showFeedbackTextUser(team, userRole, value, assessmentInfo) && (
          <Textfield
            rows={5}
            columns="inherit"
            theme={theme}
            text={assessmentInfo.feedbackText}
          />
        )}

      {value === "Recommendations" && assessmentInfo && (
        <ListOfRecommendations
          theme={theme}
          assessmentId={Number(assessmentId)}
          templateId={Number(assessmentInfo.templateId)}
          completedAt={assessmentInfo.completedAt}
        />
      )}

      {value === "Checkpoints" && assessmentInfo && (
        <ListOfCheckpoints
          feedback
          theme={theme}
          assessmentInfo={assessmentInfo}
        />
      )}

      {value === "Progress" && assessmentInfo && (
        <ProgressEvaluationCard
          assessmentId={Number(assessmentId)}
          templateId={Number(assessmentInfo.templateId)}
        />
      )}
      {/* create button component at the bottom of the page
      in which you will see a download as pdf button */}
      <Button className="widthInherited" variant="contained" onClick={download}>
        <Stack direction="row">
          <CloudDownloadOutlinedIcon sx={{ fontSize: 40 }} />
          <Box sx={{ p: 1.0 }}>
            {" "}
            <b>
              <u>Download as PDF</u>
            </b>
          </Box>
        </Stack>
      </Button>
      <ErrorPopup ref={ref} />
    </PageLayout>
  );
}

export default Feedback;
