import { createTheme } from "@mui/material/styles";

import TeamGrid from "./TeamGrid";
import MemberGrid from "./MemberGrid";
import AssessmentOngoingGrid from "./AssessmentOngoingGrid";
import AssessmentCompletedGrid from "./AssessmentCompletedGrid";
import RecommendationGrid from "./RecommendationGrid";
import IndividualGrid from "./IndividualGrid";
import TemplateGrid from "./TemplateGrid";
import CategoryGrid from "./CategoryGrid";
import TopicGrid from "./TopicGrid";
import MaturityGrid from "./MaturityGrid";
import AnswerTypeGrid from "./AnswerTypeGrid";
import SubareaGrid from "./SubareaGrid";
import CheckpointGrid from "./CheckpointGrid";
import INGTheme from "../../../Theme";

export default function AllGrid() {
  const userId = 0;
  const userRole = "ASSESSOR";
  const teamId = 0;
  const templateId = 0;
  const categoryId = 0;
  const assessmentId = 0;

  return (
    <div style={{ width: "90%" }}>
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
      <TemplateGrid theme={INGTheme} assessmentType="INDIVIDUAL" />
      <strong>Team Evaluation Templates</strong>
      <TemplateGrid theme={INGTheme} assessmentType="TEAM" />
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
