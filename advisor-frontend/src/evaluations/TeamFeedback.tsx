import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

function TeamFeedback() {
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

      <h2> A Team Evaluation Feedback for assessment with id {assessmentId}</h2>

      {data === "assessor" && <p> Evaluation Feedback can be edited </p>}

      <h3>Assessor Feedback</h3>

      <h3>List of recommendations</h3>
    </div>
  );
}

export default TeamFeedback;
