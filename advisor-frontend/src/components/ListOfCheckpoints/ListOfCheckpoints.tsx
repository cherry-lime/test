import {
  ThemeOptions,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { AnswerAPP, useGetAnswers } from "../../api/AnswerAPI";
import { AssessmentAPP, useGetSaveAssessment } from "../../api/AssessmentAPI";
import { CategoryAPP, useGetCategories } from "../../api/CategoryAPI";
import { TopicAPP, useGetTopics } from "../../api/TopicAPI";
import ErrorPopup, { RefObject } from "../ErrorPopup/ErrorPopup";
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
  setPrimaryColor,
}: {
  assessmentInfo: AssessmentAPP;
  theme: ThemeOptions;
  feedback: boolean;
  setPrimaryColor?: React.Dispatch<React.SetStateAction<string>> | undefined;
}) {
  const [activeArea, setActiveArea] = useState<number>();

  // GET ASSESSMENT INFORMATION

  const [areaList, setAreaList] = useState<CategoryAPP[]>();
  const [answerList, setAnswerList] = useState<AnswerAPP[]>([]);
  const [checkpointAnswerList, setCheckpointAnswerList] =
    useState<Record<number, number | undefined>>();

  const handleAreaChange = (event: SelectChangeEvent<number>) => {
    setActiveArea(Number(event.target.value));
  };

  React.useEffect(() => {
    if (areaList && setPrimaryColor) {
      const newColor = areaList.filter((a) => a.id === activeArea)[0].color;
      setPrimaryColor(newColor);
    }
  }, [activeArea]);

  // Ref for error popup
  const ref = useRef<RefObject>(null);

  // get area list from API
  const areasResponse = useGetCategories(
    Number(assessmentInfo?.templateId),
    true,
    ref
  );

  // get answer list from API
  const answersResponse = useGetAnswers(
    Number(assessmentInfo?.templateId),
    true,
    ref
  );

  // get checkpoint answer list from API
  const checkpointAnswerResponse = useGetSaveAssessment(
    Number(assessmentInfo?.id),
    ref
  );

  // set the area list value
  React.useEffect(() => {
    if (areasResponse.data && areasResponse.status === "success") {
      setAreaList(areasResponse.data);
    }
  }, [areasResponse]);

  // set the answer list value
  React.useEffect(() => {
    if (answersResponse.data && answersResponse.status === "success") {
      setAnswerList(answersResponse.data);
    }
  }, [answersResponse]);

  React.useEffect(() => {
    if (
      checkpointAnswerResponse.data &&
      checkpointAnswerResponse.status === "success"
    ) {
        const answerDictionary: Record<number, number | undefined> = {};
        checkpointAnswerResponse.data.forEach((a) => {
          answerDictionary[a.checkpointId] = a.answerId;
        });
        setCheckpointAnswerList(answerDictionary);
    }
  }, [checkpointAnswerResponse.status, checkpointAnswerResponse.data]);

  const [topicList, setTopicList] = useState<TopicAPP[]>([]);
  const topicResponse = useGetTopics(assessmentInfo?.templateId);

  // set assessment info value
  React.useEffect(() => {
    if (topicResponse.status === "success" && topicResponse.data) {
      setTopicList(topicResponse.data);
    }
  }, [topicResponse.status, topicResponse.data]);

  React.useEffect(() => {
    if (areaList && areaList.length > 0) {
      setActiveArea(Number(areaList[0].id));
    }
  }, [areaList]);

  return (
    <div style={{ width: "inherit", display: "contents" }}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>

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
            setCheckpointAnswerList={setCheckpointAnswerList}
            feedback={feedback}
            assessmentId={Number(assessmentInfo.id)}
          />
        )}
      <ErrorPopup ref={ref} />
    </div>
  );
}

ListOfCheckpoints.defaultProps = {
  setPrimaryColor: undefined,
};

export default ListOfCheckpoints;
