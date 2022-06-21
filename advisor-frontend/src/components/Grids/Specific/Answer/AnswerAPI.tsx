import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "../../../../API";

export type AnswerRow = {
  id: GridRowId;
  label: string;
  value: number;
  templateId: number;
  enabled: boolean;
};

type Answer = {
  answer_id: number;
  answer_text: string;
  answer_weight: number;
  template_id: number;
};

function toRow(answer: Answer) {
  return {
    id: answer.answer_id,
    label: answer.answer_text,
    value: answer.answer_weight,
    templateId: answer.template_id,
    enabled: true,
  } as AnswerRow;
}

function fromRow(row: AnswerRow) {
  return {
    answer_id: row.id,
    answer_text: row.label,
    answer_weight: row.value,
    template_id: row.templateId,
  } as Answer;
}

// Get all answers from database
export function useGetAnswers(templateId: number) {
  return useQuery(["GET", "/template", templateId, "/answer"], async () => {
    // Get response data from database
    const { data } = await API.get(`/template/${templateId}/answer`);

    // Convert data to rows
    const rows = data.map((answer: Answer) => toRow(answer));

    return rows as AnswerRow[];
  });
}

// Post answer to database
export function usePostAnswer(templateId: number) {
  return useMutation(["POST", "/template", templateId, "/answer"], async () => {
    // Get response data from database
    const { data } = await API.post(`/template/${templateId}/answer`);

    // Convert data to row
    return toRow(data);
  });
}

// Get answer with id from database
export function useGetAnswer() {
  return useQuery(["GET", "/answer", "/answer_id}"], async (answerId) => {
    // Get data from database
    const { data } = await API.get(`/answer/${answerId}`);

    return data as Answer;
  });
}

// Patch answer in database
export function usePatchAnswer() {
  return useMutation(
    ["PATCH", "/answer", "/{answer_id}"],
    async (row: AnswerRow) => {
      // Convert row to template
      const answer = fromRow(row);

      // Get response data from database
      const { data } = await API.patch(`/answer/${answer.answer_id}`, answer);

      // Convert data to row
      return toRow(data);
    }
  );
}

// Delete answer from database
export function useDeleteAnswer() {
  return useMutation(
    ["DELETE", "/answer", "/{answer_id}"],
    async (answerId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/answer/${answerId}`);

      // Convert data to row
      return toRow(data);
    }
  );
}
