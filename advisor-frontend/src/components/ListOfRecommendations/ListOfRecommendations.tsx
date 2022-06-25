import {
  Theme,
  SelectChangeEvent,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import RecommendationGrid from "../Grids/Specific/RecommendationGrid";

type Topic = {
  topicId: number;
  name: string;
};

/**
 * Returns dropdown menu for topic choice
 * and grid with recommendations related to specified topic
 */
function ListOfRecommendations({
  theme,
  assessmentId,
}: {
  theme: Theme;
  assessmentId: string | undefined;
}) {
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

  return (
    <div style={{ width: "inherit", display: "contents" }}>
      {topicList !== undefined && topic !== undefined && (
        <FormControl sx={{ width: "inherit" }}>
          <Select value={topic} onChange={handleTopicChange}>
            {topicList.map((t) => (
              <MenuItem key={`menu-topic-${t.topicId}`} value={t.topicId}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {topic !== undefined && (
        <RecommendationGrid
          theme={theme}
          assessmentId={assessmentId}
          topicId={topic}
          assessmentType="INDIVIDUAL"
          userId={userId}
          userRole={userRole}
        />
      )}
    </div>
  );
}

export default ListOfRecommendations;
