import React from "react";
import { Link, useLocation } from "react-router-dom";

function IndividualEvaluations() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <h2> Individual Evaluations Page </h2>
      <Link to="/user" state={data}>
        {" "}
        Go Back to User Interface{" "}
      </Link>
    </div>
  );
}

export default IndividualEvaluations;
