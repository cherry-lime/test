import {
  ThemeOptions,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  ThemeProvider,
  Button,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useRef, useState } from "react";
import { AnswerAPP, useGetAnswers } from "../../api/AnswerAPI/AnswerAPI";
import {
  AssessmentAPP,
  useGetSaveAssessment,
} from "../../api/AssessmentAPI/AssessmentAPI";
import {
  CategoryAPP,
  useGetCategories,
} from "../../api/CategoryAPI/CategoryAPI";
import { TopicAPP, useGetTopics } from "../../api/TopicAPI/TopicAPI";
import ErrorPopup, { getOnError, RefObject } from "../ErrorPopup/ErrorPopup";
import AreaSpecificCheckpoints from "./AreaSpecificCheckpoints";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function ListOfCheckpoints({
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
  const [activeArea, setActiveArea] = useState<CategoryAPP>();

  /**
   * GET ASSESSMENT INFORMATION
   */

  const [areaList, setAreaList] = useState<CategoryAPP[]>();
  const [answerList, setAnswerList] = useState<AnswerAPP[]>([]);
  const [checkpointAnswerList, setCheckpointAnswerList] =
    useState<Record<number, number | undefined>>();

  const handleAreaChange = (event: SelectChangeEvent<number>) => {
    if (areaList) {
      const newArea = areaList.filter((a) => a.id === event.target.value)[0];
      setActiveArea(newArea);
    }
  };

  React.useEffect(() => {
    if (setPrimaryColor && activeArea) {
      setPrimaryColor(activeArea.color);
    }
  }, [activeArea]);

  /**
   * Ref for error popup
   */
  const refErrorCheckpoints = useRef<RefObject>(null);
  const onErrorCheckpoints = getOnError(refErrorCheckpoints);

  /**
   * get area list from API
   */
  const areasResponse = useGetCategories(
    Number(assessmentInfo?.templateId),
    true,
    onErrorCheckpoints
  );

  /**
   * get answer list from API
   */
  const answersResponse = useGetAnswers(
    Number(assessmentInfo?.templateId),
    true,
    onErrorCheckpoints
  );

  /**
   * get checkpoint answer list from API
   */
  const checkpointAnswerResponse = useGetSaveAssessment(
    Number(assessmentInfo?.id),
    onErrorCheckpoints
  );

  /**
   * set the area list value
   */
  React.useEffect(() => {
    if (areasResponse.data && areasResponse.status === "success") {
      setAreaList(areasResponse.data);
    }
  }, [areasResponse]);

  /**
   * go back to previous area
   */
  const handlePreviousArea = () => {
    if (areaList && activeArea) {
      // index of active area in array is order - 1
      // so index of previous area is order - 2
      const prevArea = areaList[activeArea.order - 2];
      setActiveArea(prevArea);
    }
  };

  /**
   * go to the next area
   */
  const handleNextArea = () => {
    if (areaList && activeArea) {
      // index of area in array is order - 1
      // so index of next area is order
      const nextArea = areaList[activeArea.order];
      setActiveArea(nextArea);
    }
  };

  /**
   * set the answer list value
   * using the useEffect hooks from React
   */
  React.useEffect(() => {
    if (answersResponse.data && answersResponse.status === "success") {
      setAnswerList(answersResponse.data);
    }
  }, [answersResponse]);

  /**
   * create an checkpoint answer dictionary where each
   * checkpoint id maps to an answer id
   */
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

  /**
   * set assessment info value
   */
  React.useEffect(() => {
    if (topicResponse.status === "success" && topicResponse.data) {
      setTopicList(topicResponse.data);
    }
  }, [topicResponse.status, topicResponse.data]);

  React.useEffect(() => {
    if (areaList && areaList.length > 0) {
      setActiveArea(areaList[0]);
    }
  }, [areaList]);

  return (
    <div style={{ width: "inherit", display: "contents" }}>
      <ThemeProvider theme={theme}>
        {areaList !== undefined && activeArea !== undefined && (
          <FormControl sx={{ width: "inherit" }}>
            <Select value={Number(activeArea.id)} onChange={handleAreaChange}>
              {areaList.map((a) => (
                <MenuItem key={`menu-area-${a.id}`} value={Number(a.id)}>
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
            areaId={Number(activeArea.id)}
            answerList={answerList}
            checkpointAnswerList={checkpointAnswerList}
            setCheckpointAnswerList={setCheckpointAnswerList}
            feedback={feedback}
            assessmentId={Number(assessmentInfo.id)}
          />
        )}

      {activeArea && areaList && (
        <div
          style={{
            width: "inherit",
          }}
        >
          {activeArea.id !== areaList[0].id && (
            <Button
              sx={{ float: "left" }}
              variant="contained"
              startIcon={<ArrowBackIosNewIcon />}
              onClick={handlePreviousArea}
            >
              {" "}
              Go To Previous Area{" "}
            </Button>
          )}

          {activeArea.id !== areaList[areaList.length - 1].id && (
            <Button
              sx={{ float: "right" }}
              variant="contained"
              endIcon={<ArrowForwardIosIcon />}
              onClick={handleNextArea}
            >
              {" "}
              Go To Next Area{" "}
            </Button>
          )}
        </div>
      )}
      <ErrorPopup ref={refErrorCheckpoints} />
    </div>
  );
}

ListOfCheckpoints.defaultProps = {
  setPrimaryColor: undefined,
};

export default ListOfCheckpoints;
