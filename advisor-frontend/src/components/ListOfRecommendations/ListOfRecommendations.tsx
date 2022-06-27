import {
  Theme,
  SelectChangeEvent,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { TopicAPP, useGetTopics } from "../../api/TopicAPI";
import { RootState } from "../../app/store";
import RecommendationGrid from "../Grids/Specific/Recommendation/RecommendationGrid";

/**
 * Returns dropdown menu for topic choice
 * and grid with recommendations related to specified topic
 */
function ListOfRecommendations({
  theme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assessmentId,
  templateId,
}: {
  theme: Theme;
  assessmentId: number;
  templateId: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId, userRole } = useSelector(
    (state: RootState) => state.userData
  );

  // Fetch the GetTopics API
  const { status, data } = useGetTopics(templateId);

  const [topicList, setTopicList]: [
    TopicAPP[] | undefined,
    Dispatch<TopicAPP[] | undefined>
  ] = useState();

  const [topic, setTopic]: [number | undefined, Dispatch<number | undefined>] =
    useState();

  const handleTopicChange = (event: SelectChangeEvent<number>) => {
    setTopic(Number(event.target.value));
  };

  // first render: get the area list and set the area
  React.useEffect(() => {
    if (status === "success") {
      console.log(data[0]);
      setTopicList(data);
      setTopic(data[0].id as number);
    }
  }, [status]);

  return (
    <div style={{ width: "inherit", display: "contents" }}>
      {topicList !== undefined && topic !== undefined && (
        <FormControl sx={{ width: "inherit" }}>
          <Select value={topic} onChange={handleTopicChange}>
            {topicList.map((t) => (
              <MenuItem key={`menu-topic-${t.id}`} value={t.id}>
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
