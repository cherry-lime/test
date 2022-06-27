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
import AnswerGrid from "./Answer/AnswerGrid";
import SubareaGrid from "./Subarea/SubareaGrid";
import CheckpointGrid from "./Checkpoint/CheckpointGrid";
import INGTheme from "../../../Theme";
import API from "../../../api/_API";

export function useLogin() {
  return useMutation(["Login Admin"], () =>
    API.post(`/auth/login`, {
      username: "symbol_enemy_throat",
      password: "1ed4d82c-5ccd-447c-938e-d3c1efec1044",
    })
  );
}

export default function AllGrid() {
  const login = useLogin();
  login.mutate();

  const userRole = "ASSESSOR";
  const teamId = 1;
  const templateId = 1;
  const categoryId = 2;
  const assessmentId = 3;

  return (
    <div style={{ width: "100%" }}>
      <strong>Team Grid</strong>
      <TeamGrid theme={INGTheme} userRole={userRole} />
      <strong>Assessor Grid</strong>
      <MemberGrid
        theme={INGTheme}
        userRole="USER"
        teamId={teamId}
        forAssessors
      />
      <strong>Member Grid</strong>
      <MemberGrid
        theme={INGTheme}
        userRole="USER"
        teamId={teamId}
        forAssessors={false}
      />
      <strong>Ongoing Evaluations (Individual)</strong>
      <AssessmentOngoingGrid
        theme={INGTheme}
        userRole={userRole}
        assessmentType="INDIVIDUAL"
      />
      <strong>Completed Evaluations (Individual)</strong>
      <AssessmentCompletedGrid theme={INGTheme} assessmentType="INDIVIDUAL" />
      <strong>Ongoing Evaluations (Team)</strong>
      <AssessmentOngoingGrid
        theme={INGTheme}
        userRole={userRole}
        teamId={teamId}
        assessmentType="TEAM"
      />
      <strong>Completed Evaluations (Team)</strong>
      <AssessmentCompletedGrid
        theme={INGTheme}
        teamId={teamId}
        assessmentType="TEAM"
      />
      <strong>Recommendations</strong>
      <RecommendationGrid
        theme={INGTheme}
        topicId={1}
        assessmentId={assessmentId}
        isEditable
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
      <AnswerGrid theme={INGTheme} templateId={templateId} />
      <strong>Subareas</strong>
      <SubareaGrid theme={INGTheme} categoryId={categoryId} />
      <strong>Checkpoints</strong>
      <CheckpointGrid
        theme={INGTheme}
        templateId={templateId}
        categoryId={categoryId}
      />
    </div>
  );
}
