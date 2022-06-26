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
import pdf from "./pdf";
import ProgressEvaluationCard from "../../components/PageCard/SpecificPageCards/ProgressEvaluationCard";
import ListOfRecommendations from "../../components/ListOfRecommendations/ListOfRecommendations";
import {
  AssessmentAPP,
  useGetAssessment,
  usePostFeedbackAssessment,
} from "../../api/AssessmentAPI";
import ProgressOverallCard from "../../components/PageCard/SpecificPageCards/ProgressOverallCard";

/**
 * Page with the feedback related to a self assessment
 * This should only be accessible to the user whose assement this belongs to
 */
function Feedback({ team, theme }: { team: boolean; theme: Theme }) {
  const { assessmentId } = useParams();

  const { userRole } = useSelector((state: RootState) => state.userData);

  // hardcoded to test pdf generation
  const recs = [
    { order: 1, description: "bla", additionalInfo: "hello" },
    { order: 2, description: "bla", additionalInfo: "hello" },
  ];
  // hardcoded to test pdf generation
  const checkpoints = [
    {
      number: 1,
      description:
        "this is a checkpoint description this is supposed to be quite long in order to test how it will look like in a table, so i'm just writing random things in hopes that it will work properly and none of the text disappears or goes over another",
      topics: "topic 1, topic 2",
      answer: "yes",
    },
    {
      number: 1,
      description: "this is a checkpoint description",
      topics: "topic 4",
      answer: "no",
    },
  ];

  const createPDF = () => {
    const filename = `Feedback-${assessmentId}.pdf`;
    const recsHeaders = ["Priority", "Recommendation", "Additional Info"];
    const recsArray = recs.map((r) => [
      r.order,
      r.description,
      r.additionalInfo,
    ]);
    const recsSections = [
      { title: "", text: "here is the automated feedback" },
      { title: "Assessor Feedback", text: "here is the assessor feedback" },
    ];
    const recsTable = {
      title: "Recommendations",
      sections: recsSections,
      data: recsArray,
      headers: recsHeaders,
    };

    const checkpointHeaders = ["Number", "Description", "Topics", "Answer"];
    const checkArray = checkpoints.map((c) => [
      c.number,
      c.description,
      c.topics,
      c.answer,
    ]);
    const checkSections = [
      { title: "Subarea", text: "here is the subarea description" },
    ];
    const checkAreaTable = {
      title: "Checkpoints: Area Name",
      sections: checkSections,
      data: checkArray,
      headers: checkpointHeaders,
    };
    pdf({
      title: `Feedback for assessment ${assessmentId}`,
      tables: [recsTable, checkAreaTable, checkAreaTable],
      filename,
    });
  };

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
        />
      )}

      {value === "Checkpoints" && (
        <ListOfCheckpoints
          feedback
          theme={theme}
          assessmentId={Number(assessmentId)}
        />
      )}

      {value === "Progress" && <ProgressEvaluationCard />}

      <Button
        className="widthInherited"
        variant="contained"
        onClick={createPDF}
      >
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
