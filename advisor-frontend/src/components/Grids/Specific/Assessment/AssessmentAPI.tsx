import { useQuery, useMutation } from "react-query";

import { GridRowId } from "@mui/x-data-grid";

import API from "../../../../API";
import { AssessmentType } from "../../../../types/AssessmentType";

export type AssessmentRow = {
  id: GridRowId;
  name: string;
  assessmentType: AssessmentType;
  countryName: string;
  departmentName: string;
  templateId: number;
  feedbackText: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  teamId: number;
};

type Assessment = {
  assessment_id: number;
  assessment_name: string;
  assessment_type: AssessmentType;
  country_name: string;
  department_name: string;
  template_id: number;
  feedback_text: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  team_id: number;
};

function toRow(assessment: Assessment) {
  return {
    id: assessment.assessment_id,
    name: assessment.assessment_name,
    assessmentType: assessment.assessment_type,
    countryName: assessment.country_name,
    departmentName: assessment.department_name,
    templateId: assessment.template_id,
    feedbackText: assessment.feedback_text,
    createdAt: assessment.created_at,
    updatedAt: assessment.updated_at,
    completedAt: assessment.completed_at,
    teamId: assessment.team_id,
  } as AssessmentRow;
}

function fromRow(row: AssessmentRow) {
  return {
    assessment_id: row.id,
    assessment_name: row.name,
    assessment_type: row.assessmentType,
    country_name: row.countryName,
    department_name: row.departmentName,
    template_id: row.templateId,
    feedback_text: row.feedbackText,
    created_at: row.createdAt,
    updated_at: row.updatedAt,
    completed_at: row.completedAt,
    team_id: row.teamId,
  };
}

// Get all assessments from database
export function useGetAssessments() {
  return useQuery(["GET", "/assessment"], async () => {
    // Get response data from database
    const { data } = await API.get(`/assessment`);

    // Convert filtered data to rows
    const rows = data.map((assessment: Assessment) => toRow(assessment));

    return rows as AssessmentRow[];
  });
}

// Get all my individual assessments from database
export function useGetMyIndividualAssessments(isCompleted: boolean) {
  return useQuery(["GET", "/assessment/my"], async () => {
    // Get response data from database
    const { data } = await API.get(`/assessment/my`);

    // Filter data on whether it is completed
    const dataFiltered = isCompleted
      ? data.filter((assessment: Assessment) => assessment !== null)
      : data.filter((assessment: Assessment) => assessment === null);

    // Convert filtered data to rows
    const rows = dataFiltered.map((assessment: Assessment) =>
      toRow(assessment)
    );

    return rows as AssessmentRow[];
  });
}

// Get all my team assessments from database
export function useGetMyTeamAssessments(isCompleted: boolean, teamId: number) {
  return useQuery(["GET", "/teams", teamId, "/assessments"], async () => {
    // Get response data from database
    const { data } = await API.get(`/teams/${teamId}/assessments`);

    // Filter data on whether it is completed
    const dataFiltered = isCompleted
      ? data.filter((assessment: Assessment) => assessment !== null)
      : data.filter((assessment: Assessment) => assessment === null);

    // Convert filtered data to rows
    const rows = dataFiltered.map((assessment: Assessment) =>
      toRow(assessment)
    );

    return rows as AssessmentRow[];
  });
}

// Post assessment to database
export function usePostAssessment(
  assessmentType: AssessmentType,
  teamId: number
) {
  return useMutation(["POST", "/assessment"], async () => {
    // Get response data from database
    const { data } = await API.post(`/assessment`, {
      assessment_type: assessmentType,
      team_id: teamId,
    });

    // Convert data to row
    return toRow(data);
  });
}

// Get assessment with id from database
export function useGetAssessment() {
  return useQuery(
    ["GET", "/assessment", "/{assessment_id}"],
    async (assessmentId) => {
      // Get data from database
      const { data } = await API.get(`/assessment/${assessmentId}`);

      return data as Assessment;
    }
  );
}

// Patch assessment in database
export function usePatchAssessment() {
  return useMutation(
    ["PATCH", "/assessment", "/{assessment_id}"],
    async (row: AssessmentRow) => {
      // Convert row to assessment
      const assessment = fromRow(row);

      // Get response data from database
      const { data } = await API.patch(
        `/assessment/${assessment.assessment_id}`,
        assessment
      );

      // Convert data to row
      return toRow(data);
    }
  );
}

// Delete assessment from database
export function useDeleteAssessment() {
  return useMutation(
    ["DELETE", "/assessment", "/{assessment_id}"],
    async (assessmentId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/assessment/${assessmentId}`);

      // Convert data to row
      return toRow(data);
    }
  );
}
