import { useQuery, useMutation } from "react-query";

import { GridRowId } from "@mui/x-data-grid";

import API from "./_API";
import { AssessmentType } from "../types/AssessmentType";

export type AssessmentAPP = {
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

type AssessmentAPI = {
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

function assessmentToAPP(assessmentAPI: AssessmentAPI) {
  return {
    id: assessmentAPI.assessment_id,
    name: assessmentAPI.assessment_name,
    assessmentType: assessmentAPI.assessment_type,
    countryName: assessmentAPI.country_name,
    departmentName: assessmentAPI.department_name,
    templateId: assessmentAPI.template_id,
    feedbackText: assessmentAPI.feedback_text,
    createdAt: assessmentAPI.created_at,
    updatedAt: assessmentAPI.updated_at,
    completedAt: assessmentAPI.completed_at,
    teamId: assessmentAPI.team_id,
  } as AssessmentAPP;
}

function assessmentToAPI(assessmentAPP: AssessmentAPP) {
  return {
    assessment_id: assessmentAPP.id,
    assessment_name: assessmentAPP.name,
    assessment_type: assessmentAPP.assessmentType,
    country_name: assessmentAPP.countryName,
    department_name: assessmentAPP.departmentName,
    template_id: assessmentAPP.templateId,
    feedback_text: assessmentAPP.feedbackText,
    created_at: assessmentAPP.createdAt,
    updated_at: assessmentAPP.updatedAt,
    completed_at: assessmentAPP.completedAt,
    team_id: assessmentAPP.teamId,
  };
}

// Get all assessments from database
export function useGetAssessments() {
  return useQuery(["GET", "/assessment"], async () => {
    // Get response data from database
    const { data } = await API.get(`/assessment`);

    // Convert filtered data to assessmentsAPP
    const assessmentsAPP = data.map((assessmentAPI: AssessmentAPI) =>
      assessmentToAPP(assessmentAPI)
    );

    return assessmentsAPP as AssessmentAPP[];
  });
}

// Get all my individual assessments from database
export function useGetMyIndividualAssessments(isCompleted: boolean) {
  return useQuery(["GET", "/assessment/my", isCompleted], async () => {
    // Get response data from database
    const { data } = await API.get(`/assessment/my`);

    // Filter data on whether it is completed
    const dataFiltered = isCompleted
      ? data.filter(
          (assessmentAPI: AssessmentAPI) => assessmentAPI.completed_at !== null
        )
      : data.filter(
          (assessmentAPI: AssessmentAPI) => assessmentAPI.completed_at === null
        );

    // Convert filtered data to assessmentsAPP
    const assessmentsAPP = dataFiltered.map((assessmentAPI: AssessmentAPI) =>
      assessmentToAPP(assessmentAPI)
    );

    return assessmentsAPP as AssessmentAPP[];
  });
}

// Get all my team assessments from database
export function useGetMyTeamAssessments(isCompleted: boolean, teamId: number) {
  return useQuery(
    ["GET", "/teams", teamId, "/assessments", isCompleted],
    async () => {
      // Get response data from database
      const { data } = await API.get(`/teams/${teamId}/assessments`);

      // Filter data on whether it is completed
      const dataFiltered = isCompleted
        ? data.filter(
            (assessmentAPI: AssessmentAPI) =>
              assessmentAPI.completed_at !== null
          )
        : data.filter(
            (assessmentAPI: AssessmentAPI) =>
              assessmentAPI.completed_at === null
          );

      // Convert filtered data to assessmentsAPP
      const assessmentsAPP = dataFiltered.map((assessmentAPI: AssessmentAPI) =>
        assessmentToAPP(assessmentAPI)
      );

      return assessmentsAPP as AssessmentAPP[];
    }
  );
}

// Post assessment to database
export function usePostAssessment(
  assessmentType: AssessmentType,
  teamId?: number
) {
  return useMutation(["POST", "/assessment"], async () => {
    // Get response data from database
    const { data } = await API.post(
      `/assessment`,
      teamId
        ? {
            assessment_type: assessmentType,
            team_id: teamId,
          }
        : {
            assessment_type: assessmentType,
          }
    );

    // Convert data to assessmentAPP
    return assessmentToAPP(data) as AssessmentAPP;
  });
}

// Get assessment with id from database
export function useGetAssessment() {
  return useQuery(
    ["GET", "/assessment", "/{assessment_id}"],
    async (assessmentId) => {
      // Get data from database
      const { data } = await API.get(`/assessment/${assessmentId}`);

      return assessmentToAPP(data) as AssessmentAPP;
    }
  );
}

// Patch assessment in database
export function usePatchAssessment() {
  return useMutation(
    ["PATCH", "/assessment", "/{assessment_id}"],
    async (assessmentAPP: AssessmentAPP) => {
      // Convert assessmentAPP to assessment
      const assessmentAPI = assessmentToAPI(assessmentAPP);

      // Get response data from database
      const { data } = await API.patch(
        `/assessment/${assessmentAPI.assessment_id}`,
        assessmentAPI
      );

      // Convert data to assessmentAPP
      return assessmentToAPP(data) as AssessmentAPP;
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

      // Convert data to assessmentAPP
      return assessmentToAPP(data) as AssessmentAPP;
    }
  );
}

// Complete assessment in database
export function usePostCompleteAssessment(assessmentId: number) {
  return useMutation(
    ["POST", "/assessment", assessmentId, "/complete"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/assessment/${assessmentId}/complete`);

      // Convert data to assessmentAPP
      return assessmentToAPP(data) as AssessmentAPP;
    }
  );
}

// Save assessment checkpoint in database
export function usePostSaveAssessment(assessmentId: number) {
  return useMutation(
    ["POST", "/assessment", assessmentId, "/save"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/assessment/${assessmentId}/save`);

      // Return response
      return data;
    }
  );
}

// Get saved assessment checkpoints from database
export function useGetSaveAssessment(assessmentId: number) {
  return useMutation(
    ["GET", "/assessment", assessmentId, "/save"],
    async () => {
      // Get response data from database
      const { data } = await API.get(`/assessment/${assessmentId}/save`);

      // Return response
      return data;
    }
  );
}

// Post feedback of assessment to database
export function usePostFeedbackAssessment(assessmentId: number) {
  return useMutation(
    ["POST", "/assessment", assessmentId, "/feedback"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/assessment/${assessmentId}/feedback`);

      // Return response
      return data;
    }
  );
}

// Get feedback of assessment from database
export function useGetFeedbackAssessment(assessmentId: number) {
  return useMutation(
    ["GET", "/assessment", assessmentId, "/feedback"],
    async () => {
      // Get response data from database
      const { data } = await API.get(`/assessment/${assessmentId}/feedback`);

      // Return response
      return data;
    }
  );
}
