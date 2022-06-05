import React from "react";
import { Link, useLocation } from "react-router-dom";

function TeamFeedback() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <p> {data} view </p>
      <Link to="/teams/a-team" state={data}>
        {" "}
        Go Back to Team{" "}
      </Link>

      <h2> A Team Evaluation Feedback </h2>

      {data === "assessor" && <p> Evaluation Feedback can be edited </p>}

      <h3>Assessor Feedback</h3>

      <h3>List of recommendations</h3>
    </div>
  );
}

export default TeamFeedback;
