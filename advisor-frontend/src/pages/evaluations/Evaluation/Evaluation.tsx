import { Button, Theme } from "@mui/material";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonRegular from "../../../components/ButtonRegular/ButtonRegular";
import ListOfCheckpoints from "../../../components/ListOfCheckpoints/ListOfCheckpoints";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import PageLayout from "../../PageLayout";
import { RootState } from "../../../app/store";
import ListOfRecommendations from "../../../components/ListOfRecommendations/ListOfRecommendations";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function Evaluation({ team, theme }: { team: boolean; theme: Theme }) {
  const { assessmentId, teamId } = useParams();
  const { userRole } = useSelector((state: RootState) => state.userData);
  const [checkpointView, setCheckpointView] = useState(true);

  const handleViewChange = () => {
    setCheckpointView((v) => !v);
  };

  return (
    <PageLayout
      title={team ? "Team Evaluation" : "Individual Evaluation"}
      sidebarType={userTypes[userRole]}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "inherit",
        }}
      >
        <Button
          onClick={handleViewChange}
          variant="contained"
        >
          {checkpointView ? "See Recommendations" : "Go back to checkpoints"}
        </Button>
      </div>

      {checkpointView && (
        <ListOfCheckpoints
          feedback={false || (team && userRole === "USER")}
          theme={theme}
          assessmentId={assessmentId}
        />
      )}

      {!checkpointView && (
        <ListOfRecommendations theme={theme} assessmentId={assessmentId} />
      )}

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
