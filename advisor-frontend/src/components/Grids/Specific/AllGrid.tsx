import { useMutation } from "react-query";

import TeamGrid from "./Team/TeamGrid";
import MemberGrid from "./Member/MemberGrid";
import AssessmentOngoingGrid from "./Assessment/AssessmentOngoing/AssessmentOngoingGrid";
import AssessmentCompletedGrid from "./Assessment/AssessmentCompleted/AssessmentCompletedGrid";
import RecommendationGrid from "./Recommendation/RecommendationGrid";
import IndividualGrid from "./Individual/IndividualGrid";
import TemplateGrid from "./Template/TemplateGrid";
import CategoryGrid from "./Category/CategoryGrid";
import TopicGrid from "./Topic/TopicGrid";
import MaturityGrid from "./Maturity/MaturityGrid";
import AnswerTypeGrid from "./Answer/AnswerGrid";
import SubareaGrid from "./Subarea/SubareaGrid";
import CheckpointGrid from "./Checkpoint/CheckpointGrid";
import INGTheme from "../../../Theme";
import API from "../../../API";

export function useLogin() {
  return useMutation(
    ["Login Admin"],
    () =>
      API.post(`/auth/login`, {
        username: "birth_taken",
        password: "994c801d-e32b-4281-9e83-f7937b4a1bff",
      }),
    {
      onSuccess: (data: any) => {
        console.log(data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
}

export default function AllGrid() {
  const login = useLogin();
  login.mutate();

  const userId = 0;
  const userRole = "ASSESSOR";
  const teamId = 0;
  const templateId = 4;
  const categoryId = 0;
  const assessmentId = 0;

  return (
    <div style={{ width: "100%" }}>
      <strong>Team Grid</strong>
      <TeamGrid theme={INGTheme} userId={userId} userRole={userRole} />
      <strong>Assessor Grid</strong>
      <MemberGrid
        theme={INGTheme}
        userId={userId}
        userRole="USER"
        teamId={teamId}
        forAssessors
      />
      <strong>Member Grid</strong>
      <MemberGrid
        theme={INGTheme}
        userId={userId}
        userRole="USER"
        teamId={teamId}
        forAssessors={false}
      />
      <strong>Ongoing Evaluations (Individual)</strong>
      <AssessmentOngoingGrid
        theme={INGTheme}
        userId={userId}
        userRole={userRole}
        assessmentType="INDIVIDUAL"
      />
      <strong>Completed Evaluations (Individual)</strong>
      <AssessmentCompletedGrid
        theme={INGTheme}
        userId={userId}
        userRole={userRole}
        assessmentType="INDIVIDUAL"
      />
      <strong>Ongoing Evaluations (Team)</strong>
      <AssessmentOngoingGrid
        theme={INGTheme}
        userId={userId}
        userRole={userRole}
        teamId={teamId}
        assessmentType="TEAM"
      />
      <strong>Completed Evaluations (Team)</strong>
      <AssessmentCompletedGrid
        theme={INGTheme}
        userId={userId}
        userRole={userRole}
        teamId={teamId}
        assessmentType="TEAM"
      />
      <strong>Recommendations</strong>
      <RecommendationGrid
        theme={INGTheme}
        assessmentId={assessmentId}
        assessmentType="TEAM"
        userId={userId}
        userRole={userRole}
      />
      <strong>Individuals</strong>
      <IndividualGrid theme={INGTheme} />
      <strong>Individual Evaluation Templates</strong>
      <TemplateGrid theme={INGTheme} templateType="INDIVIDUAL" />
      <strong>Team Evaluation Templates</strong>
      <TemplateGrid theme={INGTheme} templateType="TEAM" />
      <strong>Areas</strong>
      <CategoryGrid theme={INGTheme} templateId={templateId} />
      <strong>Topics</strong>
      <TopicGrid theme={INGTheme} templateId={templateId} />
      <strong>Maturity Levels</strong>
      <MaturityGrid theme={INGTheme} templateId={templateId} />
      <strong>Answer Types</strong>
      <AnswerTypeGrid theme={INGTheme} templateId={templateId} />
      <strong>Subareas</strong>
      <SubareaGrid
        theme={INGTheme}
        templateId={templateId}
        categoryId={categoryId}
      />
      <strong>Checkpoints</strong>
      <CheckpointGrid
        theme={INGTheme}
        templateId={templateId}
        categoryId={categoryId}
      />
    </div>
  );
}
