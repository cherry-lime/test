import React from "react";
import { Link, useLocation } from "react-router-dom";

function IndividualFeedback() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <p> {data} view </p>
      <Link to="/user/individual-evals" state={data}>
        {" "}
        Go Back to Evaluations Page{" "}
      </Link>

      <h2> Recommendations </h2>

      <h3>List of recommendations</h3>
    </div>
  );
}

export default IndividualFeedback;
