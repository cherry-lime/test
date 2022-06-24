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

type Answer = {
  answerId: number;
  text: string;
};

type AssessmentSubarea = {
  subareaId: number;
  name: string;
  summary: string;
  description: string;
};

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function ListOfCheckpoints({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assessmentId,
  theme,
  feedback,
}: {
  assessmentId: string | undefined;
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

  // BEGINNING OF HARDCODED DATA USED TO TEST

  const hardcodedArea1 = { areaId: 14, name: "Ready Work" };
  const hardcodedArea2 = { areaId: 4, name: "Alignment" };

  const hardcodedAreaList = [hardcodedArea1, hardcodedArea2];

  const hardcodedTopic1 = { topicId: 15, name: "Risk Analysis" };
  const hardcodedTopic2 = { topicId: 5, name: "Test Strategy" };

  const hardcodedAnswerList = [
    { text: "Yes", answerId: 1 },
    { text: "No", answerId: 2 },
    { text: "N/A", answerId: 3 },
  ];

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

  const hardcodedSubareaList = [hardcodedSubarea1, hardcodedSubarea2];

  // END OF HARDCODED DATA USED TO TEST

  const [areaList, setAreaList]: [
    Area[] | undefined,
    Dispatch<Area[] | undefined>
  ] = useState();

  const [area, setArea]: [number | undefined, Dispatch<number | undefined>] =
    useState();

  const handleAreaChange = (event: SelectChangeEvent<number>) => {
    setArea(Number(event.target.value));
  };

  const [checkpoints, setCheckpoints]: [
    AssessmentCheckpoint[] | undefined,
    Dispatch<AssessmentCheckpoint[] | undefined>
  ] = useState();

  const [answers, setAnswers]: [
    Answer[] | undefined,
    Dispatch<Answer[] | undefined>
  ] = useState();

  const [subareas, setSubareas]: [
    AssessmentSubarea[] | undefined,
    Dispatch<AssessmentSubarea[] | undefined>
  ] = useState();

  const [checkpointComponents, setCheckpointComponents] = useState<React.ReactElement[]>();

  const [subareaComponents, setSubareaComponents] = useState<React.ReactElement[]>();

  // first render: get the area and the answer list
  React.useEffect(() => {
    setAreaList(hardcodedAreaList);
    setArea(hardcodedAreaList[0].areaId);
    setAnswers(hardcodedAnswerList);
  }, []);

  React.useEffect(() => {
    // get area checkpoints from API
    // this if-else is purely for testing purposes
    if (area === 14) {
      setCheckpoints([hardcodedCheckpoint1]);
    } else {
      setCheckpoints([hardcodedCheckpoint1, hardcodedCheckpoint2]);
    }
    // get subareas from API
    setSubareas(hardcodedSubareaList);
  }, [area]);

  React.useEffect(() => {
    if (checkpoints !== undefined && answers !== undefined) {
      return setCheckpointComponents(
        checkpoints.map((checkpoint) => (
          <Grid key={`checkpoint-card-${checkpoint.checkpointId}`} item>
            <Checkpoint
              feedback={feedback}
              number={checkpoint.order}
              topics={checkpoint.topics.map((topic) => topic.name)}
              theme={theme}
              description={checkpoint.description}
              checkpointvalues={answers.map((a) => a.answerId)}
              checkpointlabels={answers.map((a) => a.text)}
            />
          </Grid>
        ))
      );
    }
    return undefined;
  }, [checkpoints]);

  React.useEffect(() => {
    if (subareas !== undefined) {
      setSubareaComponents(
        subareas.map((subarea) => (
          <Grid key={subarea.subareaId} item>
            <Subarea
              theme={theme}
              title={subarea.name}
              summary={subarea.summary}
              description={subarea.description}
            />
          </Grid>
        ))
      );
    }
  }, [subareas]);

  return (
    <div style={{ width: "inherit", display: "contents" }}>
      <Grid
        sx={{ width: "inherit" }}
        container
        direction="column"
        alignItems="left"
        spacing="20px"
      >
        {areaList !== undefined && area !== undefined && (
          <Grid item sx={{ width: "inherit" }}>
            <FormControl>
              <Select value={area} onChange={handleAreaChange}>
                {areaList.map((a) => (
                  <MenuItem key={`menu-area-${a.areaId}`} value={a.areaId}>
                    {a.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item>
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
        </Grid>
        {subareaComponents !== undefined && subareaComponents}
        <Grid item>
          {value === "Single" &&
            checkpointComponents !== undefined &&
            checkpointComponents[page - 1]}
        </Grid>
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
      </Grid>
    </div>
  );
}

export default ListOfCheckpoints;
