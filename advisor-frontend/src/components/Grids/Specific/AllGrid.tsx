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

// Style color palette
const theme = createTheme({
  palette: {
    primary: {
      light: "#FFD6B1", // Light Orange
      main: "#FF6200", // Orange
      dark: "#AA3909", // Dark Orange
    },
    secondary: {
      // Lightest Grey: #FAF6F3
      light: "#EDE6E2", // Light Grey
      main: "#8B817C", // Grey
      dark: "#5A534F", // Dark Grey
    },
    text: {
      primary: "#5A534F", // Dark Grey
    },
  },
});

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
      <TeamGrid theme={theme} userId={userId} userRole={userRole} />
      <strong>Assessor Grid</strong>
      <MemberGrid
        theme={theme}
        userId={userId}
        userRole="USER"
        teamId={teamId}
        forAssessors
      />
      <strong>Member Grid</strong>
      <MemberGrid
        theme={theme}
        userId={userId}
        userRole="USER"
        teamId={teamId}
        forAssessors={false}
      />
      <strong>Ongoing Evaluations (Individual)</strong>
      <AssessmentOngoingGrid
        theme={theme}
        userId={userId}
        userRole={userRole}
        assessmentType="INDIVIDUAL"
      />
      <strong>Completed Evaluations (Individual)</strong>
      <AssessmentCompletedGrid
        theme={theme}
        userId={userId}
        userRole={userRole}
        assessmentType="INDIVIDUAL"
      />
      <strong>Ongoing Evaluations (Team)</strong>
      <AssessmentOngoingGrid
        theme={theme}
        userId={userId}
        userRole={userRole}
        teamId={teamId}
        assessmentType="TEAM"
      />
      <strong>Completed Evaluations (Team)</strong>
      <AssessmentCompletedGrid
        theme={theme}
        userId={userId}
        userRole={userRole}
        teamId={teamId}
        assessmentType="TEAM"
      />
      <strong>Recommendations</strong>
      <RecommendationGrid
        theme={theme}
        assessmentId={assessmentId}
        assessmentType="TEAM"
        userId={userId}
        userRole={userRole}
      />
      <strong>Individuals</strong>
      <IndividualGrid theme={theme} />
      <strong>Individual Evaluation Templates</strong>
      <TemplateGrid theme={theme} assessmentType="INDIVIDUAL" />
      <strong>Team Evaluation Templates</strong>
      <TemplateGrid theme={theme} assessmentType="TEAM" />
      <strong>Areas</strong>
      <CategoryGrid theme={theme} templateId={templateId} />
      <strong>Topics</strong>
      <TopicGrid theme={theme} templateId={templateId} />
      <strong>Maturity Levels</strong>
      <MaturityGrid theme={theme} templateId={templateId} />
      <strong>Answer Types</strong>
      <AnswerTypeGrid theme={theme} templateId={templateId} />
      <strong>Subareas</strong>
      <SubareaGrid
        theme={theme}
        templateId={templateId}
        categoryId={categoryId}
      />
      <strong>Checkpoints</strong>
      <CheckpointGrid
        theme={theme}
        templateId={templateId}
        categoryId={categoryId}
      />
    </div>
  );
}