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
function IndividualEvaluation() {
  const { assessmentId } = useParams();

  return (
    <PageLayout
      title={`An Individual Evaluation with id ${assessmentId}`}
      sidebarType={userTypes.USER}
    >
      <ListOfCheckpoints
        feedback={false}
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
          to={`/user/self_evaluations/feedback/${assessmentId}`}
        >
          <ButtonRegular text="Finish Assessment" />
        </Link>
      </div>
    </PageLayout>
  );
}

export default IndividualEvaluation;
