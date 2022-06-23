import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "../API";

export type TopicRow = {
  id: GridRowId;
  name: string;
  templateId: number;
  enabled: boolean;
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
    enabled: true,
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
    const { data } = await API.get(`/template/${templateId}/topic`);

    // Convert data to rows
    const rows = data.map((topic: Topic) => toRow(topic));

    return rows as TopicRow[];
  });
}

// Post topic to database
export function usePostTopic(templateId: number) {
  return useMutation(["POST", "/template", templateId, "/topic"], async () => {
    // Get response data from database
    const { data } = await API.post(`/template/${templateId}/topic`);

    // Convert data to row
    return toRow(data);
  });
}

// Get topic with id from database
export function useGetTopic() {
  return useQuery(["GET", "/topic", "/{topic_id}"], async (topicId) => {
    // Get data from database
    const { data } = await API.get(`/topic/${topicId}`);

    return toRow(data) as TopicRow;
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
      const { data } = await API.patch(`/topic/${topic.topic_id}`, topic);

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
      const { data } = await API.delete(`/topic/${topicId}`);

      // Convert data to row
      return toRow(data);
    }
  );
}
