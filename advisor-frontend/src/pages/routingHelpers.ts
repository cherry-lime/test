import { UseQueryResult } from "react-query";
import { AssessmentAPP } from "../api/AssessmentAPI/AssessmentAPI";
import { TeamAPP } from "../api/TeamAPI/TeamAPI";

export default function checkAssessmentRouting(
  assessmentResponse: UseQueryResult<AssessmentAPP, unknown>,
  team: boolean,
  completed: boolean,
  teamId: string | undefined,
  assessmentId: string | undefined
) {
  if (assessmentResponse.status === "success" && assessmentResponse.data) {
    if (!!assessmentResponse.data.completedAt !== completed) {
      if (assessmentResponse.data.completedAt) {
        return team
          ? `/teams/${teamId}/feedback/${assessmentId}`
          : `/user/self_evaluations/feedback/${assessmentId}`;
      }
      return team
        ? `/teams/${teamId}/${assessmentId}`
        : `/user/self_evaluations/${assessmentId}`;
    }
  }
  if (
    assessmentResponse.status === "error" ||
    assessmentResponse.failureCount
  ) {
    return team ? `/teams/${teamId}` : `/user/self_evaluations`;
  }
  return "";
}

export function checkTeamRouting(
  teamResponse: UseQueryResult<TeamAPP, unknown>
) {
  if (teamResponse.status === "error" || teamResponse.failureCount) {
    return `/teams`;
  }
  return "";
}
