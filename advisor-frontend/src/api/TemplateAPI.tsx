import { useQuery, useMutation } from "react-query";

import { GridRowId } from "@mui/x-data-grid";

import API from "../API";
import { AssessmentType } from "../types/AssessmentType";

export type TemplateRow = {
  id: GridRowId;
  name: string;
  description: string;
  templateType: AssessmentType;
  enabled: boolean;
  weightRangeMin: number;
  weightRangeMax: number;
  scoreFormula: string;
  includeNoAnswer: boolean;
};

type Template = {
  template_id: number;
  template_name: string;
  template_type: AssessmentType;
  enabled: boolean;
  weight_range_min: number;
  weight_range_max: number;
  score_formula: string;
  include_no_answer: boolean;
};

function toRow(template: Template) {
  return {
    id: template.template_id,
    name: template.template_name,
    description: "Description",
    templateType: template.template_type,
    enabled: template.enabled,
    weightRangeMin: template.weight_range_min,
    weightRangeMax: template.weight_range_max,
    scoreFormula: template.score_formula,
    includeNoAnswer: template.include_no_answer,
  } as TemplateRow;
}

function fromRow(row: TemplateRow) {
  return {
    template_id: row.id,
    template_name: row.name,
    template_type: row.templateType,
    enabled: row.enabled,
    weight_range_min: row.weightRangeMin,
    weight_range_max: row.weightRangeMax,
    score_formula: row.scoreFormula,
    include_no_answer: row.includeNoAnswer,
  } as Template;
}

// Get all templates from database
export function useGetTemplates(templateType: AssessmentType) {
  return useQuery(["GET", "/template", templateType], async () => {
    // Get response data from database
    const { data } = await API.get(`/template`);

    // Filter data on type of the templates
    const dataFiltered = data.filter(
      (template: Template) => template.template_type === templateType
    );

    // Convert filtered data to rows
    const rows = dataFiltered.map((template: Template) => toRow(template));

    return rows as TemplateRow[];
  });
}

// Post template to database
export function usePostTemplate(templateType: AssessmentType) {
  return useMutation(["POST", "/template"], async () => {
    // Get response data from database
    const { data } = await API.post(`/template`, {
      template_type: templateType,
    });

    // Convert data to row
    return toRow(data);
  });
}

// Get template with id from database
export function useGetTemplate() {
  return useQuery(
    ["GET", "/template", "/{template_id}"],
    async (templateId) => {
      // Get data from database
      const { data } = await API.get(`/template/${templateId}`);

      return toRow(data) as TemplateRow;
    }
  );
}

// Patch template in database
export function usePatchTemplate() {
  return useMutation(
    ["PATCH", "/template", "/{template_id}"],
    async (row: TemplateRow) => {
      // Convert row to template
      const template = fromRow(row);

      // Get response data from database
      const { data } = await API.patch(
        `/template/${template.template_id}`,
        template
      );

      // Convert data to row
      return toRow(data);
    }
  );
}

// Delete template from database
export function useDeleteTemplate() {
  return useMutation(
    ["DELETE", "/template", "/{template_id}"],
    async (templateId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/template/${templateId}`);

      // Convert data to row
      return toRow(data);
    }
  );
}

// Duplicate template to database
export function useDuplicateTemplate() {
  return useMutation(
    ["POST", "/template", "/{template_id}", "/clone"],
    async (templateId: number) => {
      const { data } = await API.post(`/template/${templateId}/clone`);

      return toRow(data);
    }
  );
}
