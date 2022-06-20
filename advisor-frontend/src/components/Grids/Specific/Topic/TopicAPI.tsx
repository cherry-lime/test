import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { GridRowId } from "@mui/x-data-grid";

const API_URL = "https://tabackend.azurewebsites.net";

export type TopicRow = {
  id: GridRowId;
  name: string;
  templateId: number;
};

type Topic = {
  topic_id: number;
  topic_name: string;
  template_id: number;
};

function toRow(topic: Topic) {
  return {
    id: topic.topic_id,
    name: topic.topic_name,
    templateId: topic.template_id,
  } as TopicRow;
}

function fromRow(row: TopicRow) {
  return {
    topic_id: row.id,
    topic_name: row.name,
    template_id: row.templateId,
  } as Topic;
}

// Get all topics from database
export function useGetTopics(templateId: number) {
  return useQuery(["GET", "/template", templateId, "/topic"], async () => {
    // Get response data from database
    const { data } = await axios.get(`${API_URL}/template/${templateId}/topic`);

    // Filter data on type of the templates
    const dataFiltered = data.filter(
      (topic: Topic) => topic.template_id === templateId
    );

    // Convert filtered data to rows
    const rows = dataFiltered.map((topic: Topic) => toRow(topic));

    return rows as TopicRow[];
  });
}

// Post topic to database
export function usePostTopic(templateId: number) {
  return useMutation(["POST", "/template", templateId, "/topic"], async () => {
    // Get response data from database
    const { data } = await axios.post(
      `${API_URL}/template/${templateId}/topic`
    );

    // Convert data to row
    return toRow(data);
  });
}

// Get topic with id from database
export function useGetTopic() {
  return useQuery(["GET", "/topic", "/{topic_id}"], async (topicId) => {
    // Get data from database
    const { data } = await axios.get(`${API_URL}/topic/${topicId}`);

    return data as Topic;
  });
}

// Patch topic in database
export function usePatchTopic() {
  return useMutation(
    ["PATCH", "/topic", "/{topic_id}"],
    async (row: TopicRow) => {
      // Convert row to template
      const topic = fromRow(row);

      // Get response data from database
      const { data } = await axios.patch(
        `${API_URL}/topic/${topic.topic_id}`,
        topic
      );

      // Convert data to row
      return toRow(data);
    }
  );
}

// Delete topic from database
export function useDeleteTopic() {
  return useMutation(
    ["DELETE", "/topic", "/{topic_id}"],
    async (topicId: number) => {
      // Get response data from database
      const { data } = await axios.delete(`${API_URL}/topic/${topicId}`);

      // Convert data to row
      return toRow(data);
    }
  );
}
