import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Button from "../components/Button/Button";

function Team() {
  const location = useLocation();
  const data = location.state;

  const [searchParams, setSearchParams] = useSearchParams();
  const teamId = searchParams.get("teamid");

  const assessmentIds = [234, 56, 76];
  const feedbackIds = [123, 555, 23];

  return (
    <div>
      <p> {data} view </p>
      <Link to="/teams" state={data}>
        {" "}
        Go Back to List of Teams{" "}
      </Link>

      <h2> A Specific Team with id {teamId} </h2>
      {data === "assessor" && <p> Editable team info </p>}

      {data === "user" && <p> Non-editable team info </p>}

      <h3>List of assessors</h3>

      {data === "assessor" && <Button name="Add New Assessor" />}

      <h3>List of members</h3>

      {data === "assessor" && <Button name="Add New Member" />}

      <h3>Evaluations in progress</h3>

      {assessmentIds.map((assessmentId) => (
        <div>
          {/* later to get teamid can use api in evaluation page instead of passing it */}
          <Link
            to={`/teams/team/evaluation?teamid=${teamId}&${assessmentId}`}
            state={data}
          >
            {" "}
            Team Evaluation with id {assessmentId}{" "}
          </Link>
          <br />
        </div>
      ))}

      <h3>Completed evaluations</h3>

      {feedbackIds.map((feedbackId) => (
        <div>
          <Link
            to={`/teams/team/feedback?teamid=${teamId}&assessmentid=${feedbackId}`}
            state={data}
          >
            {" "}
            Team Feedback with id {feedbackId}{" "}
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Team;
