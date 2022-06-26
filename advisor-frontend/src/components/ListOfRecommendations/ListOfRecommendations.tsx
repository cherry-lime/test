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
import RecommendationGrid from "../Grids/Specific/Recommendation/RecommendationGrid";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assessmentId,
}: {
  theme: Theme;
  assessmentId: string | undefined;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          assessmentId={1} // assessmentId
          topicId={topic}
          isEditable={userRole === "ASSESSOR"} // TODO: Add && assessment === done later
        />
      )}
    </div>
  );
}

export default ListOfRecommendations;
