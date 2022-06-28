/* eslint-disable import/prefer-default-export */
import API from "../../api/_API";
import { categoryToAPP, CategoryAPP } from "../../api/CategoryAPI";
import {
  CheckpointAPI,
  CheckpointAPP,
  checkpointToAPP,
} from "../../api/CheckpointAPI";
import { SubareaAPI, SubareaAPP, subareaToAPP } from "../../api/SubareaAPI";
import {
  RecommendationAPI,
  RecommendationAPP,
  recommendationToAPP,
} from "../../api/RecommendationAPI";

export async function getArea(areaId: number) {
  const area = await API.get(`/category/${areaId}`);
  return categoryToAPP(area.data) as CategoryAPP;
}

export async function getAreas(areaIds: number[]) {
  let areaList: CategoryAPP[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const id of areaIds) {
    // eslint-disable-next-line no-await-in-loop
    const area = await getArea(id);
    areaList = [...areaList, area];
  }
  return areaList;
}

export async function getCheckpoints(areaId: number) {
  const { data } = await API.get(`/category/${areaId}/checkpoint`);
  // Convert data to checkpointsAPP
  const checkpointsAPP = data.map((checkpointAPI: CheckpointAPI) =>
    checkpointToAPP(checkpointAPI)
  );

  const checkpointsFilteredAPP = checkpointsAPP.filter(
    (checkpointAPP: CheckpointAPP) => checkpointAPP.enabled
  );

  return checkpointsFilteredAPP as CheckpointAPP[];
}

export async function getSubareas(areaId: number) {
  const { data } = await API.get(`/category/${areaId}/subarea`);

  // Convert data to subareasAPP
  const subareasAPP = data.map((subareaAPI: SubareaAPI) =>
    subareaToAPP(subareaAPI)
  );

  const subareasFilteredAPP = subareasAPP.filter(
    (subareaAPP: SubareaAPP) => subareaAPP.enabled
  );

  return subareasFilteredAPP as SubareaAPP[];
}

export async function getTopicRecommendations(
  assessmentId: number,
  topicId: number | undefined
) {
  // Get response data from database
  const { data } = await API.get(`/assessment/${assessmentId}/feedback`, {
    params: { topic_id: topicId },
  });

  // Convert data to recommendationAPP
  const recommendationsAPP = data.map((recommendationAPI: RecommendationAPI) =>
    recommendationToAPP(recommendationAPI)
  );

  // Return response
  return recommendationsAPP as RecommendationAPP[];
}
