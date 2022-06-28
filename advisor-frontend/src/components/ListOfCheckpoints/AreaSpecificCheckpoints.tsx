import {
  Grid,
  Stack,
  Pagination,
  Card,
  Tab,
  Tabs,
  ThemeOptions,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { AnswerAPP } from "../../api/AnswerAPI";
import { CheckpointAPP, useGetCheckpoints } from "../../api/CheckpointAPI";
import { SubareaAPP, useGetSubareas } from "../../api/SubareaAPI";
import Checkpoint from "../Checkpoint/Checkpoint";
import Subarea from "../Subarea/Subarea";
import { TopicAPP } from "../../api/TopicAPI";
import ErrorPopup, { RefObject } from "../ErrorPopup/ErrorPopup";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function AreaSpecificCheckpoints({
  assessmentId,
  topicList,
  areaId,
  answerList,
  checkpointAnswerList,
  setCheckpointAnswerList,
  theme,
  feedback,
}: {
  assessmentId: number;
  topicList: TopicAPP[];
  areaId: number;
  answerList: AnswerAPP[];
  checkpointAnswerList: Record<number, number | undefined>;
  setCheckpointAnswerList: React.Dispatch<
    React.SetStateAction<Record<number, number | undefined> | undefined>
  >;
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
    // here we need to send new value to API
  };

  // GET ASSESSMENT INFORMATION

  // Ref for error popup
  const ref = useRef<RefObject>(null);

  const [subareaList, setSubareaList] = useState<SubareaAPP[]>();
  const [checkpointList, setCheckpointList] = useState<CheckpointAPP[]>();
  // get answer list from API
  const subareasResponse = useGetSubareas(areaId, true, ref);

  // get checkpoint list from API
  const checkpointResponse = useGetCheckpoints(areaId, true, ref);

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

  const checkpointIdToAnswerLabel = (checkpointId: number) => {
    if (checkpointId in checkpointAnswerList) {
      const answer = checkpointAnswerList[checkpointId] || "-";
      return answer.toString() || "-";
    }
    return "";
  };

  const createCheckpointCard = (checkpoint: CheckpointAPP) => (
    <Checkpoint
      key={`checkpoint-card-${checkpoint.id}`}
      feedback={feedback}
      checkpointId={Number(checkpoint.id)}
      assessmentId={assessmentId}
      topicList={topicList}
      number={checkpoint.order}
      topicIds={checkpoint.topics}
      selectedAnswer={checkpointIdToAnswerLabel(checkpoint.id)}
      setCheckpointAnswerList={setCheckpointAnswerList}
      theme={theme}
      description={checkpoint.description}
      answers={answerList}
    />
  );

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
        checkpointList &&
        checkpointList[page - 1] !== undefined &&
        createCheckpointCard(checkpointList[page - 1])}

      {value === "List" &&
        checkpointList !== undefined &&
        checkpointList.map((checkpoint) => createCheckpointCard(checkpoint))}

      {checkpointList !== undefined && (
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              {value === "Single" && (
                <Pagination
                  onChange={handlePageChange}
                  count={checkpointList.length}
                  shape="rounded"
                  color="primary"
                  page={page}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
      <ErrorPopup ref={ref} />
    </div>
  );
}

export default AreaSpecificCheckpoints;
