import React from "react";
import { Link, useLocation } from "react-router-dom";

function IndividualEvaluation() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <p> {data} view </p>
      <Link to="/user/individual-evals" state={data}>
        {" "}
        Go Back to Evaluations Page{" "}
      </Link>

      <h2> An Individual Evaluation </h2>

      <h3>List of checkpoints</h3>
    </div>
  );
}

export default IndividualEvaluation;
