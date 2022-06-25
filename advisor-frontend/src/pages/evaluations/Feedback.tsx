import {
  Card,
  Grid,
  Stack,
  Tab,
  Tabs,
  Theme,
  Button,
  SelectChangeEvent,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { Dispatch, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import RecommendationGrid from "../../components/Grids/Specific/Recommendation/RecommendationGrid";
import userTypes from "../../components/Sidebar/listUsersTypes";
import Subarea from "../../components/Subarea/Subarea";
import PageLayout from "../PageLayout";
import ListOfCheckpoints from "../../components/ListOfCheckpoints/ListOfCheckpoints";
import TextfieldEdit from "../../components/TextfieldEdit/TextfieldEdit";
import Textfield from "../../components/Textfield/Textfield";
import { RootState } from "../../app/store";
import pdf from "./pdf";
import ProgressEvaluationCard from "../../components/PageCard/SpecificPageCards/ProgressEvaluationCard";

type Topic = {
  topicId: number;
  name: string;
};

/**
 * Page with the feedback related to a self assessment
 * This should only be accessible to the user whose assement this belongs to
 */
function Feedback({ team, theme }: { team: boolean; theme: Theme }) {
  const { assessmentId } = useParams();

  const { userId, userRole } = useSelector(
    (state: RootState) => state.userData
  );

  // BEGINNING OF HARDCODED DATA USED TO TEST

  const hardcodedTopic1 = { topicId: 14, name: "Risk Analysis" };
  const hardcodedTopic2 = { topicId: 4, name: "Test Strategy" };

  const hardcodedTopicList = [hardcodedTopic1, hardcodedTopic2];

  // END OF HARDCODED DATA USED TO TEST

  const [topicList, setTopicList]: [
    Topic[] | undefined,
    Dispatch<Topic[] | undefined>
  ] = useState();

  const [topic, setTopic]: [number | undefined, Dispatch<number | undefined>] =
    useState();

  const handleTopicChange = (event: SelectChangeEvent<number>) => {
    setTopic(Number(event.target.value));
  };

  // first render: get the area list and set the area
  React.useEffect(() => {
    setTopicList(hardcodedTopicList);
    setTopic(hardcodedTopicList[0].topicId);
  }, []);

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

  return (
    <PageLayout
      title={
        team ? "Team Evaluation Feedback" : "Individual Evaluation Feedback"
      }
      sidebarType={userTypes[userRole]}
    >
      <Grid
        sx={{ padding: "20px" }}
        container
        direction="column"
        alignItems="left"
        spacing="20px"
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
        <br />

        {/* this is not actually a subarea, it's the automated feedback */}
        {value !== "Progress" && (
          <Subarea
            theme={theme}
            title=""
            summary="Below you will find a list of items that you or your squad can review in order to start improving your testing maturity. This list is based on your answers and prioritized to maximize your testing maturity."
            description="TIP: only work on one or two items at a time. At any time, you can log back in using your username to review this feedback. Alternatively, you can fill out a new form to see how much you have already progressed and get updated recommendations."
          />
        )}

        <br />

        {team && value === "Recommendations" && <h2>Assessor Feedback</h2>}

        {team && userRole === "ASSESSOR" && value === "Recommendations" && (
          <TextfieldEdit rows={5} theme={theme} text="assessor feedback here" />
        )}

        {team && userRole === "USER" && value === "Recommendations" && (
          <Textfield
            rows={5}
            columns="inherit"
            theme={theme}
            text="assessor feedback here"
          />
        )}

        <br />
        {topicList !== undefined &&
          topic !== undefined &&
          value === "Recommendations" && (
            <FormControl>
              <Select value={topic} onChange={handleTopicChange}>
                {topicList.map((t) => (
                  <MenuItem key={`menu-topic-${t.topicId}`} value={t.topicId}>
                    {t.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

        <br />

        {value === "Recommendations" && topic !== undefined && (
          <RecommendationGrid
            theme={theme}
            assessmentId={assessmentId}
            topicId={topic}
          />
        )}

        {value === "Checkpoints" && (
          <ListOfCheckpoints
            feedback
            theme={theme}
            assessmentId={assessmentId}
          />
        )}

        {value === "Progress" && <ProgressEvaluationCard />}

        <Button
          sx={{ marginTop: "40px" }}
          variant="contained"
          onClick={createPDF}
        >
          <Stack>
            <CloudDownloadOutlinedIcon sx={{ fontSize: 40 }} />
            Download as PDF
          </Stack>
        </Button>
      </Grid>
    </PageLayout>
  );
}

export default Feedback;
