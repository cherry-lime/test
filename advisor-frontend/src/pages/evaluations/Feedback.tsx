import { Card, Stack, Tab, Tabs, Theme, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  useGetAssessment,
  useGetSaveAssessment,
  usePostFeedbackAssessment,
} from "../../api/AssessmentAPI";
import ProgressOverallCard from "../../components/PageCard/SpecificPageCards/ProgressOverallCard";
import { CategoryAPP, useGetCategories } from "../../api/CategoryAPI";
import { AnswerAPP, useGetAnswers } from "../../api/AnswerAPI";
import { TopicAPP, useGetTopics } from "../../api/TopicAPI";

/**
 * Page with the feedback related to a self assessment
 * This should only be accessible to the user whose assement this belongs to
 */
function Feedback({ team, theme }: { team: boolean; theme: Theme }) {
  const { assessmentId } = useParams();

  const { userRole } = useSelector((state: RootState) => state.userData);

  const [value, setValue] = useState("Recommendations");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [assessmentInfo, setAssessmentInfo] = useState<AssessmentAPP>();
  const assessmentResponse = useGetAssessment(Number(assessmentId));

  React.useEffect(() => {
    switch (assessmentResponse.status) {
      case "error":
        // eslint-disable-next-line no-console
        console.log(assessmentResponse.error);
        break;
      case "success":
        if (assessmentResponse.data) {
          setAssessmentInfo(assessmentResponse.data);
        }
        break;
      default:
        break;
    }
  }, [assessmentResponse.status, assessmentResponse.data]);

  const postFeedback = usePostFeedbackAssessment(Number(assessmentId));

  const changeFeedback = (newFeedback: string) => {
    postFeedback.mutate(newFeedback, {
      onSuccess: (newAssessmentInfo: AssessmentAPP) => {
        setAssessmentInfo(newAssessmentInfo);
      },
      onError: (e: unknown) => {
        // eslint-disable-next-line no-console
        console.log(e);
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
    true
  );

  // get answer list from API
  const answersResponse = useGetAnswers(
    Number(assessmentInfo?.templateId),
    true
  );

  // get checkpoint answer list from API
  const checkpointAnswerResponse = useGetSaveAssessment(
    Number(assessmentInfo?.id)
  );

  // set the area list value
  React.useEffect(() => {
    if (areasResponse.data) {
      switch (areasResponse.status) {
        case "error":
          // eslint-disable-next-line no-console
          console.log(areasResponse.error);
          break;
        case "success":
          if (areasResponse.data) {
            setAreaList(areasResponse.data);
          }
          break;
        default:
          break;
      }
    }
  }, [areasResponse]);

  // set the answer list value
  React.useEffect(() => {
    if (answersResponse.data) {
      switch (answersResponse.status) {
        case "error":
          // eslint-disable-next-line no-console
          console.log(answersResponse.error);
          break;
        case "success":
          if (answersResponse.data) {
            setAnswerList(answersResponse.data);
          }
          break;
        default:
          break;
      }
    }
  }, [answersResponse]);

  React.useEffect(() => {
    if (checkpointAnswerResponse.data) {
      switch (checkpointAnswerResponse.status) {
        case "success":
          if (checkpointAnswerResponse.data) {
            const answerDictionary: Record<number, number | undefined> = {};
            checkpointAnswerResponse.data.forEach((a) => {
              answerDictionary[a.checkpointId] = a.answerId;
            });
            setCheckpointAnswerList(answerDictionary);
          }
          break;
        default:
          break;
      }
    }
  }, [checkpointAnswerResponse.status, checkpointAnswerResponse.data]);

  const [topicList, setTopicList] = useState<TopicAPP[]>([]);
  const topicResponse = useGetTopics(Number(assessmentInfo?.templateId), true);

  // set assessment info value
  React.useEffect(() => {
    switch (topicResponse.status) {
      case "error":
        // eslint-disable-next-line no-console
        console.log(topicResponse.error);
        break;
      case "success":
        if (topicResponse.data) {
          setTopicList(topicResponse.data);
        }
        break;
      default:
        break;
    }
  }, [topicResponse.status, topicResponse.data]);

  const download = () => {
    if (
      assessmentId &&
      areaList &&
      answerList &&
      checkpointAnswerList &&
      topicList &&
      answerList
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
      {value === "Recommendations" && <ProgressOverallCard />}

      {/* this is not actually a subarea, it's the automated feedback */}
      {value !== "Progress" && (
        <Subarea
          theme={theme}
          title=""
          summary="Below you will find a list of items that you or your squad can review in order to start improving your testing maturity. This list is based on your answers and prioritized to maximize your testing maturity."
          description="Only work on one or two items at a time. At any time, you can log back in using your username to review this feedback. Alternatively, you can fill out a new form to see how much you have already progressed and get updated recommendations."
          tip
        />
      )}

      {team && value === "Recommendations" && <h2>Assessor Feedback</h2>}

      {team &&
        userRole === "ASSESSOR" &&
        value === "Recommendations" &&
        assessmentInfo && (
          <TextfieldEdit
            rows={5}
            theme={theme}
            text={assessmentInfo.feedbackText}
            handleSave={changeFeedback}
          />
        )}

      {team &&
        userRole === "USER" &&
        value === "Recommendations" &&
        assessmentInfo && (
          <Textfield
            rows={5}
            columns="inherit"
            theme={theme}
            text={assessmentInfo.feedbackText}
          />
        )}

      {value === "Recommendations" && (
        <ListOfRecommendations
          theme={theme}
          assessmentId={Number(assessmentId)}
          templateId={assessmentInfo?.templateId}
        />
      )}

      {value === "Checkpoints" && assessmentInfo && (
        <ListOfCheckpoints
          feedback
          theme={theme}
          assessmentInfo={assessmentInfo}
        />
      )}

      {value === "Progress" && <ProgressEvaluationCard />}

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
    </PageLayout>
  );
}

export default Feedback;
