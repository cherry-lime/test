import React from "react";
import { Link, useLocation } from "react-router-dom";

function IndividualEvaluations() {
  const location = useLocation();
  const data = location.state;
  const assessmentIds = [43, 67, 40];
  const feedbackIds = [35, 66, 39];

  return (
    <div>
      <h2> Individual Evaluations Page </h2>

      <Link to="/user" state={data}>
        {" "}
        Go Back to User Interface{" "}
      </Link>

      <h3>List of evaluations</h3>

      {assessmentIds.map((assessmentId) => (
        <div>
          <Link
            to={`/user/self_evaluations/evaluation?assessmentid=${assessmentId}`}
            state={data}
          >
            {" "}
            Evaluation with id {assessmentId}{" "}
          </Link>
          <br />
        </div>
      ))}

      {feedbackIds.map((feedbackId) => (
        <div>
          <Link
            to={`/user/self_evaluations/feedback?assessmentid=${feedbackId}`}
            state={data}
          >
            {" "}
            Completed Evaluation with id {feedbackId}{" "}
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
}

export default IndividualEvaluations;
