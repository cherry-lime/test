import {
  Grid,
  Stack,
  Pagination,
  Card,
  Tab,
  Tabs,
  ThemeOptions,
} from "@mui/material";
import React, { useState } from "react";
import { AnswerAPP } from "../../api/AnswerAPI";
import { CheckpointAPP, useGetCheckpoints } from "../../api/CheckpointAPI";
import { SubareaAPP, useGetSubareas } from "../../api/SubareaAPI";
import Checkpoint from "../Checkpoint/Checkpoint";
import Subarea from "../Subarea/Subarea";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function AreaSpecificCheckpoints({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assessmentId,
  areaId,
  answerList,
  checkpointAnswerList,
  theme,
  feedback,
}: {
  assessmentId: number;
  areaId: number;
  answerList: AnswerAPP[];
  checkpointAnswerList: Record<number, number>;
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

  const [subareaList, setSubareaList] = useState<SubareaAPP[]>();
  const [checkpointList, setCheckpointList] = useState<CheckpointAPP[]>();
  // get answer list from API
  const subareasResponse = useGetSubareas(areaId, true);

  // get checkpoint list from API
  const checkpointResponse = useGetCheckpoints(areaId, true);

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

  // create checkpoint card components
  React.useEffect(() => {
    if (checkpointList && answerList && checkpointAnswerList) {
      return setCheckpointComponents(
        checkpointList.map((checkpoint) => (
          <Checkpoint
            key={`checkpoint-card-${checkpoint.id}`}
            feedback={feedback}
            number={checkpoint.order}
            topicIds={checkpoint.topics}
            selectedAnswer={
              Number(checkpoint.id) in checkpointAnswerList
                ? checkpointAnswerList[Number(checkpoint.id)].toString()
                : ""
            }
            theme={theme}
            description={checkpoint.description}
            answers={answerList}
          />
        ))
      );
    }
    return undefined;
  }, [checkpointList, checkpointAnswerList]);

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
    </div>
  );
}

export default AreaSpecificCheckpoints;
