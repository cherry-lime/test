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
import { SubareaAPP, useGetSubareas } from "../../api/SubareaAPI";
import Checkpoint from "../Checkpoint/Checkpoint";
import Subarea from "../Subarea/Subarea";
import AreaSpecificCheckpoints from "./AreaSpecificCheckpoints";

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
  assessmentId: number;
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
  const [subareaList, setSubareaList] = useState<SubareaAPP[]>();

  // get assessment information from API
  const {
    status: assessmentStatus,
    data: assessmentData,
    error: assessmentError,
  } = useGetAssessment(Number(assessmentId));

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

  React.useEffect(() => {
    if (areaList) {
      setActiveArea(Number(areaList[0].id));
    }
  }, [areaList]);

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

      {activeArea && answerList && assessmentId && (
        <AreaSpecificCheckpoints
          theme={theme}
          areaId={activeArea}
          answerList={answerList}
          feedback={feedback}
          assessmentId={Number(assessmentId)}
        />
      )}
    </div>
  );
}

export default ListOfCheckpoints;
