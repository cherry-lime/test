import { useQuery, useMutation } from "react-query";

import { GridRowId } from "@mui/x-data-grid";

import API from "./_API";
import { handleError, RefObject } from "../components/ErrorPopup/ErrorPopup";

export type RecommendationAPP = {
  id: GridRowId;
  order: number;
  description: string;
  additionalInfo: string;
};

export type RecommendationAPI = {
  feedback_id: number;
  order: number;
  feedback_text: string;
  feedback_additional_information: string;
};

export function recommendationToAPP(recommendationAPI: RecommendationAPI) {
  return {
    id: recommendationAPI.feedback_id,
    order: recommendationAPI.order,
    description: recommendationAPI.feedback_text,
    additionalInfo: recommendationAPI.feedback_additional_information,
  } as RecommendationAPP;
}

export function recommendationToAPI(recommendationAPP: RecommendationAPP) {
  return {
    feedback_id: recommendationAPP.id,
    order: recommendationAPP.order,
    feedback_text: recommendationAPP.description,
    feedback_additional_information: recommendationAPP.additionalInfo,
  } as RecommendationAPI;
}

// Get feedback of assessment from database
export function useGetRecommendations(
  assessmentId: number,
  topicId: number,
  ref?: React.RefObject<RefObject>
) {
  return useQuery(
    ["GET", "/assessment", assessmentId, "/feedback", topicId],
    async () => {
      // Get response data from database
      const { data } = await API.get(`/assessment/${assessmentId}/feedback`, {
        params: { topic_id: topicId },
      });

      // Convert data to recommendationAPP
      const recommendationsAPP = data.map(
        (recommendationAPI: RecommendationAPI) =>
          recommendationToAPP(recommendationAPI)
      );

      // Return response
      return recommendationsAPP as RecommendationAPP[];
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}

// Patch assessment in database
export function usePatchRecommendation(ref?: React.RefObject<RefObject>) {
  return useMutation(
    ["PATCH", "/feedback", "/{feedback_id}"],
    async (recommendationAPP: RecommendationAPP) => {
      // Convert recommendationAPP to assessment
      const recommendationAPI = recommendationToAPI(recommendationAPP);

      // Get response data from database
      const { data } = await API.patch(
        `/assessment/${recommendationAPI.feedback_id}`,
        recommendationAPI
      );

      // Convert data to recommendationAPP
      return recommendationToAPP(data) as RecommendationAPP;
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}
