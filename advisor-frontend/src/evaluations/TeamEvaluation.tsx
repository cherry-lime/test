import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

function TeamEvaluation() {
  const location = useLocation();
  const data = location.state;
  const [searchParams, setSearchParams] = useSearchParams();
  const assessmentId = searchParams.get("assessmentid");
  const teamId = searchParams.get("teamid");

  return (
    <div>
      <p> {data} view </p>
      <Link to={`/teams/team?teamid=${teamId}`} state={data}>
        {" "}
        Go Back to Team{" "}
      </Link>

      <h2> A Team Evaluation with id {assessmentId} </h2>

      {data === "assessor" && <p> Evaluation can be edited </p>}

      {data === "user" && <p> Evaluation cannot be edited </p>}

      <h3>List of checkpoints</h3>
    </div>
  );
}

export default TeamEvaluation;
