import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { GridRowId, GridRowModel } from "@mui/x-data-grid";
import { AssessmentType } from "../../../../types/AssessmentType";
import { addRow, deleteRow, initRows } from "../helpers";

const API_URL = "https://tabackend.azurewebsites.net";

export type Template = {
  template_id: number;
  template_name: string;
  template_type: string;
  disabled: boolean;
  weight_range_min: number;
  weight_range_max: number;
  score_formula: string;
  include_no_answer: boolean;
};

export type Row = {
  id: GridRowId;
  name: string;
  templateType: AssessmentType;
  disabled: boolean;
  weightRangeMin: number;
  weightRangeMax: number;
  scoreFormula: string;
  includeNoAnswer: boolean;
};

function templateToRow(template: Template) {
  return {
    id: template.template_id,
    name: template.template_name,
    description: "Description",
    templateType: template.template_type,
    disabled: template.disabled,
    weightRangeMin: template.weight_range_min,
    weightRangeMax: template.weight_range_max,
    scoreFormula: template.score_formula,
    includeNoAnswer: template.include_no_answer,
  };
}

function rowToTemplate(row: Row) {
  return {
    template_id: row.id,
    template_name: row.name,
    template_type: row.templateType,
    disabled: row.disabled,
    weight_range_min: row.weightRangeMin,
    weight_range_max: row.weightRangeMax,
    score_formula: row.scoreFormula,
    include_no_answer: row.includeNoAnswer,
  };
}

// Get all templates from database
export function useGetTemplates(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  assessmentType: AssessmentType
) {
  return useQuery(
    ["GET", "/template", assessmentType],
    async () => {
      // Get response data from database
      const { data } = await axios.get(`${API_URL}/template`);

      // Convert data to rows
      const rows = data.map((template: Template) => templateToRow(template));

      // Filter rows on type of the templates
      const rowsFiltered = rows.filter(
        (row: Row) => row.templateType === assessmentType
      );

      return rowsFiltered as Row[];
    },
    {
      onSuccess: (rows) => {
        // Initialize rows of the grid
        initRows(setRows, rows);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
}

// Post template to database
export function usePostTemplate(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>
) {
  return useMutation(
    ["POST", "/template"],
    async (templateType: AssessmentType) => {
      // Get response data from database
      const { data } = await axios.post(`${API_URL}/template`, {
        template_type: templateType,
      });

      // Convert data to row
      return templateToRow(data);
    },
    {
      onSuccess: (row) => {
        addRow(setRows, row);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
}

// Get template with id from database
export function useGetTemplate() {
  return useQuery(
    ["GET", "/template", "/{template_id}"],
    async (templateId) => {
      // Get data from database
      const { data } = await axios.get(`${API_URL}/template/${templateId}`);

      return data as Template;
    }
  );
}

// Patch template in database
export function usePatchTemplate() {
  return useMutation(
    ["PATCH", "/template", "/{template_id}"],
    async (row: Row) => {
      // Convert row to template
      const template = rowToTemplate(row);

      // Get response data from database
      const { data } = await axios.patch(
        `${API_URL}/template/${template.template_id}`,
        template
      );

      // Convert data to row
      return templateToRow(data);
    },
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );
}

// Delete template from database
export function useDeleteTemplate(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>
) {
  return useMutation(
    ["DELETE", "/template", "/{template_id}"],
    async (templateId: number) => {
      // Get response data from database
      const { data } = await axios.delete(`${API_URL}/template/${templateId}`);

      // Convert data to row
      return templateToRow(data);
    },
    {
      onSuccess: (row) => {
        deleteRow(setRows, row.id);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
}

// Duplicate template to database
export function useDuplicateTemplate(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>
) {
  return useMutation(
    ["POST", "/template", "/{template_id}", "/clone"],
    async (templateId: number) => {
      const { data } = await axios.post(
        `${API_URL}/template/${templateId}/clone`
      );

      return templateToRow(data);
    },
    {
      onSuccess: (row) => {
        addRow(setRows, row);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
}
