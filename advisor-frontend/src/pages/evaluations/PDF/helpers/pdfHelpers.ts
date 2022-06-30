import { AnswerAPP } from "../../../../api/AnswerAPI/AnswerAPI";
import { CategoryAPP } from "../../../../api/CategoryAPI/CategoryAPI";
import { CheckpointAPP } from "../../../../api/CheckpointAPI/CheckpointAPI";
import { RecommendationAPP } from "../../../../api/RecommendationAPI/RecommendationAPI";
import { SubareaAPP } from "../../../../api/SubareaAPI/SubareaAPI";
import { TopicAPP } from "../../../../api/TopicAPI/TopicAPI";
import { getCheckpointsSubareas } from "../pdfHelpersAPI";

export type Section = {
  title: string;
  text: string[];
};

export type Table = {
  title: string;
  sections: Section[];
  data: (string | number)[][];
  headers: string[];
};

export type CheckpointAnswer = {
  id: number;
  description: string;
  order: number;
  topics: string;
  answer: string;
};

export const transformCheckpoints = (
  checkpoints: CheckpointAPP[],
  answers: Record<number, number | undefined>,
  answerList: AnswerAPP[],
  topicList: TopicAPP[]
) =>
  checkpoints.map((c) => {
    const object: CheckpointAnswer = {
      id: Number(c.id),
      description: c.description,
      order: c.order,
      topics: topicList
        .filter((t) => c.topics.includes(Number(t.id)))
        .map((t) => t.name)
        .join(", "),
      answer: answerList
        .filter((a) => a.id === answers[Number(c.id)])
        .map((a) => a.label)
        .join(""),
    };
    return object;
  });

export const transformArea = (
  area: CategoryAPP,
  subareas: SubareaAPP[],
  checkpoints: CheckpointAnswer[],
  checkpointHeaders: string[]
) => ({
  order: area.order,
  title: `Checkpoints: ${area.name}`,
  sections: subareas.map((s) => ({
    title: s.name,
    text: [s.summary, s.description],
  })),
  data: checkpoints.map((c) => [c.order, c.description, c.topics, c.answer]),
  headers: checkpointHeaders,
});

// not testable: uses api
async function processArea(
  area: CategoryAPP,
  checkpointAnswers: Record<number, number | undefined>,
  answerList: AnswerAPP[],
  topics: TopicAPP[],
  checkpointHeaders: string[]
) {
  const checkpointsSubareas = await getCheckpointsSubareas(Number(area.id));
  const { checkpoints, subareas } = checkpointsSubareas;

  const tCheckpoints = transformCheckpoints(
    checkpoints,
    checkpointAnswers,
    answerList,
    topics
  );

  return transformArea(area, subareas, tCheckpoints, checkpointHeaders);
}

// not testable: uses api
export async function getAreaTables(
  allAreas: CategoryAPP[],
  checkpointHeaders: string[],
  checkpointAnswers: Record<number, number | undefined>,
  answerList: AnswerAPP[],
  topics: TopicAPP[]
) {
  const areaPromises = allAreas.map((a) =>
    processArea(a, checkpointAnswers, answerList, topics, checkpointHeaders)
  );

  const responses = await Promise.all(areaPromises);
  const tables = responses.sort((a, b) => a.order - b.order) as Table[];
  return tables;
}

export function getRecTable(
  recs: RecommendationAPP[],
  recsHeaders: string[],
  feedback: string,
  assessorFeedback: string
) {
  const sections: Section[] = [];

  if (feedback) {
    sections.push({ title: "", text: [feedback] });
  }

  if (assessorFeedback) {
    sections.push({ title: "Facilitator Feedback", text: [assessorFeedback] });
  }

  return {
    title: `Recommendations`,
    sections,
    data: recs.map((c) => [c.order, c.description, c.additionalInfo]),
    headers: recsHeaders,
  };
}
