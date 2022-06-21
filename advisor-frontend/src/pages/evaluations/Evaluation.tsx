import React from "react";
import { Link, useParams } from "react-router-dom";
import ButtonRegular from "../../components/ButtonRegular/ButtonRegular";
import ListOfCheckpoints from "../../components/ListOfCheckpoints/ListOfCheckpoints";
import userTypes from "../../components/Sidebar/listUsersTypes";
import INGTheme from "../../Theme";
import PageLayout from "../PageLayout";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function Evaluation({ team }: { team: boolean }) {
  const { assessmentId, teamId } = useParams();
  const userRole = "USER";

  return (
    <PageLayout
      title={team ? "Team Evaluation" : "Individual Evaluation"}
      sidebarType={userTypes[userRole]}
    >
      <ListOfCheckpoints
        feedback={false || (team && userRole === "USER")}
        theme={INGTheme}
        assessmentId={assessmentId}
      />
      <div
        style={{
          width: "inherit",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link
          className="buttonLink"
          to={
            team
              ? `/teams/${teamId}/feedback/${assessmentId}`
              : `/user/self_evaluations/feedback/${assessmentId}`
          }
        >
          <ButtonRegular text="Finish Assessment" />
        </Link>
      </div>
    </PageLayout>
  );
}

export default Evaluation;
