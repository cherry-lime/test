import {
  ThemeOptions,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { AnswerAPP, useGetAnswers } from "../../api/AnswerAPI";
import { AssessmentAPP, useGetSaveAssessment } from "../../api/AssessmentAPI";
import { CategoryAPP, useGetCategories } from "../../api/CategoryAPI";
import { TopicAPP, useGetTopics } from "../../api/TopicAPI";
import AreaSpecificCheckpoints from "./AreaSpecificCheckpoints";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function ListOfCheckpoints({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assessmentInfo,
  theme,
  feedback,
}: {
  assessmentInfo: AssessmentAPP;
  theme: ThemeOptions;
  feedback: boolean;
}) {
  const [activeArea, setActiveArea] = useState<number>();

  const handleAreaChange = (event: SelectChangeEvent<number>) => {
    setActiveArea(Number(event.target.value));
  };

  // GET ASSESSMENT INFORMATION

  const [areaList, setAreaList] = useState<CategoryAPP[]>();
  const [answerList, setAnswerList] = useState<AnswerAPP[]>();
  const [checkpointAnswerList, setCheckpointAnswerList] =
    useState<Record<number, number | undefined>>();

  // get area list from API
  const areasResponse = useGetCategories(
    Number(assessmentInfo.templateId),
    true
  );

  // get answer list from API
  const answersResponse = useGetAnswers(
    Number(assessmentInfo.templateId),
    true
  );

  // get checkpoint answer list from API
  const checkpointAnswerResponse = useGetSaveAssessment(
    Number(assessmentInfo.id)
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
  const topicResponse = useGetTopics(assessmentInfo?.templateId);

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

  React.useEffect(() => {
    if (areaList && areaList.length > 0) {
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

      {activeArea &&
        answerList &&
        assessmentInfo &&
        checkpointAnswerList &&
        topicList && (
          <AreaSpecificCheckpoints
            theme={theme}
            topicList={topicList}
            areaId={activeArea}
            answerList={answerList}
            checkpointAnswerList={checkpointAnswerList}
            feedback={feedback}
            assessmentId={Number(assessmentInfo.id)}
          />
        )}
    </div>
  );
}

export default ListOfCheckpoints;
