/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useQuery, useMutation, QueryKey, MutationKey } from "react-query";
import axios, { AxiosResponse } from "axios";
import { GridRowId, GridRowModel } from "@mui/x-data-grid";
import { AssessmentType } from "../../../../types/AssessmentType";
import { addRow, deleteRow, initializeRows } from "../helpers";

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
  type: AssessmentType;
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
    type: template.template_type,
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
    template_type: row.type,
    disabled: row.disabled,
    weight_range_min: row.weightRangeMin,
    weight_range_max: row.weightRangeMax,
    score_formula: row.scoreFormula,
    include_no_answer: row.includeNoAnswer,
  };
}

export class TemplateAPI {
  // Function to change the state of the grid
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>;

  constructor(setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>) {
    this.setRows = setRows;
  }

  // Gets all templates from database
  useGetTemplates(assessmentType: AssessmentType) {
    return useQuery<Template[]>(
      ["GET", "/template"],
      async () => {
        const { data } = await axios.get(`${API_URL}/template`);
        return data;
      },
      {
        onSuccess: (data) => {
          data.filter((template) => template.template_type !== assessmentType);
          const rows = data.map((template) => templateToRow(template));
          initializeRows(this.setRows, rows);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }

  // Posts template to database
  usePostTemplate() {
    return useMutation<AxiosResponse, unknown, AssessmentType>(
      ["POST", "/template"],
      (templateType: AssessmentType) =>
        axios.post(`${API_URL}/template`, {
          template_type: templateType,
        }),
      {
        onSuccess: (res) => {
          const row = templateToRow(res.data);
          addRow(this.setRows, row);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }

  // Get template with id from database
  useGetTemplate() {
    return useQuery<Template>(
      ["GET", "/template", "/{template_id}"],
      async (templateId) => {
        const { data } = await axios.get(`${API_URL}/template/${templateId}`);
        return data as Template;
      }
    );
  }

  // Patches template in database
  usePatchTemplate() {
    return useMutation(
      ["PATCH", "/template", "/{template_id}"],
      (row: Row) => {
        const template = rowToTemplate(row);
        return axios.patch(
          `${API_URL}/template/${template.template_id}`,
          template
        );
      },
      {
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }

  // Deletes template from database
  useDeleteTemplate() {
    return useMutation<AxiosResponse, unknown, number>(
      ["DELETE", "/template", "/{template_id}"],
      (templateId: number) => axios.delete(`${API_URL}/template/${templateId}`),
      {
        onSuccess: (res) => {
          deleteRow(this.setRows, res.data.template_id);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }

  // Duplicate template to database
  useDuplicateTemplate() {
    return useMutation<AxiosResponse, unknown, number>(
      ["POST", "/template", "/{template_id}", "/clone"],
      (templateId: number) =>
        axios.post(`${API_URL}/template/${templateId}/clone`),
      {
        onSuccess: (res) => {
          const row = templateToRow(res.data);
          addRow(this.setRows, row);
        },
        onError: (error) => {},
      }
    );
  }
}
