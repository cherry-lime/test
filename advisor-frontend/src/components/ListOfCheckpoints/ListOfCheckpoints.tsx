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
import { AssessmentAPP, useGetAssessment } from "../../api/AssessmentAPI";
import { CategoryAPP, useGetCategories } from "../../api/CategoryAPI";
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

  const [activeArea, setActiveArea] = useState<number>();

  const handleAreaChange = (event: SelectChangeEvent<number>) => {
    setActiveArea(Number(event.target.value));
  };

  // GET ASSESSMENT INFORMATION

  const [assessmentInfo, setAssessmentInfo] = useState<AssessmentAPP>();
  const [areaList, setAreaList] = useState<CategoryAPP[]>();
  const [answerList, setAnswerList] = useState<AnswerAPP[]>();

  // get assessment information from API
  const {
    status: assessmentStatus,
    data: assessmentData,
    error: assessmentError,
  } = useGetAssessment(Number(assessmentId));

  // get area list from API
  const areasResponse = useGetCategories(
    Number(assessmentInfo?.templateId),
    false,
    assessmentInfo?.templateId
  );

  // get answer list from API
  const answersResponse = useGetAnswers(
    Number(assessmentInfo?.templateId),
    false,
    assessmentInfo?.templateId
  );

  // set assessment info value
  React.useEffect(() => {
    switch (assessmentStatus) {
      case "error":
        // eslint-disable-next-line no-console
        console.log(assessmentError);
        break;
      case "success":
        if (assessmentData) {
          setAssessmentInfo(assessmentData);
        }
        break;
      default:
        break;
    }
  }, [assessmentStatus, assessmentData]);

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

  const hardcodedSubareaList = [hardcodedSubarea1, hardcodedSubarea2];

  // END OF HARDCODED DATA USED TO TEST

  const [checkpoints, setCheckpoints] = useState<AssessmentCheckpoint[]>();

  const [subareas, setSubareas]: [
    AssessmentSubarea[] | undefined,
    Dispatch<AssessmentSubarea[] | undefined>
  ] = useState();

  const [checkpointComponents, setCheckpointComponents] =
    useState<React.ReactElement[]>();

  const [subareaComponents, setSubareaComponents] =
    useState<React.ReactElement[]>();

  // first render: get the area and the answer list
  React.useEffect(() => {
    if (areaList) {
      setActiveArea(Number(areaList[0].id));
    }
  }, [areaList]);

  React.useEffect(() => {
    // get area checkpoints from API
    // this if-else is purely for testing purposes
    if (activeArea === 14) {
      setCheckpoints([hardcodedCheckpoint1]);
    } else {
      setCheckpoints([hardcodedCheckpoint1, hardcodedCheckpoint2]);
    }
    // get subareas from API
    setSubareas(hardcodedSubareaList);
  }, [activeArea]);

  React.useEffect(() => {
    if (checkpoints !== undefined && answerList !== undefined) {
      return setCheckpointComponents(
        checkpoints.map((checkpoint) => (
          <Checkpoint
            key={`checkpoint-card-${checkpoint.checkpointId}`}
            feedback={feedback}
            number={checkpoint.order}
            topics={checkpoint.topics.map((topic) => topic.name)}
            theme={theme}
            description={checkpoint.description}
            checkpointvalues={answerList.map((a) => Number(a.id))}
            checkpointlabels={answerList.map((a) => a.label)}
          />
        ))
      );
    }
    return undefined;
  }, [checkpoints]);

  React.useEffect(() => {
    if (subareas !== undefined) {
      setSubareaComponents(
        subareas.map((subarea) => (
          <Subarea
            key={subarea.subareaId}
            theme={theme}
            title={subarea.name}
            summary={subarea.summary}
            description={subarea.description}
          />
        ))
      );
    }
  }, [subareas]);

  return (
    <div style={{ width: "inherit", display: "contents" }}>
      {areaList !== undefined && activeArea !== undefined && (
        <FormControl sx={{ width: "inherit" }}>
          <Select value={activeArea} onChange={handleAreaChange}>
            {areaList.map((a) => (
              <MenuItem key={`menu-area-${a.id}`} value={a.id}>
                {a.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

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

export default ListOfCheckpoints;
