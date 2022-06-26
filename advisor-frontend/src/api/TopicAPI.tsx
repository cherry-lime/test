import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "./_API";

export type TopicAPP = {
  id: GridRowId;
  name: string;
  templateId: number;
  enabled: boolean;
};

type TopicAPI = {
  topic_id: number;
  topic_name: string;
  template_id: number;
  disabled: boolean;
};

function topicToAPP(topicAPI: TopicAPI) {
  return {
    id: topicAPI.topic_id,
    name: topicAPI.topic_name,
    templateId: topicAPI.template_id,
    enabled: !topicAPI.disabled,
  } as TopicAPP;
}

function topicToAPI(topicAPP: TopicAPP) {
  return {
    topic_id: topicAPP.id,
    topic_name: topicAPP.name,
    template_id: topicAPP.templateId,
    disabled: !topicAPP.enabled,
  } as TopicAPI;
}

// Get all topics from database
export function useGetTopics(
  templateId: number | undefined,
  enabledFilter?: boolean
) {
  return useQuery(
    ["GET", "/template", templateId, "/topic", enabledFilter],
    async () => {
      // Get response data from database
      const { data } = await API.get(`/template/${templateId}/topic`);

      // Convert data to topicsAPP
      const topicsAPP = data.map((topicAPI: TopicAPI) => topicToAPP(topicAPI));

      // If defined, filter on enabled/disabled
      if (enabledFilter !== undefined) {
        const topicsFilteredAPP = topicsAPP.filter(
          (topicAPP: TopicAPP) => topicAPP.enabled === enabledFilter
        );

        return topicsFilteredAPP as TopicAPP[];
      }

      return topicsAPP as TopicAPP[];
    },
    { enabled: !!templateId }
  );
}

// Get topic with id from database
export function useGetTopic(topicId: number) {
  return useQuery(
    ["GET", "/topic", "/{topic_id}"],
    async () => {
      // Get data from database
      const { data } = await API.get(`/topic/${topicId}`);

      return topicToAPP(data) as TopicAPP;
    },
    { enabled: !!topicId }
  );
}

// Post topic to database
export function usePostTopic(templateId: number) {
  return useMutation(["POST", "/template", templateId, "/topic"], async () => {
    // Get response data from database
    const { data } = await API.post(`/template/${templateId}/topic`);

    // Convert data to topicAPP
    return topicToAPP(data) as TopicAPP;
  });
}

// Patch topic in database
export function usePatchTopic() {
  return useMutation(
    ["PATCH", "/topic", "/{topic_id}"],
    async (topicAPP: TopicAPP) => {
      // Convert topicAPP to template
      const topicAPI = topicToAPI(topicAPP);

      // Get response data from database
      const { data } = await API.patch(`/topic/${topicAPI.topic_id}`, topicAPI);

      // Convert data to topicAPP
      return topicToAPP(data) as TopicAPP;
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

      // Convert data to topicAPP
      return topicToAPP(data) as TopicAPP;
    }
  );
}
