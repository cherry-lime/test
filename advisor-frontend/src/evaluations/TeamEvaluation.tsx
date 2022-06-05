import React from "react";
import { Link, useLocation } from "react-router-dom";

function TeamEvaluation() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <p> {data} view </p>
      <Link to="/teams/a-team" state={data}>
        {" "}
        Go Back to Team{" "}
      </Link>

      <h2> A Team Evaluation </h2>

      {data === "assessor" && <p> Evaluation can be edited </p>}

      {data === "user" && <p> Evaluation cannot be edited </p>}

      <h3>List of checkpoints</h3>
    </div>
  );
}

export default TeamEvaluation;
