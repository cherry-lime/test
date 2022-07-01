/* eslint-disable import/prefer-default-export */
import API from "../../../../api/_API";
import {
  CheckpointAPI,
  CheckpointAPP,
  checkpointToAPP,
} from "../../../../api/CheckpointAPI/CheckpointAPI";
import {
  SubareaAPI,
  SubareaAPP,
  subareaToAPP,
} from "../../../../api/SubareaAPI/SubareaAPI";
import {
  RecommendationAPI,
  RecommendationAPP,
  recommendationToAPP,
} from "../../../../api/RecommendationAPI/RecommendationAPI";
import {
  TemplateAPP,
  templateToAPP,
} from "../../../../api/TemplateAPI/TemplateAPI";
import {
  CategoryAPI,
  CategoryAPP,
  categoryToAPP,
} from "../../../../api/CategoryAPI/CategoryAPI";

export async function getAreas(templateId: number) {
  const { data } = await API.get(`/template/${templateId}/category`);
  const areas = data.map((categoryAPI: CategoryAPI) =>
    categoryToAPP(categoryAPI)
  );

  const areasFiltered = areas.filter(
    (categoryAPP: CategoryAPP) => categoryAPP.enabled
  );
  return areasFiltered as CategoryAPP[];
}

export async function getCheckpoints(areaId: number) {
  const { data } = await API.get(`/category/${areaId}/checkpoint`);
  const checkpointsAPP = data
    .map((checkpointAPI: CheckpointAPI) => checkpointToAPP(checkpointAPI))
    .sort((a: CheckpointAPI, b: CheckpointAPI) => a.order - b.order);

  const checkpointsFilteredAPP = checkpointsAPP.filter(
    (checkpointAPP: CheckpointAPP) => checkpointAPP.enabled
  );

  return checkpointsFilteredAPP as CheckpointAPP[];
}

export async function getTemplate(templateId: number) {
  const { data } = await API.get(`/template/${templateId}`);

  return templateToAPP(data) as TemplateAPP;
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

export async function getCheckpointsSubareas(areaId: number) {
  const checkpoints = await getCheckpoints(areaId);
  const subareas = await getSubareas(areaId);
  return {
    checkpoints,
    subareas,
  };
}
