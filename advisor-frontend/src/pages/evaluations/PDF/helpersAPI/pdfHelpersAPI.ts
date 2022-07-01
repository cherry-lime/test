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
import {
  AnswerAPI,
  AnswerAPP,
  answerToAPP,
} from "../../../../api/AnswerAPI/AnswerAPI";
import {
  TopicAPI,
  TopicAPP,
  topicToAPP,
} from "../../../../api/TopicAPI/TopicAPI";
import {
  AssessmentCheckpointAPI,
  AssessmentCheckpointAPP,
  assessmentCheckpointToAPP,
} from "../../../../api/AssessmentAPI/AssessmentAPI";

export async function getAreas(templateId: number) {
  // get areas available in template from API
  // and tranform them to a list of CategoryAPPs
  const { data } = await API.get(`/template/${templateId}/category`);
  const areas = data.map((categoryAPI: CategoryAPI) =>
    categoryToAPP(categoryAPI)
  );

  // filter to get only enabled areas
  const areasFiltered = areas.filter(
    (categoryAPP: CategoryAPP) => categoryAPP.enabled
  );
  return areasFiltered as CategoryAPP[];
}

export async function getAnswers(templateId: number) {
  // get answers available in template from API
  // and tranform them into a list of AnswerAPPs
  const { data } = await API.get(`/template/${templateId}/answer`);
  const answersAPP = data.map((answerAPI: AnswerAPI) => answerToAPP(answerAPI));

  return answersAPP as AnswerAPP[];
}

export async function getTopics(templateId: number) {
  // get topics available in template from API
  // and tranform them to a list of TopicAPPs
  const { data } = await API.get(`/template/${templateId}/topic`);
  const topicsAPP = data.map((topicAPI: TopicAPI) => topicToAPP(topicAPI));

  return topicsAPP as TopicAPP[];
}

export async function getAnswerDictionary(assessmentId: number) {
  // get answers to checkpoints of assessment from API
  // and tranform list of checkpoints into list of CheckpointAPPs
  const { data } = await API.get(`/assessment/${assessmentId}/save`);
  const checkpointsAPP = data.map((acAPI: AssessmentCheckpointAPI) =>
    assessmentCheckpointToAPP(acAPI)
  );

  // create an answer dictionary where each checkpointId
  // maps to an answerId
  const answerDictionary: Record<number, number | undefined> = {};
  checkpointsAPP.forEach((a: AssessmentCheckpointAPP) => {
    answerDictionary[a.checkpointId] = a.answerId;
  });

  return answerDictionary;
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
