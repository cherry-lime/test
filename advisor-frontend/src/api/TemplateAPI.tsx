import { useQuery, useMutation } from "react-query";

import { GridRowId } from "@mui/x-data-grid";

import API from "./_API";
import { AssessmentType } from "../types/AssessmentType";
import { handleError, RefObject } from "../components/ErrorPopup/ErrorPopup";

export type TemplateAPP = {
  id: GridRowId;
  name: string;
  description: string;
  templateType: AssessmentType;
  feedback: string;
  enabled: boolean;
  weightRangeMin: number;
  weightRangeMax: number;
  scoreFormula: string;
  includeNoAnswer: boolean;
};

type TemplateAPI = {
  template_id: number;
  template_name: string;
  template_description: string;
  template_type: AssessmentType;
  template_feedback: string;
  enabled: boolean;
  weight_range_min: number;
  weight_range_max: number;
  score_formula: string;
  include_no_answer: boolean;
};

function templateToAPP(templateAPI: TemplateAPI) {
  return {
    id: templateAPI.template_id,
    name: templateAPI.template_name,
    description: templateAPI.template_description,
    templateType: templateAPI.template_type,
    feedback: templateAPI.template_feedback,
    enabled: templateAPI.enabled,
    weightRangeMin: templateAPI.weight_range_min,
    weightRangeMax: templateAPI.weight_range_max,
    scoreFormula: templateAPI.score_formula,
    includeNoAnswer: templateAPI.include_no_answer,
  } as TemplateAPP;
}

function templateToAPI(templateAPP: TemplateAPP) {
  return {
    template_id: templateAPP.id,
    template_name: templateAPP.name,
    template_description: templateAPP.description,
    template_type: templateAPP.templateType,
    template_feedback: templateAPP.feedback,
    enabled: templateAPP.enabled,
    weight_range_min: templateAPP.weightRangeMin,
    weight_range_max: templateAPP.weightRangeMax,
    score_formula: templateAPP.scoreFormula,
    include_no_answer: templateAPP.includeNoAnswer,
  } as TemplateAPI;
}

// Get all templates from database
export function useGetTemplates(
  templateType: AssessmentType,
  enabledFilter?: boolean,
  ref?: React.RefObject<RefObject>
) {
  return useQuery(
    ["GET", "/template", templateType, enabledFilter],
    async () => {
      // Get response data from database
      const { data } = await API.get(`/template`);

      // Filter data on type of the templates
      const dataFiltered = data.filter(
        (templateAPI: TemplateAPI) => templateAPI.template_type === templateType
      );

      // Convert filtered data to templatesAPP
      const templatesAPP = dataFiltered.map((templateAPI: TemplateAPI) =>
        templateToAPP(templateAPI)
      );

      // If defined, filter on enabled/disabled
      if (enabledFilter !== undefined) {
        const templatesFilteredAPP = templatesAPP.filter(
          (templateAPP: TemplateAPP) => templateAPP.enabled === enabledFilter
        );

        return templatesFilteredAPP as TemplateAPP[];
      }

      return templatesAPP as TemplateAPP[];
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

// Get template with id from database
export function useGetTemplate(
  templateId: number,
  ref?: React.RefObject<RefObject>
) {
  return useQuery(
    ["GET", "/template", templateId],
    async () => {
      // Get data from database
      const { data } = await API.get(`/template/${templateId}`);

      return templateToAPP(data) as TemplateAPP;
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

// Post template to database
export function usePostTemplate(
  templateType: AssessmentType,
  ref?: React.RefObject<RefObject>
) {
  return useMutation(
    ["POST", "/template"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/template`, {
        template_type: templateType,
      });

      // Convert data to templateAPP
      return templateToAPP(data) as TemplateAPP;
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

// Patch template in database
export function usePatchTemplate(ref?: React.RefObject<RefObject>) {
  return useMutation(
    ["PATCH", "/template", "/{template_id}"],
    async (templateAPP: TemplateAPP) => {
      // Convert templateAPP to templateAPI
      const templateAPI = templateToAPI(templateAPP);

      // Get response data from database
      const { data } = await API.patch(
        `/template/${templateAPI.template_id}`,
        templateAPI
      );

      // Convert data to templateAPP
      return templateToAPP(data) as TemplateAPP;
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

// Delete template from database
export function useDeleteTemplate(ref?: React.RefObject<RefObject>) {
  return useMutation(
    ["DELETE", "/template", "/{template_id}"],
    async (templateId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/template/${templateId}`);

      // Convert data to templateAPP
      return templateToAPP(data) as TemplateAPP;
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

// Duplicate template to database
export function useDuplicateTemplate(ref?: React.RefObject<RefObject>) {
  return useMutation(
    ["POST", "/template", "/{template_id}", "/clone"],
    async (templateId: number) => {
      const { data } = await API.post(`/template/${templateId}/clone`);

      return templateToAPP(data) as TemplateAPP;
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
