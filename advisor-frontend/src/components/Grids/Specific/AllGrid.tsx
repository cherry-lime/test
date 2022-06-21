import * as React from "react";
import { useMutation } from "react-query";
import axios from "axios";

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
import AnswerTypeGrid from "./AnswerType/AnswerTypeGrid";
import SubareaGrid from "./Subarea/SubareaGrid";
import CheckpointGrid from "./Checkpoint/CheckpointGrid";
import INGTheme from "../../../Theme";

// const API_URL = "http://localhost:5000";
const API_URL = "https://tabackend.azurewebsites.net";

export default function AllGrid() {
  // const logout = useMutation(
  //   ["Logout Admin"],
  //   () => axios.post(`${API_URL}/auth/logout`),
  //   {
  //     onSuccess: (data: any) => {
  //       console.log(data);
  //     },
  //     onError: (error: any) => {
  //       console.log(error);
  //     },
  //   }
  // );

  // const login = useMutation(
  //   ["Login Admin"],
  //   () =>
  //     axios.post(`${API_URL}/auth/login`, {
  //       username: "usual_recognize",
  //       password: "25c62d48-9178-48a8-97d5-5b182b1023dc",
  //     }),
  //   {
  //     onSuccess: (data: any) => {
  //       console.log(data);
  //     },
  //     onError: (error: any) => {
  //       console.log(error);
  //     },
  //   }
  // );

  // logout.mutate();
  // login.mutate();

  const userId = 0;
  const userRole = "ASSESSOR";
  const teamId = 0;
  const templateId = 58;
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
