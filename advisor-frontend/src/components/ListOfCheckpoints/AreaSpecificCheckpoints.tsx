import {
  Grid,
  Stack,
  Pagination,
  Card,
  Tab,
  Tabs,
  ThemeOptions,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch, useState } from "react";
import { AnswerAPP, useGetAnswers } from "../../api/AnswerAPI";
import {
  AssessmentAPP,
  AssessmentCheckpointAPP,
  useGetAssessment,
  useGetSaveAssessment,
} from "../../api/AssessmentAPI";
import { CategoryAPP, useGetCategories } from "../../api/CategoryAPI";
import { CheckpointAPP, useGetCheckpoints } from "../../api/CheckpointAPI";
import { SubareaAPP, useGetSubareas } from "../../api/SubareaAPI";
import Checkpoint from "../Checkpoint/Checkpoint";
import Subarea from "../Subarea/Subarea";

type AssessmentCheckpoint = {
  checkpointId: number;
  description: string;
  area: Area;
  order: number;
  topics: Topic[];
};

type Topic = {
  topicId: number;
  name: string;
};

type Area = {
  areaId: number;
  name: string;
};

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function AreaSpecificCheckpoints({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assessmentId,
  areaId,
  answerList,
  theme,
  feedback,
}: {
  assessmentId: number;
  areaId: number;
  answerList: AnswerAPP[];
  theme: ThemeOptions;
  feedback: boolean;
}) {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const [value, setValue] = React.useState("Single");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // GET ASSESSMENT INFORMATION

  const [subareaList, setSubareaList] = useState<SubareaAPP[]>();
  const [checkpointList, setCheckpointList] = useState<CheckpointAPP[]>();
  const [checkpointAnswerList, setCheckpointAnswerList] =
    useState<AssessmentCheckpointAPP[]>();

  // get answer list from API
  const subareasResponse = useGetSubareas(areaId, true);

  // get checkpoint list from API
  const checkpointResponse = useGetCheckpoints(areaId, true);

  // get checkpoint answer list from API
  const checkpointAnswerResponse = useGetSaveAssessment(assessmentId);

  const [checkpointComponents, setCheckpointComponents] =
    useState<React.ReactElement[]>();

  const [subareaComponents, setSubareaComponents] =
    useState<React.ReactElement[]>();

  // set the subarea list value
  React.useEffect(() => {
    if (subareasResponse.data) {
      switch (subareasResponse.status) {
        case "error":
          // eslint-disable-next-line no-console
          console.log(subareasResponse.error);
          break;
        case "success":
          if (subareasResponse.data) {
            setSubareaList(subareasResponse.data);
          }
          break;
        default:
          break;
      }
    }
  }, [subareasResponse]);

  // set the checkpoint list value
  React.useEffect(() => {
    if (checkpointResponse.data) {
      switch (checkpointResponse.status) {
        case "error":
          // eslint-disable-next-line no-console
          console.log(checkpointResponse.error);
          break;
        case "success":
          if (checkpointResponse.data) {
            setCheckpointList(checkpointResponse.data);
          }
          break;
        default:
          break;
      }
    }
  }, [checkpointResponse]);

  // set the checkpoint list value
  React.useEffect(() => {
    if (checkpointAnswerResponse.data) {
      switch (checkpointAnswerResponse.status) {
        case "success":
          if (checkpointAnswerResponse.data) {
            setCheckpointAnswerList(checkpointAnswerResponse.data);
          }
          break;
        default:
          break;
      }
    }
  }, [checkpointAnswerResponse]);

  // create checkpoint card components
  React.useEffect(() => {
    if (checkpointList !== undefined && answerList !== undefined) {
      return setCheckpointComponents(
        checkpointList.map((checkpoint) => (
          <Checkpoint
            key={`checkpoint-card-${checkpoint.id}`}
            feedback={feedback}
            number={checkpoint.order}
            topicIds={checkpoint.topics}
            selectedAnswer=""
            theme={theme}
            description={checkpoint.description}
            answers={answerList}
          />
        ))
      );
    }
    return undefined;
  }, [checkpointList]);

  // BEGINNING OF HARDCODED DATA USED TO TEST

  const hardcodedArea1 = { areaId: 14, name: "Ready Work" };
  const hardcodedArea2 = { areaId: 4, name: "Alignment" };

  const hardcodedTopic1 = { topicId: 15, name: "Risk Analysis" };
  const hardcodedTopic2 = { topicId: 5, name: "Test Strategy" };

  const hardcodedCheckpoint1 = {
    checkpointId: 12,
    description: "Checkpoint description",
    area: hardcodedArea1,
    order: 1,
    topics: [hardcodedTopic1, hardcodedTopic2],
  };

  const hardcodedCheckpoint2 = {
    checkpointId: 2,
    description: "Another checkpoint description",
    area: hardcodedArea2,
    order: 2,
    topics: [hardcodedTopic1],
  };

  const hardcodedSubarea1 = {
    subareaId: 23,
    name: "Subarea Name",
    description: "Subarea Description",
    summary: "Subarea Summary",
  };

  const hardcodedSubarea2 = {
    subareaId: 10,
    name: "Another Subarea Name",
    description: "Subarea Description",
    summary: "Subarea Summary",
  };

  // END OF HARDCODED DATA USED TO TEST

  const [checkpoints, setCheckpoints] = useState<AssessmentCheckpoint[]>();

  React.useEffect(() => {
    if (subareaList !== undefined) {
      setSubareaComponents(
        subareaList.map((subarea) => (
          <Subarea
            key={`subarea${subarea.id}`}
            theme={theme}
            title={subarea.name}
            summary={subarea.summary}
            description={subarea.description}
          />
        ))
      );
    }
  }, [subareaList]);

  return (
    <div style={{ width: "inherit", display: "contents" }}>
      <Card
        sx={{
          backgroundColor: "white",
          width: "inherit",
          borderRadius: "5px",
        }}
      >
        <Stack direction="row" justifyContent="left" alignItems="center">
          <Tabs value={value} onChange={handleChange} textColor="primary">
            <Tab value="Single" label="Single" />
            <Tab value="List" label="List" />
          </Tabs>
        </Stack>
      </Card>
      {subareaComponents !== undefined && subareaComponents}
      {value === "Single" &&
        checkpointComponents !== undefined &&
        checkpointComponents[page - 1]}
      {value === "List" &&
        checkpointComponents !== undefined &&
        checkpointComponents}
      {checkpoints !== undefined && (
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              {value === "Single" && (
                <Pagination
                  onChange={handlePageChange}
                  count={checkpoints.length}
                  shape="rounded"
                  color="primary"
                  page={page}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default AreaSpecificCheckpoints;
