/* eslint-disable import/prefer-default-export */
import API from "../../../api/_API";
import {
  CheckpointAPI,
  CheckpointAPP,
  checkpointToAPP,
} from "../../../api/CheckpointAPI/CheckpointAPI";
import {
  SubareaAPI,
  SubareaAPP,
  subareaToAPP,
} from "../../../api/SubareaAPI/SubareaAPI";
import {
  RecommendationAPI,
  RecommendationAPP,
  recommendationToAPP,
} from "../../../api/RecommendationAPI/RecommendationAPI";
import {
  AssessmentAPP,
  assessmentToAPP,
} from "../../../api/AssessmentAPI/AssessmentAPI";
import {
  TemplateAPP,
  templateToAPP,
} from "../../../api/TemplateAPI/TemplateAPI";

export async function getCheckpoints(areaId: number) {
  const { data } = await API.get(`/category/${areaId}/checkpoint`);
  // Convert data to checkpointsAPP
  const checkpointsAPP = data
    .map((checkpointAPI: CheckpointAPI) => checkpointToAPP(checkpointAPI))
    .sort((a: CheckpointAPI, b: CheckpointAPI) => a.order - b.order);

  const checkpointsFilteredAPP = checkpointsAPP.filter(
    (checkpointAPP: CheckpointAPP) => checkpointAPP.enabled
  );

  return checkpointsFilteredAPP as CheckpointAPP[];
}

export async function getAssessment(assessmentId: number) {
  const { data } = await API.get(`/assessment/${assessmentId}`);

  return assessmentToAPP(data) as AssessmentAPP;
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
