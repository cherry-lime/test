import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "./_API";

export type AnswerAPP = {
  id: GridRowId;
  label: string;
  value: number;
  templateId: number;
  enabled: boolean;
};

type AnswerAPI = {
  answer_id: number;
  answer_text: string;
  answer_weight: number;
  template_id: number;
  disabled: boolean;
};

function answerToAPP(answerAPI: AnswerAPI) {
  return {
    id: answerAPI.answer_id,
    label: answerAPI.answer_text,
    value: answerAPI.answer_weight,
    templateId: answerAPI.template_id,
    enabled: !answerAPI.disabled,
  } as AnswerAPP;
}

function answerToAPI(answerAPP: AnswerAPP) {
  return {
    answer_id: answerAPP.id,
    answer_text: answerAPP.label,
    answer_weight: answerAPP.value,
    template_id: answerAPP.templateId,
    disabled: !answerAPP.enabled,
  } as AnswerAPI;
}

// Get all answers from database
export function useGetAnswers(
  templateId: number,
  enabledFilter?: boolean,
  wait?: number | undefined
) {
  return useQuery(
    ["GET", "/template", templateId, "/answer"],
    async () => {
      // Get response data from database
      const { data } = await API.get(`/template/${templateId}/answer`);

      // Convert data to answersAPP
      const answersAPP = data.map((answerAPI: AnswerAPI) =>
        answerToAPP(answerAPI)
      );

      // If defined, filter on enabled/disabled
      if (enabledFilter !== undefined) {
        const answersFilteredAPP = answersAPP.filter(
          (answerAPP: AnswerAPP) => answerAPP.enabled !== enabledFilter
        );

        return answersFilteredAPP as AnswerAPP[];
      }

      // Convert data to answerAPP
      return answersAPP as AnswerAPP[];
    },
    { enabled: !!wait }
  );
}

// Get answer with id from database
export function useGetAnswer() {
  return useQuery(["GET", "/answer", "/answer_id}"], async (answerId) => {
    // Get data from database
    const { data } = await API.get(`/answer/${answerId}`);

    return answerToAPP(data) as AnswerAPP;
  });
}

// Post answer to database
export function usePostAnswer(templateId: number) {
  return useMutation(["POST", "/template", templateId, "/answer"], async () => {
    // Get response data from database
    const { data } = await API.post(`/template/${templateId}/answer`);

    // Convert data to answerAPP
    return answerToAPP(data) as AnswerAPP;
  });
}

// Patch answer in database
export function usePatchAnswer() {
  return useMutation(
    ["PATCH", "/answer", "/{answer_id}"],
    async (answerAPP: AnswerAPP) => {
      // Convert answerAPP to template
      const answer = answerToAPI(answerAPP);

      // Get response data from database
      const { data } = await API.patch(`/answer/${answer.answer_id}`, answer);

      // Convert data to answerAPP
      return answerToAPP(data) as AnswerAPP;
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

      // Convert data to answerAPP
      return answerToAPP(data) as AnswerAPP;
    }
  );
}
